interface StartTransactionPayloadRequest {
  connectorId: number;
  idTag: string;
  meterStart: number;
  reservationId?: number;
  timestamp: Date;
}

interface StartTransactionPayloadResponse {
  idTagInfo: {
    expiryDate?: Date;
    parentIdTag?: string;
    status: 'Accepted' | 'Blocked' | 'Expired' | 'Invalid' | 'ConcurrentTx';
  };
  transactionId: number;
}

export { StartTransactionPayloadRequest, StartTransactionPayloadResponse };
