const mongoose = require ('mongoose');

const FctOrder = mongoose.model('FctOrder',{
  
   date_Cmd:{
        type : Date,
   },
   deleveryAdress:{
        type : String,
   },
   factoryID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
   }

})

module.exports = FctOrder;