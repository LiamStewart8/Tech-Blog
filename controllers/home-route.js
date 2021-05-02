const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/withAuth')




// route to get all blogs
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User
                },
            ],
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true}));
        res.render('homepage', {
            blogs
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
                    model: User
                },
                {
                    model: Comment
                },
            ],
        });
        const blog = blogData.get({ plain: true});
        res.render('oneblog', {
            blog
        });
    } catch (err) {
        res.status(500).json(err);
    }
}); 


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;