export const authToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token || "";   
    console.log(token)

    if (!token) {
      return res.status(400).json({
        message: "please login",
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        console.log("err in auth", err);
      }

      req.userId = decode?.id;
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
