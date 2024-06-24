const express = require("express");
const router = express.Router();
const aboutController=require('../../controllers/updateDataControllers/aboutController')

router.post('/addAboutData',aboutController.multiUpload,aboutController.updateAboutData)
router.get('/getAboutData/:id',aboutController.getAboutDataById)

// Routes for section 2 

router.post('/addCardData',aboutController.upload.single('icon'),aboutController.addCard)
router.post('/deleteCard/:id',aboutController.deleteCard)
router.post('/updateCardData',aboutController.upload.single('icon'),aboutController.updateCardData)
router.get('/getCardList',aboutController.getCardList)


module.exports=router;