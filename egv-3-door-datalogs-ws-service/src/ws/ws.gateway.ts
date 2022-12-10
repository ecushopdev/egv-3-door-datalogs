import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { DatalogService } from '../datalog/datalog.service';
import { CreateDatalogDto } from '../datalog/dto/create-datalog.dto';
import WebSocket, { Server } from 'ws';

@WebSocketGateway()
export class WsGateway {
  constructor(private readonly datalogService: DatalogService) {}

  @WebSocketServer()
  server: Server;

  private broadcast(message: any) {
    const broadCastMessage = JSON.stringify(message);
    this.server.clients.forEach((client: WebSocket) => {
      if (client.protocol === 'egv-monitor') {
        client.send(broadCastMessage);
      }
    });
  }

  @SubscribeMessage('Datalog')
  async statusNotification(@MessageBody() request: CreateDatalogDto) {
    const doc = await this.datalogService.create(request);
    this.broadcast(doc);
    return { status: 'Accepted' };
  }
}
