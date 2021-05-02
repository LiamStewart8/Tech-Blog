const router = require('express').Router();
const { Blog, User } = require('../models');


router.get('/dashboard', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User
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

router.get('/dashboard/new', async (req, res) => {

});

router.post('/dashboard/new', (req, res) => {
    try {
        const newBlog = await Blog.create({
            title: req.body.title,
            body: req.body.body
        });
        res.status(200).json(newBlog)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/dashboard/edit/:id', (req, res) => {

});

router.put('/dashboard/edit/:id', (req, res) => {
    
});

router.delete('/dashboard/edit/:id', async (req, res) => {
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