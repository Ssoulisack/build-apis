const express = require('express');
const mongoose = require('mongoose');
const { PORT, URLMongoDB } = require('./config')
const products = require('./routes/products.js')
const app = express();
// MIDDLEWARES
app.use(express.json());



app.use('/products', products);
// MONGODB CONNECTION
mongoose
    .connect(URLMongoDB)
    .then(() => {
        console.log('Connected MongoDB success')
    })
    .catch((error) => {
        console.error(error)
    })

// SERVER
app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}/`)
})