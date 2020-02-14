const express = require('express');
const router = express.Router();

const signupRouter = require('./signup')
const logRouter = require('./login')
const authRouter = require('./auth-route')
const homeRouter = require('./homepage')
const profileRouter = require('./profile')
const rentRouter = require('./rent')


router.use('/signup', signupRouter);
router.use('/login', logRouter);
router.use('/', authRouter);
router.use('/homepage', homeRouter);
router.use('/profile', profileRouter);
// router.use('/rent', rentRouter);

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      res.redirect('/')
    }
    else {
      res.redirect('/login');
    }
  })
})

router.get('/', (req, res) => {
  res.render('login');
})

module.exports = router;