const Order = require('../model/order.model');
const Product = require('../model/product.model');

// body: { items: [{ productId, quantity }, ...], adress: 'delivery address' }
exports.addPurchase = async (req, res) => {
    try {
        const { items, adress } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ msg: 'order must contain at least one product' });
        }

        if (!adress || !adress.trim()) {
            return res.status(400).json({ msg: 'delivery address is required' });
        }

        const orderProducts = [];
        let totalPrice = 0;

        for (const item of items) {
            const quantity = Number(item.quantity) || 1;
            const product = await Product.findOne({ _id: item.productId, isDeleted: { $ne: true } });

            if (!product) {
                return res.status(404).json({ msg: 'product not found: ' + item.productId });
            }

            orderProducts.push({ product: product._id, quantity, price: product.price });
            totalPrice += product.price * quantity;
        }

        const myOrder = await Order.create({
            products: orderProducts,
            user: req.user._id,
            totalPrice,
            adress: adress.trim()
        });

        res.status(201).json({ msg: 'purchased', data: myOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'problem in order' });
    }
};

exports.returnUserPurchases = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('products.product');
        res.status(200).json({ data: orders });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.returnAllPurchases = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('products.product')
            .populate('user', 'name email');
        res.status(200).json({ data: orders });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
