const express = require('express');
const cors = require('cors');
const Message = require('../../models/Messages');
const fetchUser = require('../../middleware/fetchUser');

const router = express.Router();
router.use(cors());

router.post('/', fetchUser, async (req, res) => {
    let success = false;
    try {
        const { id, msg } = req.body;

        const message = new Message({
            in_user_id: req.user.id,
            out_user_id: id,
            msg: msg,
        })
        const response = await message.save()

        res.json(response);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
})

module.exports = router;