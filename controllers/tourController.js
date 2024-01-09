const fs = require('fs');


const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


exports.checkid = (req, res, next, val) =>{
    if(val>tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        });
    };
    next();
}
exports.checkreq = (req,res,next)=>{
    if(JSON.stringify(req.body) === "{}"){
        return res.status(400).json({
            status: 'fail',
            message: 'no data inserted'
        })
    }
    next();
}


exports.getalltours = (req,res) => {
    res
    .status(200)
    .json({
        status: 'success',
        results: tours.length,
        requestTime: req.requestTime,
        data: {
            tours: tours
        }
    });
};
exports.gettourbyid = (req,res) => {
    const id = req.params.id*1;
    const tour = tours.find((el) => el.id === id);
    if(!tour)
    return res.status(404).send({
                status: 'failed',
                message: 'invalid id'
            });
    res
    .status(200)
    .json({
        status: 'success',
        data:{
            tour: tour
        }
    });
};
exports.creattour = (req,res) => {
    const newid = tours[tours.length-1].id+1;
    const newtour = Object.assign({ id: newid },req.body);
    tours.push(newtour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=> {
        res
        .status(201)
        .json({
            status: 'success',
            data: {
                tour: newtour
            }
        });
    });
};
exports.updatetour =  (req,res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour : '<updated tour>'
        }
    });
};
exports.deletetour =  (req,res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
};
