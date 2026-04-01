const Product = require("../models/Product");

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        console.log("Incoming Product Data (req.body):", JSON.stringify(req.body, null, 2));
        const productData = { ...req.body };

        if (req.file) productData.image = req.file.path;

        if (String(productData.hasDiscount) === 'false') {
            productData.discountPrice = null;
        }

        const product = new Product(productData);
        await product.save();

        res.status(201).json({ success: true, product });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// get all products
exports.getProducts = async (req, res) => {
    try {
        const { category } = req.query;
        let filter = {};
        if (category) filter.category = category;
        const products = await Product.find(filter);
        if (products.length === 0) {
            return res.status(404).json({ message: "No product found" });
        }
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// get single product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json({ success: true, product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// get products by category
exports.getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        if (products.length === 0) {
            return res.status(404).json({ message: "Products not found" });
        }
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// get products by name
exports.getProductsByName = async (req, res) => {
    try {
        const { name } = req.params;
        const products = await Product.find({ name });
        if (products.length === 0) {
            return res.status(404).json({ message: "Products not found" });
        }
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET BY ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// update product
exports.updateProduct = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.image = req.file.path;

        if (String(updateData.hasDiscount) === 'false') {
            updateData.discountPrice = null;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// delete product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ success: true, product: deletedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// validate cart
exports.validateCart = async (req, res) => {
    try {

        const { itemIds } = req.body;
        const unavailable = await Product.find({
            _id: { $in: itemIds },
            isOutOfStock: true
        }).select('_id name');

        res.status(200).json({
            success: true,
            unavailableIds: unavailable.map(p => p._id)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};