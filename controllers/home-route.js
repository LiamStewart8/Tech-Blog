const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/withAuth');




// route to get all blogs
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attribute: ['username']
                },
            ],
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true}));
        res.render('homepage', {
            blogs,
            logged_in: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// route to get blog by id. only can view if logged in (withAuth)
router.get('/blog/:id', withAuth, async(req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attribute: ['username']
                },
            ],
        });
        const blog = blogData.get({ plain: true});
        const commentData = await Comment.findAll({ where: {blog_id: blog.id}}, {
            include: [
                {
                    model: User,
                    attribute: ['username']
                },
            ],
        });
        const comment = commentData.map((data) => data.get({ plain: true}));
        res.render('oneblog', {
            blog,
            comment,
            logged_in: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
}); 

router.post('/blog', async (req, res) => {
    try {
        const newComment = req.body;
        newComment.user_id = req.session.user_id;
        const commentData = await Comment.create(newComment);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/blog', async (req, res) => {
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

router.post('/:id/comment', async (req, res) => {
    try {
        const commentData = await Comment.create({
            body: req.params.body,
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