const express = require('express');
const cors = require('cors');
const User = require('../../models/Users');
const fetchUser = require('../../middleware/fetchUser');

const router = express.Router();
router.use(cors());

router.post('/', fetchUser, async (req, res) => {
    let success = false;
    let uid = req.user.id;
    let opt = [];
    try {
        const users = await User.find({}).select("-password");
        for (let i = 0; i < users.length; i++) {
            if (users[i]._id.toString() !== uid) {
                opt.push(users[i]);
            }
        }
        res.json(opt);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
})

module.exports = router;