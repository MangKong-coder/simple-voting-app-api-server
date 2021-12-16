const User = require('../models/user');

module.exports = async (req, res, next) => {
    const user = await User.findByPk(req.userId);
    if (user.isAdmin === true) {
        next()
    } else {
        const error = new Error('Not an admin');
        error.statusCode(401);
        throw error;
    }
}