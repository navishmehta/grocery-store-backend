const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');
const { validateProduct } = require('../middleware/productValidator');

router.post('/', upload.single('image'), validateProduct, productController.createProduct);
router.get('/', productController.getProducts);
router.get('/categories', productController.getCategories);
router.get('/name/:name', productController.getProductsByName);
router.get('/:id', productController.getProductById);

router.put('/:id', upload.single('image'), validateProduct, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;