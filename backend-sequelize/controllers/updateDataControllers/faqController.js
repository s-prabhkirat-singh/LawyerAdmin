// Example route using the Page model


const { Faq,FaqQuestionAnswers } = require('../../models'); 
// Import the Page model
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Multer Config Files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const uploadPath = 'uploads/';
      // Ensure the uploads directory exists
      if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath);

      }
      cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  }
});

const upload = multer({ storage: storage });

const multiUpload = upload.fields([
  { name: 'metaimage', maxCount: 1 },
  { name: 'headerbgimage', maxCount: 1 },
  { name: 'image', maxCount: 1 }
  
]);


// Create a new page
const updateFaqData = async (req, res) => {
  const {
      id,
      metatitle,
      metadescription,
      metatags,
      headertitle,
      headerdescription,
      headerbuttonlabel,
      headerbuttonlink,
      title,
      description,
    
  } = req.body;
  console.log(id)

  const metaImg = req.body.metaimage;
  const headerbgImg = req.body.headerbgimage;
  const Img = req.body.image;
 

  if (req.files) {
      const files = req.files;
      const metaimage = files?.metaimage ? files.metaimage[0].filename : metaImg;
      const headerbgimage = files?.headerbgimage ? files.headerbgimage[0].filename : headerbgImg;
      const image = files?.image ? files.image[0].filename : Img;
     
      try {
          if (description&&metatitle && metadescription && metatags && headertitle && headerdescription  && headerbuttonlabel && headerbuttonlink && title ) {
              const currentData = await Faq.findOne({ where: { id:id }, attributes: ['metaimage', 'headerbgimage','image'] });

              if (currentData) {
                  if (currentData.metaimage !== metaImg && metaimage) {
                      fs.unlink(`uploads/${currentData.metaimage}`, (err) => {
                          if (err) console.log("Meta image file not present");
                          else console.log('Meta image file deleted!');
                      });
                  }
                  if (currentData.headerbgimage !== headerbgImg && headerbgimage) {
                      fs.unlink(`uploads/${currentData.headerbgimage}`, (err) => {
                          if (err) console.log("Header background image file not present");
                          else console.log('Header background image file deleted!');
                      });
                  }
                  if (currentData.image !== Img && image) {
                      fs.unlink(`uploads/${currentData.image}`, (err) => {
                          if (err) console.log(" Image file not present");
                          else console.log('Image file deleted!');
                      });
                  }
                
              }

              const [about, created] = await Faq.upsert({
                  id,
                  metatitle,
                  metadescription,
                  metatags,
                  metaimage,
                  headertitle,
                  headerdescription,
                  headerbgimage,
                  description,
                  image,
            
                  headerbuttonlabel,
                  headerbuttonlink,
                  title
                              
              });

              return res.status(200).json({ msg: "Faqs data added/updated successfully" });
          } else {
              return res.status(400).json({ msg: "Invalid input data" });
          }
      } catch (err) {
          console.error("Database error:", err);
          return res.status(500).send({ msg: "Database error" });
      }
  } else {
      try {
          const [about, created] = await Faq.upsert({
            id,
            metatitle,
            metadescription,
            metatags,
            Img,
            description,
            metaImg,
            headertitle,
            headerdescription,
            headerbgImg,
            headerbuttonlabel,
            headerbuttonlink,
            title,
       
      
          });

          return res.status(200).json({ msg: "About data added/updated successfully", about });
      } catch (err) {
          console.error("Database error:", err);
          return res.status(500).send({ msg: "Database error" });
      }
  }
};

    const getFaqDataById = async (req, res) => {
        const id=req.params.id;
      
        try {
          const about = await Faq.findOne({ where: { id } });
      
          if (!about) {
            return res.status(404).json({ msg: "About data not found" });
          }
      
          return res.status(200).json({ data: about });
        } catch (err) {
          console.error("Database error:", err);
          return res.status(500).send({ msg: "Database error" });
        }
      };

const addQueAns = async(req,res)=>{
    const {  question, answer } = req.body;
    console.log(question)
    console.log(answer)
    const faq_id=6;

    try {
     
  
      await FaqQuestionAnswers.create({  faq_id,question, answer});
  
      return res.status(200).json({ msg: "Faq Question added successfully" });
    } catch (err) {
      console.error("Database error:", err);
      return res.status(500).send({ msg: "Database error" });
    }
  };
  const getQuesList = async (req, res) => {
   
  
    try {
      const Questions = await FaqQuestionAnswers.findAll();
  
      if (!Questions) {
        return res.status(404).json({ msg: "Questions not found" });
      }
  
      return res.status(200).json({ data: Questions });
    } catch (err) {
      console.error("Database error:", err);
      return res.status(500).send({ msg: "Database error" });
    }
  };

  const deleteQues= async(req,res)=>{
    
    const {id}=req.params;
    console.log(id)

    try {
   
        const currentData = await FaqQuestionAnswers.findOne({ where: { id :id}});
      
        if(currentData){
      
            const result=await FaqQuestionAnswers.destroy({where:{id:id}});
            if(result){
            
            return res.status(200).json({ msg: "Question Deleted successfully" });
            }
            else{
                return res.status(400).json({msg:"Question Not Present"})


            }
        }

       
        
        else{
            return res.status(400).json({msg:"Question with specified id not present"})
          
        }
       
    
      } catch (err) {
        console.error("Database error:", err);
        return res.status(500).send({ msg: "Database error" });
      }


  }
  const updateQuesData= async(req,res)=>{
    
    const{id,question,answer}=req.body;
   
    
    const currentData = await FaqQuestionAnswers.findOne({ where: { id :id}});
    if(currentData){
    
    try {
   

        await FaqQuestionAnswers.upsert({ id,question,answer });
    
        return res.status(200).json({ msg: "Question Data Updated Successfuly" });
      } catch (err) {
        console.error("Database error:", err);
        return res.status(500).send({ msg: "Database error" });
      }
    }
    else{
     

        return res.status(400).send({msg:"Question with specified id not present"})
    }

  }
module.exports = {updateFaqData,getFaqDataById,upload,multiUpload,addQueAns,getQuesList,deleteQues,updateQuesData };
