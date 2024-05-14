/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable func-names */

const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  balance:
  {
    type: String,
    required: true,
  },
  balancem: {
    type: String,
    require: true,
  },
  
});



module.exports = mongoose.model('usercard', userSchema);