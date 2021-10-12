const { User, Order } = require("../models");


exports.list = async (req, res) => {
  const admins = await User.find({ role: 'admin' }).exec();
  res.json(admins);
}
