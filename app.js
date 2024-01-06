const express = require('express');
const fs = require('fs');


const app = express();
//Middleware:middle of the request and the response
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
//for reading
app.get('/api/v1/tours', (req,res) => {
    res
    .status(200)
    .json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    });
});
app.get('/api/v1/tours/:id', (req,res) => {

    const id = req.params.id*1;
    // if (id > tours.length){
    //     return res.status(404).send({
    //         status: 'failed',
    //         message: 'invalid id'
    //     })
    // }
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
});
//for creating
app.post('/api/v1/tours', (req,res) => {
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
});

const port = 3000
app.listen(port, () =>{
    console.log(`app running on ${port}...`);
});
