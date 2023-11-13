const path = require("path");
const Product = require("../models/product");

exports.getAllProducts = async (req,res,next)=>{
    const products = await Product.findAll();
    res.json({ allProducts: products });
}

exports.getProduct = async (req,res,next)=>{
    const prodId = req.params.prodId;
    const product = await Product.findByPk(prodId);
    res.json({allProducts:product})
}

exports.postAddProduct = async (req, res, next) => {
  const product_name = req.body.product_name
  const product_desc = req.body.product_desc
  const product_price = req.body.product_price
  const product_quantity = req.body.product_quantity
  
  const product = await Product.create({
    product_name:product_name,
    product_desc:product_desc,
    product_price:product_price,
    product_quantity:product_quantity
  });
  res.json({ allProducts: product });
};

exports.buyProduct = async (req,res,next)=>{
  try{
    const prodId = req.query.prodId;
    const quantity = req.query.quantity;
    const product = await Product.findByPk(prodId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if(product.product_quantity>=quantity){
      product.product_quantity = product.product_quantity - quantity;
    }
    else{
      return res.json({error:"Stock not Available"})
    }
    
    // Check if the quantity is 0 and delete the product
    if (product.product_quantity <= 0) {
      await product.destroy();
      return res.json({
        success: "NO Stock left More",
      });
    }
    await product.save();
    res.json(product);
  }catch(err){
    res.status(500).json({ error: "Internal Server Error" });
  }
}



