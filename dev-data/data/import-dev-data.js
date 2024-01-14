const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../modules/tourmodule');

dotenv.config({path: './config.env'});

const db = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(db, {}).then(() =>{
    console.log("database is connected");
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//importing data

const impdata = async () =>{
    try{
        await Tour.create(tours);
        console.log('Data successfully loaded');
    }catch(err){
        console.log(err);
    }
};

const deletdata = async () => {
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted');
        process.exit();
    }catch(err){
        console.log(err);
    }
};

if(process.argv[2] == '--import')
    impdata();
else if(process.argv[2] == '--delete')
    deletdata();

console.log(process.argv);