const express = require('express');
const authRouter = express.Router();

authRouter.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  }
  else {
    res.redirect('/login')
  }
});

module.exports = authRouter;