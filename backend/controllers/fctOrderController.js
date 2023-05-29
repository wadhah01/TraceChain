const FctOrder = require('../models/fctOrder');
const RMOrder = require('../models/rmOrder');
const PkgOrder = require('../models/pkgOrder');
const FinalProduct = require('../models/finalProduct');


const createFctOrder = async (req, res) => {
    try {
      const FctOrderData = req.body;
      const products = req.body.products;
  
      // Create an array to store the product details
      const productDetails = [];
  
      // Iterate over the products array and extract the product ID and quantity
      for (const product of products) {
        const productId = product.productId;
        const quantity = product.quantity;
  
        // Create an object with the product details and add it to the array
        productDetails.push({ productId, quantity });
  
        // Update the stock of the purchased final product
        await FinalProduct.findByIdAndUpdate(
          productId,
          { $inc: { stock: -quantity } }
        );
      }
  
      // Add the product details array to the FctOrderData
      FctOrderData.products = productDetails;
      console.log(FctOrderData);
      const newFctOrder = new FctOrder(FctOrderData);
      const savedFctOrder = await newFctOrder.save();
  
      res.status(200).json(savedFctOrder);
      console.log(savedFctOrder);
    } catch (err) {
      res.status(400).send(err);
    }
  };
  
const deleteFctOrder = async(req,res)=>{

    try{    
        const FctOrderId = req.params.id;
        await RMOrder.deleteMany({ fctOrderID: FctOrderId });
        await PkgOrder.deleteMany({ fctOrderID: FctOrderId });
        await FctOrder.deleteOne({ _id: FctOrderId });
        console.log('command deleted succefully');
        res.status(201).send();
    }catch(err){
        res.status(400).json(err);
    }

}

const findFctOrderById = async(req,res)=>{
    console.log('hello');
    try{
        const FctOrderId = req.params.id;
        console.log(FctOrderId);
        const NewFctOrder = await FctOrder.findById(FctOrderId).populate('factoryID');
       // .populate({path: factoryID, model: 'FctOrder' });
        res.status(201).json(NewFctOrder);
        console.log(NewFctOrder);
    }catch(err){
        res.status(400).json(err);
    }
}

module.exports = {
    createFctOrder,
    deleteFctOrder,
    findFctOrderById,
}