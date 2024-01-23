import User from "../models/user.model.js";
// import pkg from "bcryptjs";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";
// const { compareSync } = pkg;
export const signup = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created Successfully" });
  } catch (error) {
    // res.status(400).json(error.message);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // get one user
    const validUser = await User.findOne({ email });
    // confirm validity
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    // confirm password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    // confirm login token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // what to show on the client side
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); //1 hr
    res
      .cookie("access_token", token, { httpOnly: true, expiryDate })
      .status(200)
      .json(rest);
    // .json(validUser);
  } catch (error) {
    next(error);
  }
};
