const axios = require('axios');
const { Product, Order, User, Cart } = require("../models");

exports.create = async (req, res) => {
  const user = req.user;
  const { txnref, couponApplied } = req.body;

  const referenceExists = await Order.findOne({ 'payment.reference': txnref });
  if (referenceExists) return res.json({ message: "Unable to verify payment: Reference exists!" }).status(403);

  const cart = await Cart.findOne({ orderdBy: user._id }).exec();
  if (!cart) return res.json({ message: "Please add items to cart to checkout!" }).status(403);

  const { products, cartTotal, totalAfterDiscount } = cart;
  let orderProducts = []
  orderProducts = await Promise.all(products.map(async item => {
    const productData = await Product.findOne({ _id: item.product })
    const { count, color, price, product } = item
    return { count, color, price, product, vendor_id: productData.vendor_id }
  }))

  const amount = couponApplied ? totalAfterDiscount : cartTotal;

  const verifyPayment = await axios.get(`${process.env.QUICKTELLER_URL}gettransaction.json?merchantcode=${process.env['QUICKTELLER_MERCHANT_CODE']}&transactionreference=${txnref}&amount=${amount * 100}`).catch(err => console.log('Got error', err));

  if (!verifyPayment.data || verifyPayment.data.Amount !== (amount * 100)) return res.json({ message: "Unable to verify payment" }).status(403);
  await new Order({
    products: orderProducts,
    amount: cartTotal,
    payment: {
      reference: txnref,
      currency: "NGN",
      status: "Paid",
      method: "Interswitch",
      amount,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    orderdBy: user._id,
  }).save();

  // decrement quantity, increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  await Product.bulkWrite(bulkOption, {});
  res.json({ message: "Order Successful" });
};


exports.createCashOrder = async (req, res) => {
  const { COD, couponApplied } = req.body;
  // if COD is true, create order with status of Cash On Delivery

  if (!COD) return res.status(400).send("Create cash order failed");

  const user = await User.findOne({ email: req.user.email }).exec();

  let userCart = await Cart.findOne({ orderdBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount * 100;
  } else {
    finalAmount = userCart.cartTotal * 100;
  }

  let newOrder = await new Order({
    products: userCart.products,
    payment: {
      reference: 'WFN' + uniqueid(),
      currency: "NGN",
      status: "Pending",
      method: "Cash",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    orderdBy: user._id,
    orderStatus: "Cash On Delivery",
  }).save();

  // decrement quantity, increment sold
  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log("PRODUCT QUANTITY-- AND SOLD++", updated);

  console.log("NEW ORDER SAVED", newOrder);
  res.json({ ok: true });
};

exports.ordersByUser = async (req, res) => {
  let userOrders = await Order.find({ orderdBy: req.user._id })
    .populate("products.product")
    .exec();

  res.json(userOrders);
};

exports.ordersByVendor = async (req, res) => {
  let where = { 'products.vendor_id': req.user._id };
  if (req.query.order_status) where.orderStatus = req.query.order_status;

  const orders = await Order.find(where).sort([["createdAt", "desc"]])
    .limit(parseInt(req.params.count))
    .populate("products.product")
    .exec();
  res.json(orders);
}

exports.ordersByAdmin = async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();

  res.json(allOrders);
};

exports.updateStatus = async (req, res) => {

  const { status } = req.body;
  console.log(status, 'status')

  let updated = await Order.findByIdAndUpdate(
    req.params.orderId,
    { orderStatus: status },
    { new: true }
  ).exec();



  res.json(updated);
};
