/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const Unauthorized = require('../middlewares/errors/Unauthorized');

const userSchema = new mongoose.Schema({
  login:
  {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    require: false,
    validate: {
      validator: (ava) => validator.isEmail(ava),
      message: 'Неверная почта',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  balance: {
    type: String,
    default: '0',
  },
  likedCards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usercard',
  }],
  
});

userSchema.statics.findUserByCredentials = function (login, password, res, next) {
  return this.findOne({ login }).select('+password')
    .then((user) => {
      if (!user) {
        console.log(user);
        throw new Unauthorized('Неправильные почта или пароль');
      } else {
        console.log(user);
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              throw new Unauthorized('Неправильные почта или пароль');
            } else {
              console.log(user);
              return user;
            }
          });
      }
    });
};

function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.likedCards;
  return obj;
}

userSchema.methods.toJSON = toJSON;

module.exports = mongoose.model('user', userSchema);