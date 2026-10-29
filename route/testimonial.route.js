const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const { getTestimonials, addTestimonial } = require('../controller/testimonial.controller');

router.get('/', getTestimonials);
router.post('/', authenticate, addTestimonial);

module.exports = router;
