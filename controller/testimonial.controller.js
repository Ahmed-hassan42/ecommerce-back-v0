const Testimonial = require('../model/testimonial.model');

// public: anyone can read testimonials
exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find()
            .sort({ createdAt: -1 })
            .limit(50)
            .select('name message rating createdAt');
        res.status(200).json({ data: testimonials });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// logged-in users only
exports.addTestimonial = async (req, res) => {
    try {
        const { message, rating } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({ message: 'message is required' });
        }

        const testimonial = await Testimonial.create({
            user: req.user._id,
            name: req.user.name || req.user.email,
            message,
            rating: Number(rating) || 5
        });

        res.status(201).json({ message: 'testimonial added', data: testimonial });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
