const { User } = require("../models");

exports.list = async (req, res) => {
  const vendors = await User.find({ role: 'vendor' }).exec();
  res.json(vendors);
}

