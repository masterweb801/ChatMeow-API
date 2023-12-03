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
            let likes = post.likes;
            let likers = post.likers;

            if (!likers.includes(req.user.id)) {
                likers.push(req.user.id);
                const toUpdate = {
                    likes: likes + 1,
                    likers: likers
                };
                const updatedPost = await Post.findByIdAndUpdate(id, toUpdate, {new: true});
                return res.json([updatedPost, req.user.id]);
            } else {
                const index = likers.indexOf(req.user.id);
                likers.splice(index, 1);
                const toUpdate = {
                    likes: likes - 1,
                    likers: likers
                };
                const updatedPost = await Post.findByIdAndUpdate(id, toUpdate, {new: true});
                return res.json([updatedPost, req.user.id]);
            }
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
})

module.exports = router;