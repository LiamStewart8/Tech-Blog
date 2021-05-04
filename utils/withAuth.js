const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        alert('Please log in or sign up first.');
    } else {
        next();
    }
};

module.exports = withAuth;
