var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local')
var userModel = require('./users.js')

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});

router.get('/newAccount', function (req, res, next) {
  res.render('register');
});

router.post('/register', function (req, res, next) {
  var user = {
    username: req.body.username,
    email: req.body.email
  }
  userModel.register(user, req.body.password)
  .then((result) => {
    passport.authenticate('local')(req, res, () => {
      res.redirect('/profile')
    })
  }).catch((err) => {
    res.send(err.message)
  })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/'
}), (req, res) => { })

router.get('/logout', function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/')
  }
}

router.get('/profile',isLoggedIn, function (req, res) {
  res.render('profile')
})

module.exports = router;
