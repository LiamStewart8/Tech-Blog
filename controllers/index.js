const router = require('express').Router();

const homeRoutes = require('./home-route')
const dashboardRoutes = require('./dashboard-routes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
module.exports = router;