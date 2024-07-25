const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwtAuth');

exports.checkUsername = async (req, res) => {
    const { username} = req.body;

    try {
        if (await User.findOne({ username: username })) {
            return res.status(200).json({ success: false, message: "please use another username" });
        }
        return res.status(200).json({ success: true, message: "done" });

    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }
};

exports.createUser = async (req, res) => {
    const { fName, lName, username, email, password } = req.body;

    try {
        if (await User.findOne({ $or: [{ email }, { username }] })) {
            return res.status(400).json({ success: false, error: "A user with this email or username already exists." });
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({ fName, lName, username, email, password: hashedPassword });
        const authToken = generateToken({ user: { id: user.id } });

        res.json({ success: true, authToken });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }
};

exports.login = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (!user) {
            return res.status(400).json({ success: false, error: "User does not exist" });
        }

        const isPasswordCorrect = await comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, error: "Incorrect password" });
        }

        const authToken = generateToken({ user: { id: user.id } });
        return res.json({ success: true, authToken });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json({ success: true, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};