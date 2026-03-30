const Product = require("../models/Product");

// create product
exports.createProduct = async (req, res) => {
    try {
        const productData = {
            ...req.body,
            image: req.file ? req.file.path : null
        };
        const product = new Product(productData);
        const saved = await product.save();
        res.status(201).json({
            message: "Product created successfully",
            product: saved
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        res.status(200).json({
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get single product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
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
        res.json({
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        res.json({
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        res.json({
            message: "Categories fetched successfully",
            categories
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// update product
exports.updateProduct = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({
            message: "Product deleted successfully",
            product: deletedProduct
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};