var mongoose = require('mongoose');


const postSchema = mongoose.Schema({
  postdata:String,
  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  }],
  postPic: String,
  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('post',postSchema)