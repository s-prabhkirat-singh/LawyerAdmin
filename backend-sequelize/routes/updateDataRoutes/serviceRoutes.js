const express = require("express");
const router = express.Router();

const ServiceController=require('../../controllers/updateDataControllers/serviceController')

router.post('/addServicesData',ServiceController.multiUpload,ServiceController.updateServicesData)
router.get('/getServiceData/:id',ServiceController.getServicesDataById)


module.exports=router;