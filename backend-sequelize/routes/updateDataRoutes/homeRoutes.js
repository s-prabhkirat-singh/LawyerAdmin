const express = require("express");
const router = express.Router();
const homeController=require('../../controllers/updateDataControllers/homeController')

router.post('/addHomeData',homeController.upload.single('image'),homeController.completeData)
router.get('/getHomeData/:id',homeController.getHomeDataById)


module.exports=router;