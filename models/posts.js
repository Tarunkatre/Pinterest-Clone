var mongoose = require('mongoose');


const postSchema = mongoose.Schema({
  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  }],
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  postPic: String,
  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('post',postSchema)