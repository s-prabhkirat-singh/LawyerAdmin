const express = require("express");
const router = express.Router();
const resourceController=require('../../controllers/updateDataControllers/resourceController')

router.post('/addResourceData',resourceController.multiUpload,resourceController.updateResourceData)
router.get('/getResourceData/:id',resourceController.getResourceDataById)
module.exports=router;