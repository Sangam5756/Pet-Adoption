import jwt from "jsonwebtoken";

export const authToken = async (req, res, next) => {
  try {
    let token = req.cookies?.token || "";   

if (!token) {
      return res.status(400).json({
        message: "please login",
      });
    }
    

    jwt.verify(token, process.env.SECRET_CODE, (err, decode) => {
      if (err) {
        console.log("err in auth", err);
      }
      req.id = decode.id;
      
      next();
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
