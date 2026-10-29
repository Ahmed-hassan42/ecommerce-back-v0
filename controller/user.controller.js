const User = require('../model/user.model');
const jwt = require('jsonwebtoken');

const signinToken = (myUser) => {
    const { _id, role, name } = myUser;
    return jwt.sign(
        { _id, role, name },
        process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRIES_IN }
    );
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const myUser = await User.findOne({ email });
    if (!myUser) {
        return res.status(401).json({ error: 'unauthorized invalid email or password' });
    }

    if (await myUser.isCorrectPassword(password)) {
        const token = signinToken(myUser);
        return res.status(200).json({ token: token });
    }

    res.status(401).json({ error: 'unauthorized invalid email or password' });
};

exports.addUser = async (req, res) => {
    const { name, email, password, phoneNumber, adress } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'email and password are required' });
    }

    try {
        const myUser = await User.create({ name, email, password, phoneNumber, adress });

        // never send the password hash back
        const { password: _pw, ...safeUser } = myUser.toObject();
        res.status(201).json({ message: 'user added to DB', data: safeUser });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'this email is already registered' });
        }
        res.status(400).json({ message: error.message });
    }
};
