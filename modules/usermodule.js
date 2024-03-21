const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'pls tell us your name']
  },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    trim: true,
    unique: [true, 'this email already used'],
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirme you password'],
    minlength: 8,
    validate: {
        validator: function(el) {
            return el === this.password
        },
        message: 'password are not the same'
    }
  },
});

userschema.pre('save',async function(next){
    //only run this function if passowrd is modified
    if(!this.isModified('password')) return next();

    //hashing (cost = 12)
    this.password =await bcrypt.hash(this.password, 12);

    //deleting confirmation
    this.passwordConfirm = undefined;
    next();
});

userschema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const User = mongoose.model('users', userschema);

module.exports = User;
