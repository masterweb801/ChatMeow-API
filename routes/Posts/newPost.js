const express = require('express');
const cors = require('cors');
const Post = require('../../models/Posts');
const User = require('../../models/Users');
const fetchUser = require('../../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

const router = express.Router();
router.use(cors());

router.post('/', fetchUser, [
    body('text', 'Text must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    try {
        const { text } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        const user = await User.findById(req.user.id);
        const post = new Post({
            user: req.user.id,
            userName: user.name,
            userImg: user.img,
            text: text,
        })
        const savedPost = await post.save()

        res.json(savedPost)

    } catch (error) {
        console.error(error.message);
        res.status(500).json({success, message: "Internal Server Error"});
    }
})

module.exports = router;