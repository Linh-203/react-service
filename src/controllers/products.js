import Products from "../models/products"

export const createProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    return res.status(201).json({
      message: "Create product successfully",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};


