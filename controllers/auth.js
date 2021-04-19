const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const { name, email, password, phoneNo, location, age } = req.body;
  if (!name || !email || !password || !phoneNo || !location || !age) {
    return res.status(404).json({ error: "all fields are required" });
  }
  User.findOne({ phoneNo: req.body.phoneNo }, (err, user) => {
    if (user) {
      return res.status(400).json({ error: "Already Registered!" });
    }
  });

  let newUser = new User({
    name,
    email,
    password,
    phoneNo,
    location,
    age,
  });

  newUser.save((err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json({ user });
  });
};

exports.signin = (req, res) => {
  const { phoneNo, password } = req.body;

  if (!phoneNo || !password) {
    return res.status(404).json({ error: "all fields required" });
  }

  User.findOne({ phoneNo: req.body.phoneNo }).exec((err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "user with this PhoneNo does not exit please signup." });
    }

    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET, {
          expiresIn: "1d",
        });
        const { _id, name, email, phoneNo, age, location, role } = user;
        res.status(200).json({
          token,
          user: { _id, name, email, phoneNo, age, location, role },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};
