const express = require("express");
const router = express.Router();
const faqController= require('../../controllers/updateDataControllers/faqController')

router.post('/addFaqdata',faqController.multiUpload,faqController.updateFaqData)
router.get('/getFaqData/:id',faqController.getFaqDataById)



router.post('/addQuestion',faqController.addQueAns)
router.get('/getQuestions',faqController.getQuesList);
router.post('/updateQuesData',faqController.updateQuesData);
router.delete('/deleteQuestion/:id',faqController.deleteQues)


module.exports=router;