import SampledValue from './shared/SampledValue';

interface TransactionData {
  timestamp: Date;
  sampledValue: SampledValue[];
}

interface StopTransactionPayloadRequest {
  idTag?: string;
  meterStop: number;
  timestamp: Date;
  transactionId: number;
  reason?:
    | 'EmergencyStop'
    | 'EVDisconnected'
    | 'HardReset'
    | 'Local'
    | 'Other'
    | 'PowerLoss'
    | 'Reboot'
    | 'Remote'
    | 'SoftReset'
    | 'UnlockCommand'
    | 'DeAuthorized';
  transactionData?: TransactionData[];
}

interface StopTransactionPayloadResponse {
  idTagInfo: {
    expiryDate?: Date;
    parentIdTag?: string;
    status: 'Accepted' | 'Blocked' | 'Expired' | 'Invalid' | 'ConcurrentTx';
  };
}

export { StopTransactionPayloadRequest, StopTransactionPayloadResponse };
