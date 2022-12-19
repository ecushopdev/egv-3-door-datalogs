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

  broadcast(event: string, data: any) {
    const broadCastMessage = JSON.stringify({
      event,
      data,
    });
    this.server.clients.forEach((client: WebSocket) => {
      if (client.protocol === 'egv-monitor') {
        client.send(broadCastMessage);
      }
    });
  }

  @SubscribeMessage('Datalog')
  async statusNotification(@MessageBody() request: CreateDatalogDto) {
    const doc = await this.dataLogsService.create(request);
    this.broadcast('Monitor', doc);
    return { status: 'Accepted' };
  }
}
