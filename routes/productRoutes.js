const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');
const { validateProduct } = require('../middleware/productValidator');
const { protect } = require('../middleware/authMiddleware');

// public routes
router.get('/', productController.getProducts);
router.get('/categories', productController.getCategories);
router.get('/name/:name', productController.getProductsByName);
router.get('/:id', productController.getProductById);

// private routes
router.post('/', protect, upload.single('image'), validateProduct, productController.createProduct);
router.put('/:id', protect, upload.single('image'), validateProduct, productController.updateProduct);
router.delete('/:id', protect, productController.deleteProduct);

module.exports = router;