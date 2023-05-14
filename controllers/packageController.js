const Package = require('../models/package');

const createPkg = async (req,res)=>{

    try{

        const PkgData = req.body;
        const newPkg = new Package(PkgData);
        const savedPkg = await newPkg.save();
        res.status(200).send(savedPkg);
        console.log(savedPkg);

    }catch(err){
        res.status(400).send(err);
    }

}

const deletePkgById = async(req,res)=>{

    try{    
        const PkgId = req.params.id;
        const Pkg = await Package.findById(PkgId);
        const PkgName = Pkg.name;
        const PkgDeleted = await Package.findByIdAndDelete(PkgId);
        console.log(`${PkgName} deleted succefuly`);
        res.status(201).send(PkgDeleted);
    }catch(err){
        res.status(400).json(err);
    }

}
const findPkgAll = async(req,res)=>{
    
    try{
        const Pkg = await Package.find();
        res.status(201).send(Pkg);
        console.log(Pkg);
    }catch(err){
        res.send(err);
        res.status(400).json(err);
    }
}


const findPkgById = async(req,res)=>{
    
    try{
        const PkgId = req.params.id;
        const Pkg = await Package.findById(PkgId);
        res.status(201).send(Pkg);
        console.log(Pkg);
    }catch(err){
        res.send(err);
        res.status(400).json(err);
    }
}

const findPkgByType = async(req,res)=>{
    try{
        const type = req.params.type;
        const Pkg = await Package.find({type : type});
        console.log(Pkg);
        res.status(201).send(Pkg);
    }catch(err){
        res.status(400).json(err);
    }
}

const findPkgByCreator = async(req,res)=>{
    try{
        const creator = req.params.creator;
        const Pkg = await Package.find({createdBy: creator});
        console.log(Pkg);
        res.status(201).send(Pkg);
    }catch(err){
        res.status(400).json(err);
    }
}


const updatePkgById = async (req,res) => {
    try{
        const PkgId = req.params.id;
        const newData = req.body;
        const updated = await  Package.findByIdAndUpdate({_id: PkgId},newData);
        console.log(updated);
        res.status(201).send(updated);
    }catch(err){
        res.status(400).json(err);
    }
}
const SellPkgByid = async (req, res) => {
    try {
      const PkgId = req.params.id;
      const amount = req.body.amount;
      let updated = await package.findById(PkgId);
  
      if (!updated) {
        res.status(404).json({ message: 'Packaging product not found' });
      } else {
        if (updated.stock < amount) {
          res.status(404).json({ message: 'Packaging product stock is not sufficient' });
        } else {
          updated.stock -= amount;
          const Pkgsold = await updated.save();
          res.status(200).json(Pkgsold);
          console.log(Pkgsold);
        }
      }
    } catch (err) {
      res.status(400).json(err);
    }
  };
  const BuyPkgByid = async (req, res) => {
    try {
      const PkgId = req.params.id;
      const amount = req.body.amount;
      let updated = await package.findById(PkgId);
  
      if (!updated) {
        res.status(404).json({ message: 'Packaging product not found' });
      } else {
        updated.stock += amount;
        const PkgBought = await updated.save();
        res.status(200).json(PkgBought);
        console.log(PkgBought);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  };


module.exports = {
    createPkg,
    deletePkgById,
    findPkgById,
    findPkgByCreator,
    findPkgByType,
    findPkgAll,
    updatePkgById,
    SellPkgByid,
    BuyPkgByid,

}