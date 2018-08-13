'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const quoteSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: 'User',
  },
  body: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  likeCount: {
    type: Number,
    default: 0
  },
  likes: [{
    type: ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, 
{
  timestamps: true
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;