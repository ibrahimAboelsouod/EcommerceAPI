const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')


const app = express();
app.use(express.json());
dotenv.config();

(async()=> {
    try {
        await mongoose.connect(process.env.mongoUrl);
        console.log('DB connected');
    } 
    catch (error) {
        console.log(error);        
    } 
    
    
    app.use('/api/auth', authRoute);

    app.use('/api/user', userRoute);
})();
 






app.listen(process.env.PORT || 3000, ()=>{
    console.log('server is running');
});