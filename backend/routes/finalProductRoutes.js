const finalProductController = require ('../controllers/finalProductController');
const {Router} = require('express');
const router = Router();

const multer = require('multer');


const mystorage = multer.diskStorage({
    destination:"./uploads/finalProducts",
    filename:(req,file,redirect)=>{
        let date = Date.now();
        let fl= date +'.'+file.mimetype.split('/')[1];
        redirect(null,fl)
    }
})

const upload=multer({storage:mystorage})

router.post('/createFP',upload.single("FPImage"), finalProductController.createFP);
router.get('/findFPById/:id',finalProductController.findFPById);
router.get('/findFPByCreator/:creator',finalProductController.findFPByCreator);
router.get('/findFPByType/:type',finalProductController.findFPByType);
router.get('/findFPAll',finalProductController.findFPAll);
router.delete('/deleteFPrById/:id',finalProductController.deleteFPrById);
router.put('/updateFPById/:id',upload.any("FPImage"),finalProductController.updateFPById);

router.put('/buyFPById/:id',finalProductController.buyFPById);

module.exports = router ;