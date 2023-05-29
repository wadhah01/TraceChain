const packageController = require ('../controllers/packageController');
const {Router} = require('express');
const router = Router();

const multer = require('multer');


const mystorage = multer.diskStorage({
    destination:"./uploads/package",
    filename:(req,file,redirect)=>{
        let date = Date.now();
        let fl= date +'.'+file.mimetype.split('/')[1];
        redirect(null,fl)
    }
})
const upload=multer({storage:mystorage})

router.post('/createPkg',upload.single("PkgImage"), packageController.createPkg);
router.get('/findPkgById/:id',packageController.findPkgById);
router.get('/findPkgByType/:type',packageController.findPkgByType);
router.get('/findPkgByCreator/:creator',packageController.findPkgByCreator);
router.get('/findPkgAll',packageController.findPkgAll);
router.delete('/deletePkgById/:id',packageController.deletePkgById);
router.put('/updatePkgById/:id',upload.any("PkgImage"),packageController.updatePkgById);

module.exports = router ;