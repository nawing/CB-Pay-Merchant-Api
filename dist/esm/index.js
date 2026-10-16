/**
 * @CBPayMerchantApi
 * @CBPayMerchantApi
 * @CBPayMerchantApi
 * @param {InstanceOptions} options
 * @returns {CBPayMerchantClass} A status message string.
 */
export function CBPayMerchantApi(options) {
    return new CBPayMerchantClass({
        baseUrl: options.baseUrl,
        sourceId: options.sourceId,
        merchantId: options.merchantId,
        terminalId: options.terminalId,
        userId: options.userId,
        password: options.password,
    });
}
/**
 * @CBPayMerchantClass
 * @CBPayMerchantClass
 * @CBPayMerchantClass
 */
class CBPayMerchantClass {
    #baseUrl;
    #sourceId;
    #merchantId;
    #terminalId;
    #userId;
    #password;
    #bToken = '';
    constructor(options) {
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
    async getToken() {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            const payload = {
                userId: this.#userId,
                password: this.#password,
            };
            const response = await fetch(`${this.#baseUrl}/auth/token`, {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(payload)
            });
            const originResponse = (await response.json());
            this.#bToken = originResponse.token;
            return originResponse;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    /**
     * requestQR
     * @param {CreateQrRequestOption} options
     * @returns {Promise<CreateQrResponse>}
     */
    async requestQR(options) {
        try {
            await this.getToken(); // Get Replay Prevention Token
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            const payload = {
                transCurrency: options.transCurrency,
                transAmount: options.transAmount,
                purposeOfTransaction: options.purposeOfTransaction,
                referenceNo: options.referenceNo,
                token: this.#bToken,
                sourceId: this.#sourceId,
                merchantId: this.#merchantId,
                terminalId: this.#terminalId,
            };
            const response = await fetch(`${this.#baseUrl}/dynamicqr`, {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(payload)
            });
            return (await response.json());
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    /**
     * checkQR
     * @param {CheckQrRequestOption} options
     * @returns {Promise<CheckQrResponse>}
     */
    async checkQR(options) {
        try {
            await this.getToken(); // Get Replay Prevention Token
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            const payload = {
                token: this.#bToken,
                sourceId: this.#sourceId
            };
            const response = await fetch(`${this.#baseUrl}/dynamicqr/${options.qrReferenceNo}/status`, {
                method: 'PATCH',
                headers: config.headers,
                body: JSON.stringify(payload)
            });
            return (await response.json());
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    /**
     * refund
     * @param {RefundRequestOption} options
     * @returns {Promise<RefundResponse>}
     */
    async refund(options) {
        try {
            await this.getToken(); // Get Replay Prevention Token
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            const payload = {
                token: this.#bToken,
                sourceId: this.#sourceId,
                transactionId: options.transactionId,
                refundCurrency: options.refundCurrency,
                refundAmount: options.refundAmount,
                isPartialRedund: options.isPartialRedund,
            };
            const response = await fetch(`${this.#baseUrl}/payment/refund`, {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(payload)
            });
            return (await response.json());
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
