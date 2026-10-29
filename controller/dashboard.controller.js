const Product = require('../model/product.model');
const Order = require('../model/order.model');
const User = require('../model/user.model');

exports.dashboard = async (req, res) => {
  try {
    const [totalProducts, activeProducts, deletedProducts, totalOrders, totalUsers] =
      await Promise.all([
        Product.countDocuments({ isDeleted: { $ne: true } }),
        Product.countDocuments({ isDeleted: { $ne: true }, isActive: true }),
        Product.countDocuments({ isDeleted: true }),
        Order.countDocuments(),
        User.countDocuments({ role: 'user' })
      ]);

    return res.status(200).json({
      totalProducts,
      activeProducts,
      deletedProducts,
      totalOrders,
      totalUsers
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
