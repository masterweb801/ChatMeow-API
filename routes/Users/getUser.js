const express = require('express');
const cors = require('cors');
const User = require('../../models/Users');
const fetchUser = require('../../middleware/fetchUser');

const router = express.Router();
router.use(cors());

router.post('/', fetchUser, async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

module.exports = router;