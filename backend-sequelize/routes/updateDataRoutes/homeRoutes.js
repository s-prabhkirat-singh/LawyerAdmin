const express = require("express");
const router = express.Router();
const homeController=require('../../controllers/updateDataControllers/homeController')

router.post('/addHomeData',homeController.completeData)


module.exports=router;