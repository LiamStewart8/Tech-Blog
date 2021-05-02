const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/withAuth')

router.get('/', withAuth, async (req, res) => {

});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', async(req, res) => {

});

module.exports = router;