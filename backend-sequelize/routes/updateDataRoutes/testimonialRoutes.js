const express = require("express");
const router = express.Router();
const testimonialController=require('../../controllers/updateDataControllers/testimonialController')


router.post('/addTestimonial',testimonialController.upload.single('image'),testimonialController.addTestimonial)
router.post('/deleteTestimonial/:id',testimonialController.deleteTestimonial)
router.post('/updateTestimonial',testimonialController.upload.single('image'),testimonialController.updateTestimonialData)
router.get('/getTestimonialList',testimonialController.getTestimonialList)


module.exports=router;