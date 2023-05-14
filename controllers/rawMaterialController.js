const RawMaterial = require('../models/rawMaterial');


const createRM = async (req,res)=>{

    try{
        const RMData = req.body;
        const newRM = new RawMaterial({...RMData,certificationImage:req.file.path});
        const savedRM = await newRM.save();
        res.status(200).send(savedRM);
        console.log(savedRM);

    }catch(err){
        res.status(400).send(err);
    }

}

const deleteRMrById = async(req,res)=>{

    try{    
        const RMId = req.params.id;
        const RM = await RawMaterial.findById(RMId);
        const RMName = RM.name;
        const RMDeleted = await RawMaterial.findByIdAndDelete(RMId);
        console.log(`${RMName} deleted succefuly`);
        res.status(201).send(RMDeleted);
    }catch(err){
        res.status(400).json(err);
    }

}

const findRMAll = async(req,res)=>{
    
    try{
        const RM = await RawMaterial.find();
        res.status(201).send(RM);
        console.log(RM);
    }catch(err){
        res.send(err);
        res.status(400).json(err);
    }
}

const findRMrById = async(req,res)=>{
    
    try{
        const RMId = req.params.id;
        const RM = await RawMaterial.findById(RMId);
        res.status(201).send(RM);
        console.log(RM);
    }catch(err){
        res.send(err);
        res.status(400).json(err);
    }
}


const findRMByCreator = async(req,res)=>{
    try{
        const creator = req.params.creator;
        const RM = await RawMaterial.find({createdBy: creator});
        console.log(RM);
        res.status(201).send(RM);
    }catch(err){
        res.status(400).json(err);
    }
}

const findRMByType = async(req,res)=>{
    try{
        const type = req.params.type;
        const RM = await RawMaterial.find({type : type});
        console.log(RM);
        res.status(201).send(RM);
    }catch(err){
        res.status(400).json(err);
    }
}


const updateRMById = async (req,res) => {
    try{
        const RMId = req.params.id;
        const newData = req.body;
        const updated = await  RawMaterial.findByIdAndUpdate({_id: RMId},newData);
        console.log(updated);
        res.status(201).send(updated);
    }catch(err){
        res.status(400).json(err);
    }
}
const SellRMByid = async (req, res) => {
    try {
      const RMId = req.params.id;
      const amount = req.body.amount;
      let updated = await RawMaterial.findById(RMId);
  
      if (!updated) {
        res.status(404).json({ message: 'Raw material not found' });
      } else {
        if (updated.stock < amount) {
          res.status(404).json({ message: 'Raw Material stock is not sufficient' });
        } else {
          updated.stock -= amount;
          const RMsold = await updated.save();
          res.status(200).json(RMsold);
          console.log(RMsold);
        }
      }
    } catch (err) {
      res.status(400).json(err);
    }
  };
  const BuyRMByid = async (req, res) => {
    try {
      const RMId = req.params.id;
      const amount = req.body.amount;
      let updated = await RawMaterial.findById(RMId);
  
      if (!updated) {
        res.status(404).json({ message: 'Raw material not found' });
      } else {
        updated.stock += amount;
        const RMbought = await updated.save();
        res.status(200).json(RMbought);
        console.log(RMbought);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  };


module.exports = {
    createRM,
    deleteRMrById,
    findRMrById,
    findRMByType,
    findRMAll,
    updateRMById,
    findRMByCreator,
    SellRMByid,
    BuyRMByid
}