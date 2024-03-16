var userModel = require('../models/users.js')
var postModel = require('../models/posts.js')
var passport = require('passport');

exports.home = function (req, res, next) {
    res.render('login', { error: req.flash('error'),nav:false });
}

module.exports.register = function (req, res, next) {
    var user = {
        username: req.body.username,
        email: req.body.email
    }
    userModel.register(user, req.body.password)
        .then((result) => {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/feed')
            })
        }).catch((err) => {
            res.send(err.message)
        })
}

module.exports.profile = async function(req,res){
    const user = await userModel.findOne({username: req.session.passport.user}).populate('posts')
    res.render('profile', { user, nav: false })
}

exports.post = async function (req, res, next) {
    let user = await userModel.findOne({ username: req.session.passport.user })
    let post = await postModel.create({
        postPic: req.file.filename,
        user
    })
    await user.posts.push(post)
    await user.save()
    res.redirect('back')
}

exports.edit = async function (req, res, next) {
    let user = await userModel.findOne({ username: req.session.passport.user })
    user.pic = req.file.filename
    await user.save()
    res.redirect('back')
}

exports.feed = async function (req, res) {
    const user = await userModel.findOne({ username: req.session.passport.user })
    const posts = await postModel.find().populate('user')
    res.render('feed', { user,posts, nav: true })
}