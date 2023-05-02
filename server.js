const express =require('express');
//const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const finalProductRoutes = require('./routes/finalProductRoutes');
const rawMaterialRoutes = require('./routes/rawMaterialRoutes');
const packageRoutes = require('./routes/packageRoutes');
const fctOrderRoutes = require('./routes/fctOrderRoutes');


require('./config/connect');


const app = express();
app.use(express.json()); 

app.use("/uploads", express.static("uploads"));

// Server Port
app.listen(3000, ()=>{
    console.log('server work, PORT:3000 ')
});

//Routes
app.get('/',(req,res)=>{
    res.send('get work!');
    console.log('Welcome!');
})

app.use(userRoutes);
app.use(finalProductRoutes);
app.use(rawMaterialRoutes);
app.use(packageRoutes);
app.use(fctOrderRoutes);

