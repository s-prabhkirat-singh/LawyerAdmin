const express = require("express");
const router = express.Router();
const faqController= require('../../controllers/updateDataControllers/faqController')

router.post('/addFaqdata',faqController.multiUpload,faqController.updateFaqData)
router.get('/getFaqData/:id',faqController.getFaqDataById)


module.exports=router;