"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CBPayMerchantClass_baseUrl, _CBPayMerchantClass_sourceId, _CBPayMerchantClass_merchantId, _CBPayMerchantClass_terminalId, _CBPayMerchantClass_userId, _CBPayMerchantClass_password, _CBPayMerchantClass_bToken;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CBPayMerchantApi = CBPayMerchantApi;
/**
 * @CBPayMerchantApi
 * @CBPayMerchantApi
 * @CBPayMerchantApi
 * @param {InstanceOptions} options
 * @returns {CBPayMerchantClass} A status message string.
 */
function CBPayMerchantApi(options) {
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
    constructor(options) {
        _CBPayMerchantClass_baseUrl.set(this, void 0);
        _CBPayMerchantClass_sourceId.set(this, void 0);
        _CBPayMerchantClass_merchantId.set(this, void 0);
        _CBPayMerchantClass_terminalId.set(this, void 0);
        _CBPayMerchantClass_userId.set(this, void 0);
        _CBPayMerchantClass_password.set(this, void 0);
        _CBPayMerchantClass_bToken.set(this, void 0);
        __classPrivateFieldSet(this, _CBPayMerchantClass_baseUrl, options.baseUrl, "f");
        __classPrivateFieldSet(this, _CBPayMerchantClass_sourceId, options.sourceId, "f");
        __classPrivateFieldSet(this, _CBPayMerchantClass_merchantId, options.merchantId, "f");
        __classPrivateFieldSet(this, _CBPayMerchantClass_terminalId, options.terminalId, "f");
        __classPrivateFieldSet(this, _CBPayMerchantClass_userId, options.userId, "f");
        __classPrivateFieldSet(this, _CBPayMerchantClass_password, options.password, "f");
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
                userId: __classPrivateFieldGet(this, _CBPayMerchantClass_userId, "f"),
                password: __classPrivateFieldGet(this, _CBPayMerchantClass_password, "f"),
            };
            const response = await fetch(`${__classPrivateFieldGet(this, _CBPayMerchantClass_baseUrl, "f")}/auth/token`, {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(payload)
            });
            const originResponse = (await response.json());
            __classPrivateFieldSet(this, _CBPayMerchantClass_bToken, originResponse.token, "f");
            return originResponse;
        }
        catch (error) {
            console.error(error);
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
                token: __classPrivateFieldGet(this, _CBPayMerchantClass_bToken, "f"),
                sourceId: __classPrivateFieldGet(this, _CBPayMerchantClass_sourceId, "f"),
                merchantId: __classPrivateFieldGet(this, _CBPayMerchantClass_merchantId, "f"),
                terminalId: __classPrivateFieldGet(this, _CBPayMerchantClass_terminalId, "f"),
            };
            const response = await fetch(`${__classPrivateFieldGet(this, _CBPayMerchantClass_baseUrl, "f")}/dynamicqr`, {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(payload)
            });
            return (await response.json());
        }
        catch (error) {
            console.error(error);
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
                token: __classPrivateFieldGet(this, _CBPayMerchantClass_bToken, "f"),
                sourceId: __classPrivateFieldGet(this, _CBPayMerchantClass_sourceId, "f")
            };
            const response = await fetch(`${__classPrivateFieldGet(this, _CBPayMerchantClass_baseUrl, "f")}/dynamicqr/${options.qrReferenceNo}/status`, {
                method: 'PATCH',
                headers: config.headers,
                body: JSON.stringify(payload)
            });
            return (await response.json());
        }
        catch (error) {
            console.error(error);
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
                token: __classPrivateFieldGet(this, _CBPayMerchantClass_bToken, "f"),
                sourceId: __classPrivateFieldGet(this, _CBPayMerchantClass_sourceId, "f"),
                transactionId: options.transactionId,
                refundCurrency: options.refundCurrency,
                refundAmount: options.refundAmount,
                isPartialRedund: options.isPartialRedund,
            };
            const response = await fetch(`${__classPrivateFieldGet(this, _CBPayMerchantClass_baseUrl, "f")}/payment/refund`, {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(payload)
            });
            return (await response.json());
        }
        catch (error) {
            console.error(error);
        }
    }
}
_CBPayMerchantClass_baseUrl = new WeakMap(), _CBPayMerchantClass_sourceId = new WeakMap(), _CBPayMerchantClass_merchantId = new WeakMap(), _CBPayMerchantClass_terminalId = new WeakMap(), _CBPayMerchantClass_userId = new WeakMap(), _CBPayMerchantClass_password = new WeakMap(), _CBPayMerchantClass_bToken = new WeakMap();
