const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');
const Order = require('../models/Order');

// Momo config (replace with your actual Momo sandbox credentials and URLs)
const MOMO_ENDPOINT = 'https://test-payment.momo.vn/v2/gateway/api/create';
const PARTNER_CODE = 'your_partner_code';
const ACCESS_KEY = 'your_access_key';
const SECRET_KEY = 'your_secret_key';
const REDIRECT_URL = 'https://your-frontend.com/payment-success';
const IPN_URL = 'https://your-backend.com/api/payment/momo-ipn';

// VNPay config (replace with your sandbox credentials)
const VNP_TMNCODE = 'your_vnp_tmncode';
const VNP_HASH_SECRET = 'your_vnp_hash_secret';
const VNP_URL = 'http://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder';
const VNP_RETURN_URL = 'https://your-frontend.com/vnpay-return';

// Create Momo payment request
const createMomoPayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    const requestId = `${orderId}-${Date.now()}`;
    const orderInfo = 'Thanh toán đơn hàng ' + orderId;
    const rawSignature = `accessKey=${ACCESS_KEY}&amount=${amount}&extraData=&ipnUrl=${IPN_URL}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${PARTNER_CODE}&redirectUrl=${REDIRECT_URL}&requestId=${requestId}&requestType=captureWallet`;

    const signature = crypto.createHmac('sha256', SECRET_KEY)
      .update(rawSignature)
      .digest('hex');

    const payload = {
      partnerCode: PARTNER_CODE,
      accessKey: ACCESS_KEY,
      requestId,
      amount: amount.toString(),
      orderId,
      orderInfo,
      redirectUrl: REDIRECT_URL,
      ipnUrl: IPN_URL,
      extraData: '',
      requestType: 'captureWallet',
      signature,
      lang: 'vi'
    };

    const momoRes = await axios.post(MOMO_ENDPOINT, payload);
    res.json(momoRes.data);
  } catch (err) {
    res.status(500).json({ message: 'Momo payment error', error: err.message });
  }
};

// Handle Momo IPN (payment notification)
const handleMomoIPN = async (req, res) => {
  try {
    const { orderId, resultCode, transId } = req.body;
    // TODO: Verify Momo signature here for security!

    const order = await Order.findOne({ _id: orderId });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (resultCode === 0) { // 0 means payment success
      order.paymentStatus = 'paid';
      order.paymentDetails = {
        provider: 'momo',
        transactionId: transId,
        paidAt: new Date(),
      };
      order.status = 'paid';
      await order.save();
      return res.json({ message: 'Payment recorded' });
    } else {
      order.paymentStatus = 'failed';
      order.paymentDetails = {
        provider: 'momo',
        transactionId: transId,
        failedAt: new Date(),
      };
      order.status = 'cancelled';
      await order.save();
      return res.json({ message: 'Payment failed' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Momo IPN error', error: err.message });
  }
};

// Create VNPay payment request
const createVNPayPayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const date = new Date();
    const createDate = date
      .toISOString()
      .replace(/[-:TZ.]/g, '')
      .slice(0, 14);

    const vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: VNP_TMNCODE,
      vnp_Amount: (amount * 100).toString(), // VNPay uses VND * 100
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: 'Thanh toan don hang ' + orderId,
      vnp_OrderType: 'other',
      vnp_Locale: 'vn',
      vnp_ReturnUrl: VNP_RETURN_URL,
      vnp_IpAddr: req.ip || '127.0.0.1',
      vnp_CreateDate: createDate,
    };

    // Sort params and build query string
    const sortedParams = {};
    Object.keys(vnp_Params)
      .sort()
      .forEach((key) => {
        sortedParams[key] = vnp_Params[key];
      });

    const signData = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', VNP_HASH_SECRET);
    const secureHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    sortedParams.vnp_SecureHash = secureHash;

    const paymentUrl = `${VNP_URL}?${querystring.stringify(sortedParams, { encode: true })}`;
    res.json({ paymentUrl });
  } catch (err) {
    res.status(500).json({ message: 'VNPay payment error', error: err.message });
  }
};

// Handle VNPay IPN (payment notification)
const handleVNPayIPN = async (req, res) => {
  try {
    const { vnp_TxnRef, vnp_ResponseCode, vnp_TransactionNo } = req.query;
    // TODO: Verify VNPay signature here for security!

    const order = await Order.findOne({ _id: vnp_TxnRef });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (vnp_ResponseCode === '00') { // 00 means payment success
      order.paymentStatus = 'paid';
      order.paymentDetails = {
        provider: 'vnpay',
        transactionId: vnp_TransactionNo,
        paidAt: new Date(),
      };
      order.status = 'paid';
      await order.save();
      return res.json({ message: 'Payment recorded' });
    } else {
      order.paymentStatus = 'failed';
      order.paymentDetails = {
        provider: 'vnpay',
        transactionId: vnp_TransactionNo,
        failedAt: new Date(),
      };
      order.status = 'cancelled';
      await order.save();
      return res.json({ message: 'Payment failed' });
    }
  } catch (err) {
    res.status(500).json({ message: 'VNPay IPN error', error: err.message });
  }
};

module.exports = {
  createMomoPayment,
  createVNPayPayment,
  handleMomoIPN,
  handleVNPayIPN,
};