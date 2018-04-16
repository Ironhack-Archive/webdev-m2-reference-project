'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String
  },
  occupation: {
    type: String
  },
  catchPhrase: {
    type: String
  },
  photo: {
    type: String
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
