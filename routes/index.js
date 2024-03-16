var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local')
var userModel = require('../models/users.js')
var postModel = require('../models/posts.js')
const upload = require('../multer.js')
let {register,profile,post,edit,home,feed} = require('../controller/profile.js')

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', home);

router.get('/profile',isLoggedIn, profile)

router.get('/userProfile/:a',isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ _id:req.params.a }).populate('posts')
  res.render('userProfile', { user, nav: false })
})

router.get('/feed',isLoggedIn, feed)

router.post('/post',upload.single('img'),isLoggedIn,post);

router.post('/edit',upload.single('img'),edit)

router.post('/register', register)

router.post('/login', passport.authenticate('local', {
  successRedirect: '/feed',
  failureRedirect: '/',
  failureFlash:true,
}), (req, res) => { })

router.get('/logout',function (req, res, next) {
  if (req.isAuthenticated()) {
    req.logOut(function(err){
      if(err){return next(err);}
      res.redirect('/');
    })
  }else{
    res.send('error')
  }
})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/')
  }
}

module.exports = router;
