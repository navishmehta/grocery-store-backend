const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');

router.post('/', upload.single('image'), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/categories', productController.getCategories);
router.get('/name/:name', productController.getProductsByName);
router.get('/:id', productController.getProductById);

router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;    