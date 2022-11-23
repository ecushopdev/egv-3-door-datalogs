import OcppAction from '../shared/OcppAction';
import { AuthorizePayloadRequest } from '../Authorize';
import { BootNotificationPayloadRequest } from '../BootNotification';
import { DataTransferPayloadRequest } from '../DataTransfer';
import { DiagnosticsStatusNotificationPayloadRequest } from '../DiagnosticsStatusNotification';
import { FirmwareStatusNotificationPayloadRequest } from '../FirmwareStatusNotification';
import { StatusNotificationPayloadRequest } from '../StatusNotification';
import { StopTransactionPayloadRequest } from '../StopTransaction';
import { StartTransactionPayloadRequest } from '../StartTransaction';
import { MeterValuesPayloadRequest } from '../MeterValues';

type AuthorizeRequest = [number, string, OcppAction.Authorize, AuthorizePayloadRequest]

type BootNotificationRequest = [number, string, OcppAction.BootNotification, BootNotificationPayloadRequest]

type StatusNotificationRequest = [number, string, OcppAction.StatusNotification, StatusNotificationPayloadRequest]

type HeartbeatRequest = [number, string, OcppAction.Heartbeat, object]

type MeterValuesRequest = [number, string, OcppAction.MeterValues, MeterValuesPayloadRequest]

type StartTransactionRequest = [number, string, OcppAction.StartTransaction, StartTransactionPayloadRequest]

type StopTransactionRequest = [number, string, OcppAction.StopTransaction, StopTransactionPayloadRequest]

type DataTransferRequest = [number, string, OcppAction.DataTransfer, DataTransferPayloadRequest]

type FirmwareStatusNotificationRequest = [number, string, OcppAction.FirmwareStatusNotification, FirmwareStatusNotificationPayloadRequest]

type DiagnosticsStatusNotificationRequest = [number, string, OcppAction.DiagnosticsStatusNotification, DiagnosticsStatusNotificationPayloadRequest]

export {
  AuthorizeRequest,
  BootNotificationRequest,
  StatusNotificationRequest,
  HeartbeatRequest,
  MeterValuesRequest,
  StartTransactionRequest,
  StopTransactionRequest,
  DataTransferRequest,
  FirmwareStatusNotificationRequest,
  DiagnosticsStatusNotificationRequest,
};
