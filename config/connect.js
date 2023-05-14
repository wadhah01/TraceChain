const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://wadhahagoubi:test@cluster0.rn9kmzx.mongodb.net/?retryWrites=true&w=majority')
    .then(
        ()=>{
            console.log('MongoDB Compass connected');
        }
    )
    .catch(
        (err)=>{
            console.log(err);    
        }
    )

module.exports = mongoose;