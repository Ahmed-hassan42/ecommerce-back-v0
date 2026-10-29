const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/authorize.middleware');
const { dashboard } = require('../controller/dashboard.controller');

router.get('/', authenticate, authorize('admin'), dashboard);

module.exports = router;
