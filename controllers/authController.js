const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User =require('./../modules/usermodule');
const AppError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
});


exports.login = catchAsync(async (req, res, next)  => {
    const {email, password} = req.body;

    if (!email || !password){
        return next(new AppError('Please provide email and password!', 400));
    }

    const user = await  User.findOne({email}).select('+password');
    
    if(!user || !await user.correctPassword(password, user.password)){
        return next(new AppError('Incorrect email or password'), 401);
    }

    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    //chacking token 
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('bearer')
    ){
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token){
        return next(new AppError('you are not log in to get access'),401);
    }
    //verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //check if user stilll exist
    const currentUser = await User.findById(decoded.id);
    if (!currentUser){
        return next(new AppError('this user is no longer exist'));
    }

    //check if user changed password after the token was issued
    if (currentUser.changedpasswordAfter(decoded.iat)){
        return next(new AppError('User recently changed password please log in again',401));
    } 
    req.user = currentUser;
    next();
})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new AppError('you dont have permission to perform this action',403));
        }
        next();
    }
}