const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
  title: String,
  description: String,
  personals: [{
    type: Schema.Types.ObjectId,
    ref: 'Personal'
  }]
}, {
    timestamps: true
});

const Info = mongoose.model('Info', infoSchema);

module.exports = Info;