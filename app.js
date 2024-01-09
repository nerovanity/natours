const express = require('express');
const fs = require('fs');
const morgan = require('morgan');


const app = express();
//Middleware:middle of the request and the response
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
const getalltours = (req,res) => {
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
const gettourbyid = (req,res) => {
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
const creattour = (req,res) => {
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
const updatetour =  (req,res) => {
    if(req.params.id*1>tours.length)
    return res.status(404).send({
                status: 'failed',
                message: 'invalid id'
            });
    res.status(200).json({
        status: 'success',
        data: {
            tour : '<updated tour>'
        }
    });
};
const deletetour =  (req,res) => {
    if(req.params.id*1>tours.length)
    return res.status(404).send({
                status: 'failed',
                message: 'invalid id'
            });
    res.status(204).json({
        status: 'success',
        data: null
    });
};
//users methodes
const getallusers = (req,res) => {
    res
    .status(500)
    .json({
        status: 'error',
        message: 'this route is not yet defined'
    });
};
const creatuser = (req,res) => {
    res
    .status(500)
    .json({
        status: 'error',
        message: 'this route is not yet defined'
    });
};

const getuserbyid = (req, res) => (req,res) => {
    res
    .status(500)
    .json({
        status: 'error',
        message: 'this route is not yet defined'
    });
};

const udpateuser = (req,res) => {
    res
    .status(500)
    .json({
        status: 'error',
        message: 'this route is not yet defined'
    });
};

const deleteuser = (req,res) => {
    res
    .status(500)
    .json({
        status: 'error',
        message: 'this route is not yet defined'
    });
};
//routers
const tourRouter = express.Router();
const usersRouter = express.Router();

tourRouter
.route('/')
.get(getalltours)
.post(creattour);

tourRouter
.route('/:id')
.get(gettourbyid)
.patch(updatetour)
.delete(deletetour);

usersRouter
.route('/')
.get(getallusers)
.post(creatuser);

usersRouter
.route('/:id')
.get(getuserbyid)
.patch(udpateuser)
.delete(deleteuser)

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',usersRouter);



const port = 3000
app.listen(port, () =>{
    console.log(`app running on ${port}...`);
});
