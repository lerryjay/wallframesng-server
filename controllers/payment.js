exports.validatePayment = async (reference, amount) =>{
  
  const testUrl = `https://qa.interswitchng.com/collections/api/v1/gettransaction.json?merchantcode=${process.env.MERCHANT_CODE}&transactionreference=${reference}&amount=${amount * 100}`;
  const liveUrl = `https://webpay.interswitchng.com/collections/api/v1/gettransaction.json?merchantcode=${process.env.MERCHANT_CODE}&transactionreference=${reference}&amount=${amount * 100}`;

  const res = await fetch(process.env.PRODUCTION_MODE ? liveUrl : testUrl, { method: 'POST', body: JSON.stringify({ transactionreference: reference,merchantcode : process.env.MERCHANT_CODE, amount : amount * 100  })});
  return res.Amount === amount;
}

