const express = require('express');
const cors = require('cors');
const Message = require('../../models/Messages');
const fetchUser = require('../../middleware/fetchUser');

const router = express.Router();
router.use(cors());

router.post('/', fetchUser, async (req, res) => {
    let success = false;
    try {
        const { id } = req.body;
        const chat = await Message.find({ $or: [{ in_user_id: req.user.id, out_user_id: id }, { in_user_id: id, out_user_id: req.user.id }] });
        res.json(chat);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
})

module.exports = router;