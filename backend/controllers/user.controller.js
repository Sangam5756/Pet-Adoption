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
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not exists",
        success: false,
        error: true,
      });
    }

    const verifyPassword = await bcryptjs.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(400).json({
        message: "Please check password",
        error: true,
        success: false,
      });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      role: user.role,  // Add role to the token
    };

    const token = jwt.sign(tokenData, process.env.SECRET_CODE, {
      expiresIn: "1d",
    });

    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: true,  // Set to true if using HTTPS
      sameSite: 'None', // Required for cross-site cookies

      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    res.cookie("token", token, cookieOptions).status(200).json({
      message: "Login Successfully",
      token: token,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export const userLogout = async (req, res) => {
  try {
     const cookieOptions = {
      httpOnly: true,
      secure: true,
 sameSite: 'None',
    };

    return res.cookie("token",'', cookieOptions).status(200).json({
      message: "session-out",
      success: true,
    });

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


export const userDetailsController =async (req, res) => {
  try {
    const user = await userModel.findById(req.id).select("-password")

    
   res.status(200).json({
      data:user,
      success:true,
      error:false,
      message:"User Details"
    })





  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};



