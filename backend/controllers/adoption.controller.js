import addpet from "../models/petAdopt.js";

export const petcart = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    const isAvailable = await addpet.findOne({ productId });

    if (isProductAvailable) {
      return res.json({
        message: "Already adopted",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      userId: currentUser,
    };

    const newAddToCart = new addpet(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      data: saveProduct,
      message: "Pet Added for adoption",
      success: true,
      error: false,
    });

  } catch (error) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};
