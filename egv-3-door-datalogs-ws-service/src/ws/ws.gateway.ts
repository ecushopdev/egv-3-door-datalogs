import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { DataLogsService } from '../datalogs/datalogs.service';
import { CreateDatalogDto } from '../datalogs/dto/create-datalog.dto';
import WebSocket, { Server } from 'ws';

@WebSocketGateway()
export class WsGateway {
  constructor(private readonly dataLogsService: DataLogsService) {}

  @WebSocketServer()
  server: Server;

  broadcastMonitor(data: any) {
    const broadCastMessage = JSON.stringify(data);
    this.server.clients.forEach((client: WebSocket) => {
      if (client.protocol === 'egv-monitor') {
        client.send(broadCastMessage);
      }
    });
  }

  broadcastStatus(data: any) {
    const broadCastMessage = JSON.stringify(data);
    this.server.clients.forEach((client: WebSocket) => {
      if (client.protocol === 'egv-status') {
        client.send(broadCastMessage);
      }
    });
  }

  @SubscribeMessage('Datalog')
  async statusNotification(@MessageBody() request: CreateDatalogDto) {
    const doc = await this.dataLogsService.create(request);
    this.broadcastMonitor(doc);
    return { status: 'Accepted' };
  }
}
