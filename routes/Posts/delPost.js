const express = require('express');
const cors = require('cors');
const Post = require('../../models/Posts');
const fetchUser = require('../../middleware/fetchUser');

const router = express.Router();
router.use(cors());

router.post('/', fetchUser, async (req, res) => {
    let success = false;
    try {
        const { id } = req.body;

        const post = await Post.findById(id);
        if (!post) {
            res.status(500).json({ success, message: "Internal Server Error" });
        } else {

            const uid = post.user.toString();
            if (uid === req.user.id) {
                await Post.findByIdAndDelete(id);
                res.json({ success: true, message: "Post Deleted Successfully"})
            } else {
                res.json({ success: false, message: "Could Not Find" });
            }
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
})

module.exports = router;