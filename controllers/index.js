const router = require('express').Router();

const homeRoutes = require('./home-route')
const dashboardRoutes = require('./dashboard-routes');
const apiRoutes = require('./api')

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;