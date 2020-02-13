const express = require('express');
const router = express.Router();

const signupRouter = require('./auth-route')
const logRouter = require('./login')
const profileRouter = require('./profile')
const rentRouter = require('./rent')
const searchRouter = require('./search')

router.get('/', (req, res) => {
  res.render('login');
})

// router.use('/signup', signupRouter);
router.use('/login', logRouter);
// router.use('/user-profile', profileRouter);
// router.use('/rent', rentRouter);
//router.use('/homepage', searchRouter);

module.exports = router;