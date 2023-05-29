const mongoose = require('mongoose');

const FctOrderSchema = mongoose.Schema({
  date_Cmd: {
    type: Date,
    default: Date.now
  },
  deliveryAddress: {
    type: String
  },
  factoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FinalProduct'
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
});

const FctOrder = mongoose.model('FctOrder', FctOrderSchema);

module.exports = FctOrder;