const router = require('express').Router();
const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');

router.use(homeController);
router.use('/auth', authController);

router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;