import express from 'express';
import { client as WebSocketClient } from 'websocket';
import * as dotenv from 'dotenv';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import FormData from 'form-data';
import * as fs from 'fs';
import axios from 'axios';
import sleep from './utils/sleep';
import https from 'https';

dotenv.config();

const app = express();

const client = new WebSocketClient();

let reconnectSchedule: NodeJS.Timer | undefined;

const wsClientConnect = () => {
  console.log('Connect websocket');
  client.connect(process.env.WS_URL!, process.env.WS_PROTOCAL!);
};

const wsClientReConnect = () => {
  if (!reconnectSchedule) {
    reconnectSchedule = setInterval(() => {
      console.log('Reconnect websocket');
      client.connect(process.env.WS_URL!, process.env.WS_PROTOCAL!);
    }, 1000);
  }
};

const uploadVideoLog = async (id: string) => {
  await sleep(5000);
  console.log(`Upload Video: ${id}`);
  console.time('Uploaded');
  const form = new FormData();
  form.append('file', fs.createReadStream(`./output/${id}.mp4`));
  const url = `${process.env.API_URL}/egv/api/v1/races/${id}/video`;
  await axios.post(url, form, {
    headers: {
      ...form.getHeaders(),
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  });
  console.timeEnd('Uploaded');
};

client.on('connectFailed', function (error) {
  console.log('Connect Error: ' + error.toString());
  wsClientReConnect();
});

client.on('connect', function (connection) {
  console.log('WebSocket Client Connected');

  if (connection.connected) {
    if (reconnectSchedule) {
      clearInterval(reconnectSchedule);
      reconnectSchedule = undefined;
    }
    let ffmpeg: ChildProcessWithoutNullStreams | undefined;
    let timeout: NodeJS.Timeout | undefined;

    connection.on('error', function (error) {
      console.log('Connection Error: ' + error.toString());
      if (ffmpeg) {
        ffmpeg.kill();
        ffmpeg = undefined;
      }
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }
      wsClientReConnect();
    });

    connection.on('close', function () {
      console.log('echo-protocol Connection Closed');
      if (ffmpeg) {
        ffmpeg.kill();
        ffmpeg = undefined;
      }
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }
      wsClientReConnect();
    });

    connection.on('message', async function (message) {
      if (message.type === 'utf8') {
        const { id, status, timeout1, timeout2 } = JSON.parse(message.utf8Data);
        if (status === 'Created') {
          if (ffmpeg) {
            ffmpeg.kill();
            ffmpeg = undefined;
          }
          timeout = setTimeout(async () => {
            if (ffmpeg) {
              ffmpeg.kill();
              ffmpeg = undefined;
            }
            await uploadVideoLog(id);
          }, timeout2 * 1000 || parseInt(process.env.LOG_VIDEO_TIMEOUT!));
          // ffmpeg = spawn('ffmpeg', [
          //   '-y',
          //   '-f',
          //   'avfoundation',
          //   '-r',
          //   '30',
          //   '-i',
          //   '0',
          //   '-c:v',
          //   'libx264',
          //   '-movflags',
          //   'faststart',
          //   `./output/${id}.mp4`,
          // ]);
          ffmpeg = spawn('ffmpeg', [
            '-y',
            '-r',
            '30',
            '-i',
            '/dev/video0',
            '-c:v',
            'libx264',
            '-movflags',
            'faststart',
            `./output/${id}.mp4`,
          ]);
          ffmpeg.stderr.on('data', (data: any) => {
            console.log(data.toString());
          });
        }
        if (status === 'Finish' || status === 'Failed') {
          setTimeout(async () => {
            if (ffmpeg) {
              ffmpeg.kill();
              ffmpeg = undefined;
              if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
              }
              await uploadVideoLog(id);
            }
          }, timeout1 * 1000 || 10000);
        }
      }
    });
  }
});

wsClientConnect();

const server = app.listen(process.env.PORT || 3000, async () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
