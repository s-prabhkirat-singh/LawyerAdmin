const express = require("express");
const router = express.Router();
const aboutController=require('../../controllers/updateDataControllers/aboutController')

router.post('/addAboutData',aboutController.completeData)
router.get('/getAboutData/:id',aboutController.getAboutDataById)


module.exports=router;