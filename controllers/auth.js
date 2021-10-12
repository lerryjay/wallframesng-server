const User = require("../models/user");

exports.createUser = async (req, res) => {
  const { telephone, fullname } = req.body;
  const { email } = req.auth
  const newUser = await new User({ email, name: fullname, telephone }).save();
  res.json(newUser);
};

exports.createAdmin = async (req, res) => {
  const { telephone, fullname, email } = req.body;
  const newUser = await new User({ email, name: fullname, telephone, role: 'admin' }).save();
  res.json(newUser);
};


exports.createVendor = async (req, res) => {
  const { telephone, storename } = req.body;
  const { email } = req.auth
  const newUser = await new User({ email, name: storename, telephone, role: "vendor" }).save();
  res.json(newUser);
};

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  console.log(req.auth)
  User.findOne({ email: req.auth.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};

