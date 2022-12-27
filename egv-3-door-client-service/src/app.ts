import express from 'express';
import { client as WebSocketClient } from 'websocket';
import * as dotenv from 'dotenv';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import FormData from 'form-data';
import * as fs from 'fs';
import axios from 'axios';
import sleep from './utils/sleep';

dotenv.config();

const app = express();

const client = new WebSocketClient();

let connectSchedule: NodeJS.Timer;

const wsClientConnect = () => {
  client.connect(process.env.WS_URL!, process.env.WS_PROTOCAL!);
};

const uploadVideoLog = async (id: string) => {
  await sleep();
  const form = new FormData();
  form.append('file', fs.createReadStream(`./output/${id}.mp4`));
  const url = `${process.env.API_URL}/egv/api/v1/races/${id}/video`;
  await axios.post(url, form, {
    headers: {
      ...form.getHeaders(),
    },
  });
};

client.on('connectFailed', function (error) {
  console.log('Connect Error: ' + error.toString());
  if (!connectSchedule) {
    connectSchedule = setInterval(wsClientConnect, 1000);
  }
});

client.on('connect', function (connection) {
  console.log('WebSocket Client Connected');

  if (connection.connected) {
    if (connectSchedule) clearInterval(connectSchedule);
    let ffmpeg: ChildProcessWithoutNullStreams;
    let timeout: NodeJS.Timeout;

    connection.on('error', function (error) {
      console.log('Connection Error: ' + error.toString());
      if (ffmpeg) ffmpeg.kill();
      if (timeout) clearTimeout(timeout);
      if (!connectSchedule) {
        connectSchedule = setInterval(wsClientConnect, 1000);
      }
    });
    connection.on('close', function () {
      console.log('echo-protocol Connection Closed');
      if (ffmpeg) ffmpeg.kill();
      if (timeout) clearTimeout(timeout);
      if (!connectSchedule) {
        connectSchedule = setInterval(wsClientConnect, 1000);
      }
    });

    connection.on('message', async function (message) {
      if (message.type === 'utf8') {
        const { id, status } = JSON.parse(message.utf8Data);
        if (status === 'Ready') {
          if (ffmpeg) ffmpeg.kill();
          timeout = setTimeout(async () => {
            ffmpeg.kill();
            await uploadVideoLog(id);
          }, parseInt(process.env.LOG_VIDEO_TIMEOUT!));
          ffmpeg = spawn('ffmpeg', [
            '-y',
            '-f',
            'avfoundation',
            '-r',
            '30',
            '-i',
            '0',
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
          if (ffmpeg) {
            ffmpeg.kill();
            if (timeout) clearTimeout(timeout);
            await uploadVideoLog(id);
          }
        }
      }
    });
  }
});

wsClientConnect();

const server = app.listen(process.env.PORT || 3000, async () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
