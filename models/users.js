var mongoose = require('mongoose');

var plm = require('passport-local-mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Pinterest')

const userSchema = mongoose.Schema({
  username: String,
  email:String,
  pic: {
    type: String,
    default: 'default.png'
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'post'
  }],
})

userSchema.plugin(plm)
module.exports = mongoose.model('user',userSchema)