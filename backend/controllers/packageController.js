const Package = require('../models/package');

const createPkg = async (req,res)=>{

    try{

        const PkgData = req.body;
        const newPkg = new Package({...PkgData,PkgImage:req.file.path});
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
        const {name, type, stock, dateProduction, delay, lotNumber, rawMaterials, createdBy, PkgImage } = req.body;
        const updated = await  Package.findById({_id: PkgId});
        if(!updated){  
            res.status(404).json({message: 'Package not found'});
        }else{
            if (req.file) {
                // If there is a new image, update the product with the new image path
                PkgImage = req.file.path;
                updated.name = name;
                updated.type = type;
                updated.stock = stock;
                updated.dateProduction = dateProduction;
                updated.delay = delay;
                updated.lotNumber = lotNumber;
                updated.rawMaterials = rawMaterials;
                updated.createdBy = createdBy;
                updated.PkgImage = PkgImage;
                const PkgUpdatetd = await updated.save();
                res.status(200).json(PkgUpdatetd); 
                console.log(PkgUpdatetd);
                
            } else {
                // If there is no new image, update the product without changing the image path
                updated.name = name;
                updated.type = type;
                updated.stock = stock;
                updated.dateProduction = dateProduction;
                updated.delay = delay;
                updated.lotNumber = lotNumber;
                updated.rawMaterials = rawMaterials;
                updated.createdBy = createdBy;
                updated.PkgImage = PkgImage;
                const PkgUpdatetd = await updated.save();
                res.status(200).send(PkgUpdatetd);
                console.log(PkgUpdatetd);
            }
        }
    } catch (err) {
      res.status(400).json(err);
    }
}


module.exports = {
    createPkg,
    deletePkgById,
    findPkgById,
    findPkgByCreator,
    findPkgByType,
    findPkgAll,
    updatePkgById

}