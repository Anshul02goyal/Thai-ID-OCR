const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv');
const app = express();
const fs = require('fs');
const fileUpload = require("express-fileupload")

const Card = require("./models/card.js");
const cardRoute = require("./routes/card");
const bodyParser = require('body-parser');

const cors = require('cors');



dotenv.config();
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL).then(() => console.log("connected to db")).catch((err) => console.log(err))

const extractImageObj = (obj) => {

    let arr = [];
    obj.annotations.forEach((a) => {
        if (a[0] !== `\\`) {
            arr.push(a)
        }
    })

    return {
        name: arr.slice(arr.indexOf('Name') + 1, arr.indexOf('Last')).join(' '),
        lastName: arr.slice(arr.indexOf('name') + 1, arr.indexOf('name') + 2).join(' '),
        id: arr.slice(arr.indexOf('Card') + 1, arr.indexOf('Card') + 6).join(' '),
        doi: arr.slice(arr.indexOf('Issue') - 6, arr.indexOf('Issue') - 2).join(' '),
        doe: arr.slice(arr.indexOf('Expiry') - 7, arr.indexOf('Expiry') - 3).join(' '),
        dob: arr.slice(arr.indexOf('Birth') + 1, arr.indexOf('Birth') + 5).join(' ')
    };
}

app.use(cors());
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use("/api/card", cardRoute)

const PORT = process.env.PORT | 5000

app.post('/api/upload', (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "VSHz05s7Tf8nUsnCmChenMYlhXts8GvT");

    var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: myHeaders,
        body: req.files.files.data
    };

    fetch("https://api.apilayer.com/image_to_text/upload", requestOptions)
        .then(response => response.text())
        .then((result) => {
            const data = extractImageObj(JSON.parse(result))
            console.log(data)
            const card = new Card({
                name: data.name,
                last_name: data.lastName,
                identification_number: data.id,
                date_of_issue: data.doi,
                date_of_expiry: data.doe,
                date_of_birth: data.dob,
                status: true,
            });

            try {
                card.save().then((response) => res.status(201).json(response));

            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        })
        .catch(error => console.log('error', error));
});

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});