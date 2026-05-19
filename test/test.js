const { CBPayMerchantApi } = require("../dist/cjs/index");
const dovenv = require("dotenv");
dovenv.config()
const { performance } = require("perf_hooks")

const CBPay = CBPayMerchantApi({
  baseUrl: process.env.BASE_URL,
  sourceId: process.env.SOURCE_ID,
  merchantId: process.env.MERCHANT_ID,
  terminalId: process.env.TERMINAL_ID,
  userId: process.env.USER_ID,
  password: process.env.PASSWORD,
});


/**
 * @start
 * @start
 * @start
 */
const start = async () => {
  const startTime = performance.now();
  try {
    const qrResponse = await CBPay.requestQR({
      transAmount: 5000,
      transCurrency: 'MMK',
      referenceNo: 'TEST-' + new Date().getTime(),
    })
    console.log(qrResponse)
    const end3Time = performance.now();
    const latency3Ms = (end3Time - startTime).toFixed(3);
    console.log(`\n--- Successful ---`);
    console.log(`**Network Latency: ${latency3Ms} ms**`);
  } catch (error) {
    console.error(error)
  }
}



start()
