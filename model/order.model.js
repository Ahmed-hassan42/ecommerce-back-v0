const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    // each item is its own object: which product, how many, and the price at purchase time
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        },
        price: Number
    }],

    status: {
        type: String,
        enum: ['ordered', 'shipped', 'out for delivery', 'delivered', 'return started', 'refunded'],
        default: 'ordered'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    purchasedAt: {
        type: Date,
        default: Date.now
    },
    totalPrice: Number,
    adress: {
        type: String
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
