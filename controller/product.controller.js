const Product = require('../model/product.model');




const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({
  isDeleted: { $ne: true }
}); 
        return res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const getProducts = async (req, res) => {

    const filter = {};

    if (req.query.category) {
        filter.category = req.query.category;
    }

    let query =  Product.find(filter);

    if (req.query.sort === 'price') {
        query = query.sort({ price: -1 });

        
    }

    const products = await query;

    res.json({
        data: products
    });

};

const getProductById = async (req,res) =>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product || product.isDeleted) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({
            message:"getting one product",
            data: product
        });
    } catch (error) {
        res.status(400).json({ message: 'Invalid product id' });
    }
}


const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
        name: req.body.name,
        price: Number(req.body.price),
        slug:req.body.slug,
        category: req.body.category,
        subCategory:req.body.subCategory,
        imgURL: req.file ? req.file.filename : null,
        isDeleted:req.body.isDeleted,
        isActive:req.body.isActive
    });

    res.status(201).json({
        message: 'Product created',
        data: product
    });
  } catch (error) {
    if (error.code === 11000) {
        return res.status(409).json({ message: 'A product with this slug already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};



const updateProduct = async (req,res) =>{
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({message:'item updated successfully', data: product});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.status(200).json({
      message: 'Product soft-deleted successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {getProducts,getProductById,createProduct,deleteProduct,updateProduct,getAllProducts};