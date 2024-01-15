const Tour = require('../modules/tourmodule');

exports.getalltours = async (req,res) => {
    try{
        //filtering
        const queryreq = {...req.query};
        const excludedFields = ['page','sort','limit','fields'];
        excludedFields.forEach(el => delete queryreq[el]);

        //advenced filtering
        const querystring = JSON.stringify(queryreq).replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);


        const query = Tour.find(JSON.parse(querystring));

        const tours = await query;

        res
        .status(200)
        .json({
            status: "success",
            results: tours.length,
            data: {
                tours: tours
            }
        });
    }
    catch(err){
        res
        .status(404)
        .json({
            status: 'fail',
            messgae: err
        });
    };
};
exports.gettourbyid = async (req,res) => {
   try{

    const tour = await Tour.findById(req.params.id);

    res
    .status(200)
    .json({
        status: "success",
        data: {
            tour: tour
            }
        });
   }catch(err){
    res
    .status(404)
    .json({
            status: 'fail',
            messgae: err
        });
   };
};
exports.creattour = async (req,res) => {
    try{
        const newTour = await Tour.create(req.body);
        res
        .status(201)
        .json({
            status: 'success',
            data:{
                tour: newTour
            }
        });
    }
    catch(err) {
        res
        .status(400)
        .json({
            status: 'fail',
            message: err
        });
    }
};
exports.updatetour = async  (req,res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    }catch(err){
        res
        .status(400)
        .json({
            status: 'fail',
            message: 'invalid data sent'
        });
    };
};
exports.deletetour = async (req,res) => {
    try{
        await Tour.findByIdAndDelete(req.params.id, req.body);
        res.status(204).json({
            status: 'success'
        });
    }catch(err){
        res
        .status(404)
        .json({
            status: 'fail',
            message: 'invalid data sent'
        });
    };
};
