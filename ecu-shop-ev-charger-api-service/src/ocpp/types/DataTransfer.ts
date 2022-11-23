const VendorIdArray = [] as const;

const MessageIdArray = [] as const;

interface DataTransferPayloadRequest {
  vendorId: typeof VendorIdArray[number];
  messageId?: typeof MessageIdArray[number];
  data?: object | string;
}

interface DataTransferPayloadResponse {
  status?: 'Accepted' | 'Rejected' | 'UnknownMessageId' | 'UnknownVendorId';
  data?: object | string;
}

export {
  DataTransferPayloadRequest,
  DataTransferPayloadResponse,
  VendorIdArray,
  MessageIdArray,
};
