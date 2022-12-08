import { AuthorizePayloadResponse } from '../Authorize';
import { BootNotificationPayloadResponse } from '../BootNotification';
import { DataTransferPayloadResponse } from '../DataTransfer';
import { StopTransactionPayloadResponse } from '../StopTransaction';
import { StartTransactionPayloadResponse } from '../StartTransaction';
import { HeartbeatPayloadResponse } from '../Heartbeat';

type AuthorizeResponse = [number, string, AuthorizePayloadResponse]

type BootNotificationResponse = [number, string, BootNotificationPayloadResponse]

type StatusNotificationResponse = [number, string, object]

type HeartbeatResponse = [number, string, HeartbeatPayloadResponse]

type MeterValuesResponse = [number, string, object]

type StartTransactionResponse = [number, string, StartTransactionPayloadResponse]

type StopTransactionResponse = [number, string, StopTransactionPayloadResponse]

type DataTransferResponse = [number, string, DataTransferPayloadResponse]

type FirmwareStatusNotificationResponse = [number, string, object]

type DiagnosticsStatusNotificationResponse = [number, string, object]

export {
  AuthorizeResponse,
  BootNotificationResponse,
  StatusNotificationResponse,
  HeartbeatResponse,
  MeterValuesResponse,
  StartTransactionResponse,
  StopTransactionResponse,
  DataTransferResponse,
  FirmwareStatusNotificationResponse,
  DiagnosticsStatusNotificationResponse,
};
