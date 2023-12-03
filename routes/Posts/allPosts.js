const express = require('express');
const cors = require('cors');
const Post = require('../../models/Posts');
const fetchUser = require('../../middleware/fetchUser');

const router = express.Router();
router.use(cors());

router.post('/', fetchUser, async (req, res) => {
    let success = false;
    try {
        const { page, limit } = req.body;
        let skip = (page - 1) * limit;
        const data = Post.find({});
        data.skip(skip).limit(limit);
        const posts = await data;
        res.json([posts, req.user.id]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
})

module.exports = router;