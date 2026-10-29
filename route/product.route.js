const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts
} = require('../controller/product.controller');
const authenticate = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/authorize.middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, authorize('admin'), upload.single('img'), createProduct);
router.put('/:id', authenticate, authorize('admin'), updateProduct);
router.delete('/:id', authenticate, authorize('admin'), deleteProduct);

module.exports = router;
