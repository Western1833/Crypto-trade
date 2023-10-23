const router = require('express').Router();
const {register, login} = require('../Services/authService.js');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const token = await login(email, password);
    res.cookie('auth', token);
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;
   
    await register(userData);

    res.redirect('/auth/login');
});

module.exports = router;