const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv')
const dbConnection = require('./configurations/db.config');
const userRouter = require('./route/user.route');
const productRouter = require('./route/product.route')
const orderRouter = require('./route/order.route')
const dashboardRouter = require('./route/dashboard.route') 
const testimonialRouter = require('./route/testimonial.route');
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json());
// This tells Express to parse text fields coming from form-data bundles
//app.use(express.urlencoded({ extended: true })); 


const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

dotenv.config();

dbConnection.conectDB();

app.get('/', (req,res) =>{
    res.status(200).json({message:"connected to the server, feel free to start buildind your web app"});
})


app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/order', orderRouter);
app.use('/dashboard', dashboardRouter);
app.use('/testimonials', testimonialRouter);


app.use((err, req, res, next) => {
    
    console.error(err);

    res.status(500).json({
        message: 'something went wrong'
    });
});



app.listen(process.env.PORT, ()=>{
    console.log('connected to server on port: ' + process.env.PORT);
    
})