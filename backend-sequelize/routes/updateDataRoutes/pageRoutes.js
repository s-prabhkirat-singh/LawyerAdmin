const express = require("express");
const router = express.Router();
const pageController=require('../../controllers/updateDataControllers/pageController')

router.post('/addPageData',pageController.completeData)


module.exports=router;