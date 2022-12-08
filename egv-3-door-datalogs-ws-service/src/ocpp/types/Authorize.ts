interface AuthorizePayloadRequest {
  idTag: string;
}

interface AuthorizePayloadResponse {
  idTagInfo: {
    status: 'Accepted' | 'Blocked' | 'Expired' | 'Invalid' | 'ConcurrentTx';
    expiryDate?: string;
    parentIdTag?: string;
  };
}

export { AuthorizePayloadRequest, AuthorizePayloadResponse };
