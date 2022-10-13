const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalSchema = new Schema({
  title: String,
  description: String,
  info: {
    type: Schema.Types.ObjectId,
    ref: 'Info'
  }
});

const Personal = mongoose.model('Personal', personalSchema);

module.exports = Personal;