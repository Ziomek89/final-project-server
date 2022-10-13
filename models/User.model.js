const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   email: {
    type: String,
    required: [true, 'Email is required.'],
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    unique: true,
    lowercase: true,
    trim: true
  }, 
  username: {
    type: String,
    unique: true
  },
  password: String,
  infos: [{
    type: Schema.Types.ObjectId,
    ref: 'Info'
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;