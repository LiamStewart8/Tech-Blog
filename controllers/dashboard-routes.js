const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({ where: {user_id:req.session.user_id}},{
            include: [
                {
                    model: User,
                    attribute: ['username']
                },
            ],
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true}));
        res.render('dashboard', {
            blogs
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/dashboard', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            user_id: req.session.user_id,
            title: req.body.title,
            body: req.body.body
        });
        res.status(200).json(newBlog)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {where: {user_id:req.session.user_id}})
        const blog = blogData.get({ plain: true });
        res.render('oneblog');
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.put('/dashboard', (req, res) => {
    
// });

router.delete('/dashboard/edit/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
            }
        });
        if(!blogData) {
            res.status(404).json({ message: 'No blog found with this id'});
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;