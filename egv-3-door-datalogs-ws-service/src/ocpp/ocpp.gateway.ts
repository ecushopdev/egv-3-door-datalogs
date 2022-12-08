import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import WebSocket from 'ws';
import {
  AuthorizeRequest,
  BootNotificationRequest,
  DataTransferRequest,
  DiagnosticsStatusNotificationRequest,
  FirmwareStatusNotificationRequest,
  HeartbeatRequest,
  MeterValuesRequest,
  StartTransactionRequest,
  StatusNotificationRequest,
  StopTransactionRequest,
} from './types/message/request';
import {
  AuthorizeResponse,
  BootNotificationResponse,
  DataTransferResponse,
  DiagnosticsStatusNotificationResponse,
  FirmwareStatusNotificationResponse,
  HeartbeatResponse,
  MeterValuesResponse,
  StartTransactionResponse,
  StatusNotificationResponse,
  StopTransactionResponse,
} from './types/message/response';
import { DataTransferPayloadResponse, MessageIdArray, VendorIdArray } from './types/DataTransfer';

@WebSocketGateway()
export class OcppGateway {
  @SubscribeMessage('Authorize')
  authorize(
    @MessageBody() request: AuthorizeRequest,
    @ConnectedSocket() client: WebSocket,
  ): AuthorizeResponse {
    return [
      3,
      request[1],
      {
        idTagInfo: {
          status: 'Accepted',
          expiryDate: new Date().toISOString(),
        },
      },
    ];
  }

  @SubscribeMessage('BootNotification')
  bootNotification(
    @MessageBody()
      request: BootNotificationRequest,
    @ConnectedSocket() client: WebSocket,
  ): BootNotificationResponse {
    return [
      3,
      request[1],
      {
        currentTime: new Date().toISOString(),
        interval: 30,
        status: 'Accepted',
      },
    ];
  }

  @SubscribeMessage('StatusNotification')
  statusNotification(
    @MessageBody()
      request: StatusNotificationRequest,
    @ConnectedSocket() client: WebSocket,
  ): StatusNotificationResponse {
    return [3, request[1], {}];
  }

  @SubscribeMessage('Heartbeat')
  heartbeat(
    @MessageBody() request: HeartbeatRequest,
    @ConnectedSocket() client: WebSocket,
  ): HeartbeatResponse {
    return [3, request[1], { currentTime: new Date().toISOString() }];
  }

  @SubscribeMessage('MeterValues')
  meterValues(
    @MessageBody() request: MeterValuesRequest,
    @ConnectedSocket() client: WebSocket,
  ): MeterValuesResponse {
    return [3, request[1], {}];
  }

  @SubscribeMessage('StartTransaction')
  startTransaction(
    @MessageBody()
      request: StartTransactionRequest,
    @ConnectedSocket() client: WebSocket,
  ): StartTransactionResponse {
    return [
      3,
      request[1],
      {
        idTagInfo: {
          status: 'Accepted',
        },
        transactionId: 1,
      },
    ];
  }

  @SubscribeMessage('StopTransaction')
  stopTransaction(
    @MessageBody()
      request: StopTransactionRequest,
    @ConnectedSocket() client: WebSocket,
  ): StopTransactionResponse {
    return [
      3,
      request[1],
      {
        idTagInfo: {
          status: 'Accepted',
        },
      },
    ];
  }

  @SubscribeMessage('DataTransfer')
  dataTransfer(
    @MessageBody() request: DataTransferRequest,
    @ConnectedSocket() client: WebSocket,
  ): DataTransferResponse {
    const [, , , Payload] = request;
    const { vendorId, messageId } = Payload;
    let payload: DataTransferPayloadResponse = {};
    if (!VendorIdArray.includes(vendorId))
      payload = { status: 'UnknownVendorId' };
    if (messageId) {
      if (!MessageIdArray.includes(messageId))
        payload = { status: 'UnknownMessageId' };
    }

    return [3, request[1], payload];
  }

  @SubscribeMessage('FirmwareStatusNotification')
  firmwareStatusNotification(
    @MessageBody()
      request: FirmwareStatusNotificationRequest,
    @ConnectedSocket() client: WebSocket,
  ): FirmwareStatusNotificationResponse {
    return [3, request[1], {}];
  }

  @SubscribeMessage('DiagnosticsStatusNotification')
  diagnosticsStatusNotification(
    @MessageBody()
      request: DiagnosticsStatusNotificationRequest,
    @ConnectedSocket() client: WebSocket,
  ): DiagnosticsStatusNotificationResponse {
    return [3, request[1], {}];
  }
}
