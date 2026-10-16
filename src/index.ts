import {CheckQrRequest, CheckQrRequestOption, CheckQrResponse, CreateQrRequest, CreateQrRequestOption, CreateQrResponse, GetTokenRequest, GetTokenResponse, RefundRequest, RefundRequestOption, RefundResponse} from './types';

export {
  CheckQrRequest, CheckQrRequestOption, CheckQrResponse, CreateQrRequest, CreateQrRequestOption, CreateQrResponse, GetTokenRequest, GetTokenResponse, RefundRequest, RefundRequestOption, RefundResponse
};
/**
 * @Options
 * @Options
 * @Options
 */
export interface InstanceOptions {
  baseUrl: string;
  sourceId: string;
  merchantId: string;
  terminalId: string;
  userId: string;
  password: string;
}

/**
 * @CBPayMerchantApi
 * @CBPayMerchantApi
 * @CBPayMerchantApi
 * @param {InstanceOptions} options
 * @returns {CBPayMerchantClass} A status message string.
 */
export function CBPayMerchantApi(options: InstanceOptions): CBPayMerchantClass {
  return new CBPayMerchantClass({
    baseUrl: options.baseUrl,
    sourceId: options.sourceId,
    merchantId: options.merchantId,
    terminalId: options.terminalId,
    userId: options.userId,
    password: options.password,
  })
}

/**
 * @CBPayMerchantClass
 * @CBPayMerchantClass
 * @CBPayMerchantClass
 */
class CBPayMerchantClass {

  readonly #baseUrl: string;
  readonly #sourceId: string;
  readonly #merchantId: string;
  readonly #terminalId: string;
  readonly #userId: string;
  readonly #password: string;

  #bToken: string = '';

  constructor(options: InstanceOptions) {
    this.#baseUrl = options.baseUrl;
    this.#sourceId = options.sourceId;
    this.#merchantId = options.merchantId;
    this.#terminalId = options.terminalId;
    this.#userId = options.userId;
    this.#password = options.password;
  }

  /**
   * getToken
   * @returns {Promise<GetTokenResponse>}
   */
  private async getToken(): Promise<GetTokenResponse> {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      const payload: GetTokenRequest = {
        userId: this.#userId,
        password: this.#password,
      }
      const response = await fetch(`${this.#baseUrl}/auth/token`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(payload)
      });
      const originResponse = (await response.json()) as GetTokenResponse;
      this.#bToken = originResponse.token;
      return originResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  /**
   * requestQR
   * @param {CreateQrRequestOption} options
   * @returns {Promise<CreateQrResponse>}
   */
  public async requestQR(options: CreateQrRequestOption): Promise<CreateQrResponse> {
    try {
      await this.getToken(); // Get Replay Prevention Token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      const payload: CreateQrRequest = {
        transCurrency: options.transCurrency,
        transAmount: options.transAmount,
        purposeOfTransaction: options.purposeOfTransaction,
        referenceNo: options.referenceNo,
        token: this.#bToken,
        sourceId: this.#sourceId,
        merchantId: this.#merchantId,
        terminalId: this.#terminalId,
      }
      const response = await fetch(`${this.#baseUrl}/dynamicqr`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(payload)
      });
      return (await response.json()) as CreateQrResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  /**
   * checkQR
   * @param {CheckQrRequestOption} options
   * @returns {Promise<CheckQrResponse>}
   */
  public async checkQR(options: CheckQrRequestOption): Promise<CheckQrResponse> {
    try {
      await this.getToken(); // Get Replay Prevention Token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      const payload: CheckQrRequest = {
        token: this.#bToken,
        sourceId: this.#sourceId
      }
      const response = await fetch(`${this.#baseUrl}/dynamicqr/${options.qrReferenceNo}/status`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(payload)
      });
      return (await response.json()) as CheckQrResponse;
    } catch (error) {
      console.error(error)
      throw error;
    }
  }
  /**
   * refund
   * @param {RefundRequestOption} options
   * @returns {Promise<RefundResponse>}
   */
  public async refund(options: RefundRequestOption): Promise<RefundResponse> {
    try {
      await this.getToken(); // Get Replay Prevention Token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      const payload: RefundRequest = {
        token: this.#bToken,
        sourceId: this.#sourceId,
        transactionId: options.transactionId,
        refundCurrency: options.refundCurrency,
        refundAmount: options.refundAmount,
        isPartialRedund: options.isPartialRedund,
      }
      const response = await fetch(`${this.#baseUrl}/payment/refund`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(payload)
      });
      return (await response.json()) as RefundResponse;
    } catch (error) {
      console.error(error)
      throw error;
    }
  }
}
