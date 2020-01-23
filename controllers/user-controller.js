const User = require("../models/user");

const getUser = async (req, res, next) => {
  const userId = req.params.uid;
  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (error) {
    console.log("[server:user-controller]", error);
    return next();
  }

  let user = existingUser.toObject({ getters: true });
  delete user.password;

  res.json({
    user
  });
};

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
    return next(error);
  }

  if (existingUser) {
    return next(error);
  }

  const createdUser = new User({
    username,
    email,
    password
  });

  try {
    await createdUser.save();
  } catch (error) {
    console.log(error);
    return next();
  }

  let user = createdUser.toObject({ getters: true });
  delete user.password;

  res.status(201).json({ user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
    return next(error);
  }

  if (!existingUser || existingUser.password != password) {
    return next(error);
  }

  let user = existingUser.toObject({ getters: true });
  delete user.password;

  res.json({
    message: "Logged in!",
    user
  });
};

exports.getUser = getUser;
exports.createUser = createUser;
exports.login = login;
