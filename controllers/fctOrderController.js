const FctOrder = require('../models/fctOrder');

const createFctOrder = async (req,res)=>{

    try{
        const FctOrderData = req.body;
        const newFctOrder = new FctOrder(FctOrderData);
        const savedFctOrder= await newFctOrder.save();
        res.status(200).json(savedFctOrder);
        console.log(savedFctOrder);

    }catch(err){
        res.status(400).send(err);
    }

}
const deleteFctOrder = async(req,res)=>{

    try{    
        const FctOrderId = req.params.id;
        const NewFctOrder = await FctOrder.findById(FctOrderId);
        const FctOrderName = NewFctOrder.name;
        const FctOrderDeleted = await FctOrder.findByIdAndDelete(FctOrderId);
        console.log(`${FctOrderName} deleted succefuly`);
        res.status(201).send(FctOrderDeleted);
    }catch(err){
        res.status(400).json(err);
    }

}

const findFctOrderById = async(req,res)=>{
    
    try{
        const FctOrderId = req.params.id;
        const NewFctOrder = await FctOrder.findById(FctOrderId);
        //.populate({path: factoryID, model: 'User' })
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