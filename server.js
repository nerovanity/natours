const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});

const db = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(db, {}).then(() =>{
    console.log("database is connected");
});

// const testtour= new Tour({
//     name: "The Park Camper",
//     price: 997
// })

// testtour.save()
// .then(doc => {
//     console.log(doc);
// })
// .catch(err => {
//     console.log(err);
// });

const app = require('./app');

const port = process.env.PORT;
app.listen(port, () =>{
    console.log(`app running on ${port}...`);
});