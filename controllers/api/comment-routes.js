const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const { route } = require('./home-route');


router.post('/:id/comment', async (req, res) => {
    try {
        const commentData = await Comment.create({
            body: req.body.body,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id/comment', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                blog_id: req.params.blog_id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }
        res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;