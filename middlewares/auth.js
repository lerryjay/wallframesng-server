const admin = require("../firebase");
const User = require("../models/user");


exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); // token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.auth = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.subscriberOrVendor = async (req, res) => {
  const { email } = req.auth;

  const user = await User.findOne({ email }).exec();

  if (!user || (user.role !== "vendor" && user.role !== "subscriber")) {
    res.status(403).json({
      err: "Vendor resource. Access denied.",
    });
  } else {
    req.user = user
    next();
  }
}

exports.vendorCheck = async (req, res, next) => {
  const { email } = req.auth;

  const user = await User.findOne({ email }).exec();

  if (!user || user.role !== "vendor") {
    res.status(403).json({
      err: "Vendor resource. Access denied.",
    });
  } else {
    req.user = user
    next();
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.auth;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    req.user = adminUser
    next();
  }
};

exports.adminOrVendor = async (req, res, next) => {
  const { email } = req.auth;

  const user = await User.findOne({ email }).exec();

  if (user.role !== "vendor" && user.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    req.user = user
    next();
  }
};