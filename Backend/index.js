
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
// const YAML = require("yamljs");


const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT;
const db = process.env.DB;

const routes = require('./routes/index')

// mongoose.connect(db, () => {
// 	console.log("Database is connected Successfully");
// });


const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};
connectDB();


const app = express();
// app.use(express.static("public"));


const corsOptions ={
    origin:['http://localhost:3001','http://localhost:3000','https://nftwarranty.vercel.app/'], 
    // credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use('/v1', routes);

app.listen(port, () => {
	console.log(`Server up and running on port ${port}`);
});
