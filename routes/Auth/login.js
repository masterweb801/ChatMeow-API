const express = require('express');
const cors = require('cors');
const User = require('../../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();
router.use(cors());

router.post('/', [
    body('email', "Invalid Email!").isEmail(),
    body('password', "Password Length Must Be At Least 6 Charecters").isLength({ min: 6 })
],
    async (req, res) => {
        let success = false;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ success, errors: error.array() });
        };

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authtoken })

        } catch (error) {
            console.error(error.message);
            res.status(500).json({success, message: "Internal Server Error"});
        }

    });

module.exports = router;