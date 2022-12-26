import express from 'express';
import { client as WebSocketClient } from 'websocket';
import * as dotenv from 'dotenv';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';

dotenv.config();

const app = express();

const client = new WebSocketClient();

client.on('connectFailed', function (error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection) {
  console.log('WebSocket Client Connected');

  if (connection.connected) {
    let ffmpeg: ChildProcessWithoutNullStreams;

    connection.on('error', function (error) {
      console.log('Connection Error: ' + error.toString());
      if (ffmpeg) ffmpeg.kill();
    });
    connection.on('close', function () {
      console.log('echo-protocol Connection Closed');
      if (ffmpeg) ffmpeg.kill();
    });

    connection.on('message', async function (message) {
      if (message.type === 'utf8') {
        const payload = JSON.parse(message.utf8Data);
        if (payload.status === 'Ready') {
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
            `./output/${payload.id}.mp4`,
          ]);
          ffmpeg.stderr.on('data', (data: any) => {
            console.log(data.toString());
          });
        }
        if (payload.status === 'Finish' || payload.status === 'Failed') {
          if (ffmpeg) ffmpeg.kill();
        }
      }
    });
  }
});

client.connect(process.env.WS_URL!, process.env.WS_PROTOCAL!);

const server = app.listen(process.env.PORT || 3000, async () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
