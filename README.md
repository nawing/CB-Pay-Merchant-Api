# CBPay Merchant MMQR Unofficial API Integration Package

An unofficial, personal-use TypeScript API integration package for connecting CBPay Merchant's MMQR functionalities into Node.js applications.
It provides a simple class-based wrapper around the CBPay REST API, handling authentication, token management, dynamic QR generation, status checking, and refunds.

> **Disclaimer:** This is an unofficial, community-driven integration package intended for personal reuse. It is not affiliated with, endorsed by, or maintained by CB Bank.

## Features

* Automatic token generation and management
* Dynamic QR Code generation (`requestQR`)
* Transaction status validation (`checkQR`)
* Payment refunds (`refund`)
* Strongly typed requests and responses

## Installation

```bash
npm install @mmpay-cb-mmqr --save
```

## Initialization

Initialize the instance by providing your merchant credentials. The integration kit will automatically handle fetching and attaching the required authorization tokens for subsequent API calls.

```typescript
import { CBPayMerchantApi } from '@mmpay-cb-mmqr';

const cbpay = CBPayMerchantApi({
  baseUrl: '[https://api.uat.cbbank.com](https://api.uat.cbbank.com)', // <<< I cannot disclose the routes. Contact CB Pay Merchant Onboarding Team
  sourceId: 'YOUR_SOURCE_ID',
  merchantId: 'YOUR_MERCHANT_ID',
  terminalId: 'YOUR_TERMINAL_ID',
  userId: 'YOUR_USER_ID',
  password: 'YOUR_PASSWORD'
});
```

------------------

## API Reference

#### 1. Request Dynamic QR (requestQR)
```typescript
const qrResponse = await cbpay.requestQR({
  transCurrency: 'MMK',
  transAmount: 15000,
  purposeOfTransaction: 'Purchase Order #8821',
  referenceNo: 'PO-8821'
});
console.log(qrResponse.qrCodeInfo);
```

#### Parameters (requestQR):
| Property | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `transCurrency` | `string` | **Yes** | Currency code |
| `transAmount` | `number` | **Yes** | Transaction amount |
| `referenceNo` | `string` | **Yes** | Your unique order or reference number |
| `purposeOfTransaction` | `string` | **Yes** | Description of the payment |

------------------


#### 2. Check QR Status
```typescript
const statusResponse = await cbpay.checkQR({
  qrReferenceNo: 'QR-REF-FROM-RESPONSE'
});

if (statusResponse.returnCode === '000') {
  console.log(statusResponse.transactionId);
}
```

#### Parameters (checkQR):
| Property | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `qrReferenceNo` | `string` | **Yes** | The qrReferenceNo received from the requestQR response |

------------------


#### 3. Refund Transaction (refund)

```typescript
const refundResponse = await cbpay.refund({
  transactionId: 'TXN-123456789',
  refundCurrency: 'MMK',
  refundAmount: 15000,
  isPartialRedund: false
});
```

#### Parameters (requestQR):
| Property | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `transactionId` | `string` | **Yes** | The original transaction ID |
| `refundAmount` | `number` | **Yes** | Amount to refund |
| `refundCurrency` | `string` | **Yes** | Currency code |
| `isPartialRedund` | `boolean` | **Yes** | Set to true for partial refunds |
