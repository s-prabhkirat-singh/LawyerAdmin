// Example route using the Page model


const { About } = require('../../models'); 
const {AboutUsSectiontwoCards}=require('../../models');// Import the Page model
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { where } = require('sequelize');

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
  { name: 'section1image', maxCount: 1 }
]);


// Create a new page
const updateAboutData = async (req, res) => {
  const {
      id,
      metatitle,
      metadescription,
      metatags,
      headertitle,
      headerdescription,
      section1title,
      section1description,
      section1buttonlabel,
      section1buttonlink,
      section1yearsofexperience,
      section2title,
      section2description
  } = req.body;
  console.log(id)

  const metaImg = req.body.metaimage;
  const headerbgImg = req.body.headerbgimage;
  const section1Img = req.body.section1image;

  if (req.files) {
      const files = req.files;
      const metaimage = files?.metaimage ? files.metaimage[0].filename : metaImg;
      const headerbgimage = files?.headerbgimage ? files.headerbgimage[0].filename : headerbgImg;
      const section1image = files?.section1image ? files.section1image[0].filename : section1Img;

      try {
          if (metatitle && metadescription && metatags && headertitle && headerdescription && section1title && section1description && section1buttonlabel && section1buttonlink && section1yearsofexperience && section2title && section2description) {
              const currentData = await About.findOne({ where: { id }, attributes: ['metaimage', 'headerbgimage', 'section1image'] });

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
                  if (currentData.section1image !== section1Img && section1image) {
                      fs.unlink(`uploads/${currentData.section1image}`, (err) => {
                          if (err) console.log("Section 1 image file not present");
                          else console.log('Section 1 image file deleted!');
                      });
                  }
              }

              const [about, created] = await About.upsert({
                  id,
                  metatitle,
                  metadescription,
                  metatags,
                  metaimage,
                  headertitle,
                  headerdescription,
                  headerbgimage,
                  section1title,
                  section1description,
                  section1image,
                  section1buttonlabel,
                  section1buttonlink,
                  section1yearsofexperience,
                  section2title,
                  section2description
              });

              return res.status(200).json({ msg: "About data added/updated successfully" });
          } else {
              return res.status(400).json({ msg: "Invalid input data" });
          }
      } catch (err) {
          console.error("Database error:", err);
          return res.status(500).send({ msg: "Database error" });
      }
  } else {
      try {
          const [about, created] = await About.upsert({
              id,
              metatitle,
              metadescription,
              metatags,
              headertitle,
              headerdescription,
              section1title,
              section1description,
              section1buttonlabel,
              section1buttonlink,
              section1yearsofexperience,
              section2title,
              section2description
          });

          return res.status(200).json({ msg: "About data added/updated successfully", about });
      } catch (err) {
          console.error("Database error:", err);
          return res.status(500).send({ msg: "Database error" });
      }
  }
};

    const getAboutDataById = async (req, res) => {
        const id=req.params.id;
      
        try {
          const about = await About.findOne({ where: { id } });
      
          if (!about) {
            return res.status(404).json({ msg: "About data not found" });
          }
      
          return res.status(200).json({ data: about });
        } catch (err) {
          console.error("Database error:", err);
          return res.status(500).send({ msg: "Database error" });
        }
      };

// Controllers for cards of section 2 
const getCardList = async (req, res) => {
   
  
    try {
      const cards = await AboutUsSectiontwoCards.findAll();
  
      if (!cards) {
        return res.status(404).json({ msg: "Cards not found" });
      }
  
      return res.status(200).json({ data: cards });
    } catch (err) {
      console.error("Database error:", err);
      return res.status(500).send({ msg: "Database error" });
    }
  };
  const addCard= async(req,res)=>{
    const{id,about_id,count,text}=req.body; 
    const files = req.file;
    

    
    const icon = files ? files.filename : 0;
   
  

    try {
   

        await AboutUsSectiontwoCards.create({ id,about_id,count,icon,text });
    
        return res.status(200).json({ msg: "Card added successfully" });
      } catch (err) {
        console.error("Database error:", err);
        return res.status(500).send({ msg: "Database error" });
      }


  }
  const updateCardData= async(req,res)=>{
    
    const{id,about_id,count,text}=req.body;
    const files = req.file;
   
    

    
    var icon = files ? files.filename : 0;
    console.log(icon);
    const currentData = await AboutUsSectiontwoCards.findOne({ where: { id :id}, attributes: ['icon'] });
    console.log(currentData)
    if(currentData){

   

    if(icon){
        fs.unlink(`uploads/${currentData.icon}`, (err) => {
            if (err) console.log("icon file not present");
            else console.log('Icon file deleted!');
        });

    }
    else{
      icon=currentData.icon
    }
    
    try {
   

        await AboutUsSectiontwoCards.upsert({ id,about_id,count,icon,text });
    
        return res.status(200).json({ msg: "Card added successfully" });
      } catch (err) {
        console.error("Database error:", err);
        return res.status(500).send({ msg: "Database error" });
      }
    }
    else{
        fs.unlink(`uploads/${icon}`, (err) => {
            if (err) console.log("icon file not present");
            else console.log('Icon file deleted!');
        });

        return res.status(400).send({msg:"Card with specified id not present"})
    }

  }
  const deleteCard= async(req,res)=>{
    
    const {id}=req.params;
    console.log(id)

    try {
   
        const currentData = await AboutUsSectiontwoCards.findOne({ where: { id :id}, attributes: ['icon'] });
        console.log(currentData)
        if(currentData){
            fs.unlink(`uploads/${currentData.icon}`, (err) => {
                if (err) console.log("icon file not present");
                else console.log('Icon file deleted!');
            });
            const result=await AboutUsSectiontwoCards.destroy({where:{id:id}});
            if(result){
            
            return res.status(200).json({ msg: "Card Deleted successfully" });
            }
            else{
                return res.status(400).json({msg:"Card Not Present"})


            }
        }

       
        

           
        
        else{
            return res.status(400).json({msg:"error deleting file"})
          
        }
       
    
      } catch (err) {
        console.error("Database error:", err);
        return res.status(500).send({ msg: "Database error" });
      }


  }


module.exports = {updateAboutData, getAboutDataById,upload,multiUpload ,getCardList,addCard,updateCardData,deleteCard};
