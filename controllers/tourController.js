const Tour = require('../modules/tourmodule');
const APIfeatures = require('../utils/apifeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.aliastopfivecheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAvreg,price';
  req.query.fields = 'name,price,ratingsAvreg,summary,difficulty';
  next();
};


exports.getalltours = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      },
    });
});
exports.gettourbyid = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });

});


exports.creattour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });

});


exports.updatetour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if(!tour) {
    return next(new AppError('no tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});


exports.deletetour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id, req.body);
  if(!tour) {
    return next(new AppError('no tour found with that ID', 404));
  }
    res.status(204).json({
      status: 'success',
    });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
})