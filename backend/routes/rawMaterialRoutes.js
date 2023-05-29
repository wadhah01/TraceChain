const rawMaterialController = require ('../controllers/rawMaterialController');
const {Router} = require('express');
const router = Router();
const multer = require('multer');


const mystorage = multer.diskStorage({
    destination:"./uploads/rawMaterials",
    filename:(req,file,redirect)=>{
        let date = Date.now();
        let fl= date +'.'+file.mimetype.split('/')[1];
        redirect(null,fl)
    }
})

const upload=multer({storage:mystorage})


router.post('/createRM',upload.fields([
                                        { name: 'certificationImage', maxCount: 1 },
                                        { name: 'RMImage', maxCount: 1 }
                                    ]), rawMaterialController.createRM);

router.get('/findRMrById/:id',rawMaterialController.findRMrById);
router.get('/findRMByType/:type',rawMaterialController.findRMByType);
router.get('/findRMByCreator/:creator',rawMaterialController.findRMByCreator);
router.get('/findRMAll',rawMaterialController.findRMAll);
router.delete('/deleteRMrById/:id',rawMaterialController.deleteRMrById);

router.put('/updateRMById/:id', upload.fields([
                                                { name: 'certificationImage', maxCount: 1 },
                                                { name: 'RMImage', maxCount: 1 }
                                            ]), rawMaterialController.updateRMById);

module.exports = router ;