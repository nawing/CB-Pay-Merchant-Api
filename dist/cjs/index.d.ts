import { CheckQrRequest, CheckQrRequestOption, CheckQrResponse, CreateQrRequest, CreateQrRequestOption, CreateQrResponse, GetTokenRequest, GetTokenResponse, RefundRequest, RefundRequestOption, RefundResponse } from './types';
export { CheckQrRequest, CheckQrRequestOption, CheckQrResponse, CreateQrRequest, CreateQrRequestOption, CreateQrResponse, GetTokenRequest, GetTokenResponse, RefundRequest, RefundRequestOption, RefundResponse };
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
export declare function CBPayMerchantApi(options: InstanceOptions): CBPayMerchantClass;
/**
 * @CBPayMerchantClass
 * @CBPayMerchantClass
 * @CBPayMerchantClass
 */
declare class CBPayMerchantClass {
    #private;
    constructor(options: InstanceOptions);
    /**
     * getToken
     * @returns {Promise<GetTokenResponse>}
     */
    private getToken;
    /**
     * requestQR
     * @param {CreateQrRequestOption} options
     * @returns {Promise<CreateQrResponse>}
     */
    requestQR(options: CreateQrRequestOption): Promise<CreateQrResponse>;
    /**
     * checkQR
     * @param {CheckQrRequestOption} options
     * @returns {Promise<CheckQrResponse>}
     */
    checkQR(options: CheckQrRequestOption): Promise<CheckQrResponse>;
    /**
     * refund
     * @param {RefundRequestOption} options
     * @returns {Promise<RefundResponse>}
     */
    refund(options: RefundRequestOption): Promise<RefundResponse>;
}
