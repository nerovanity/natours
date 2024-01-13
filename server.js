const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});

const db = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(db, {}).then(() =>{
    console.log("database is connected");
});

const tourschema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'a tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        require: [true, 'a tour must have a price']
    }
});

const Tour = mongoose.model('Tour',tourschema);

const app = require('./app');

const port = process.env.PORT;
app.listen(port, () =>{
    console.log(`app running on ${port}...`);
});