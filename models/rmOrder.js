const mongoose = require ('mongoose');

const RMOrder = mongoose.model('RMOrder',{
  
   quantity:{
        type : Date,
   },
   rawMaterialID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RawMaterial',
   },
   fctOrderID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FctOrder',
   }

})

module.exports = RMOrder;