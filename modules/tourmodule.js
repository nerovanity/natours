const mongoose = require('mongoose');
const slugify = require('slugify');

const tourschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'a tour must have a name'],
        unique: true,
        trim: true
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'a tour need duration']
    },
    maxGroupSize:{
        type: Number,
        required: [true, 'a tour must have a group size']
    },
    difficulty:{
        type: String,
        required: [true, 'a tour must have a difficulty']
    },
    ratingsAvreg: {
        type: Number,
        default: 4.5
    },
    ratingsQuantitys:{
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'a tour must have a price']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true
    },
    description:{
        type: String,
        trim: true,
        required: [true,'a tour must have a description']
    },
    imageCover:{
        type: String,
        required:[true,'a tour must have a image']
    },
    images:[String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date]
});
// DOCUMENT MIDDLEWARE: runs before .save() .create()
tourschema.pre('save',function(next){
    this.slug = slugify(this.name, {lower: true});
    next();
});

const Tour = mongoose.model('Tour',tourschema);

module.exports = Tour;
