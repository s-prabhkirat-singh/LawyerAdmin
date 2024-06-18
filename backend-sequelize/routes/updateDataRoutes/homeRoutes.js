const express = require("express");
const router = express.Router();
const homeController=require('../../controllers/updateDataControllers/homeController')

router.put('/addHomeData/:id',homeController.completeData)
router.get('/getHomeData/:id',homeController.getHomeDataById)


module.exports=router;