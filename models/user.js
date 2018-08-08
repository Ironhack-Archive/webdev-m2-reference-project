'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  imgPath: {
    type: String,
    default: "user-placeholder.jpg"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
