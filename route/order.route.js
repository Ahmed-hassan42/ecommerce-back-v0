const { addPurchase, returnAllPurchases, returnUserPurchases } = require('../controller/order.controller');
const express = require('express');
const router= express.Router();
const authenticate = require('../middlewares/auth.middleware');
const {authorize} = require('../middlewares/authorize.middleware');

router.post('/',authenticate,authorize('user'),addPurchase);
router.get('/',authenticate,authorize('admin'),returnAllPurchases);

router.get('/my-orders',authenticate,authorize('user'),returnUserPurchases);

module.exports = router;
