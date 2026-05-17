// --------- Request Token -----------
// --------- Request Token -----------

export interface GetTokenRequest {
  userId: string;
  password: string;
}
export interface GetTokenResponse {
  token: string;
  returnCode: string; // integer in string
  message: string;
  expiredDateTime: string; // timestamp in string
}

// --------- Create QR -----------
// --------- Create QR -----------

export interface CreateQrRequestOption {
  transCurrency: string;
  transAmount: number;
  purposeOfTransaction?: string;
  referenceNo: string;
}
export interface CreateQrRequest extends CreateQrRequestOption {
  token: string;
  sourceId: string;
  merchantId: string;
  terminalId: string;
}
export interface CreateQrResponse {
  returnCode: string; // integer in string
  message: string;
  referenceNo: string;
  qrCodeInfo: string;
  qrReferenceNo: string;
  qrIssuedDateTime: string;
  qrExpiredDateTime: string;
}

// --------- Check Status -----------
// --------- Check Status -----------

export interface CheckQrRequestOption {
  qrReferenceNo: string;
}
export interface CheckQrRequest {
  token: string;
  sourceId: string;
}
export interface CheckQrResponse {
  referenceNo: string;
  returnCode: string;
  transactionId: string;
  transCurrency: string;
  transDateTime: string;
  transAmount: number;
  qrReferenceNo: string;
  institutionId: string;
  institutionName: string;
  merchantId: string;
  message: string;
  remark: string;
}

// --------- Refund -----------
// --------- Refund -----------

export interface RefundRequestOption {
  transactionId: string;
  refundCurrency: string;
  refundAmount: number;
  isPartialRedund: boolean;
}
export interface RefundRequest extends RefundRequestOption {
  token: string;
  sourceId: string;
}
export interface RefundResponse {
  transactionId: string;
  returnCode: string;
  message: string;
}

// --------- Callback -----------
// --------- Callback -----------

export interface CallbackRequest {
  apiKey: string;
  referenceNo: string;
  transactionId: string;
  transCurrency: string;
  transAmount: number;
  transDateTime: string;
  transStatusCode: string;
  transStatusDescription: string;
  qrReferenceNo: string;
  institutionId: string;
  institutionName: string;
  merchantId: string;
}
export interface CallbackResponse {
  qrReferenceNo: string;
  returnCode: string;
  message: string;
}
