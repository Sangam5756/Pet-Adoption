import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";


export const register = async (req, res) => {
  const data = req.body;

  try {
    const emailExists = await userModel.findOne({ email: data.email });
    if (emailExists) {
      res.status(400).json({
        message: "Already user Exists",
        success: false,
        error: true,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(data.password, salt);

    const payload = {
      ...data,
      password: hashpassword,
    };

    const newData = await new userModel(payload);
    newData.save();

    res.status(200).json({
      message: "user created successfully",
      data: newData,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkemail = await userModel.findOne({ email });
    // console.log(email);
    if (!checkemail) {
      res.status(400).json({
        message: "User Not exists",
        success: false,
        error: true,
      });
    }

    const user = await userModel.findOne({email});

    const verifyPassword = await bcryptjs.compare(password, user.password);
    if (!verifyPassword) {
      res.status(400).json({
        message: "please check password",
        error: true,
        success: false,
      });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_CODE, {
      expiresIn: "1d",
    });

    // time to store in browser
    const cookieOptions = {
      httpOnly: true,
      secure: false,
    };

    res.cookie("token", token, cookieOptions).status(200).json({
      message: "Login Successfully",
      token: token,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "user logout successfully",
      error: false,
      data: [],
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: true,
      error: false,
    });
  }
};

export const userDetailsController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    res.status(200).json({
      data: user,
      success: true,
      error: false,
      message: "User Details",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
