// Example route using the Page model


const { Resource } = require('../../models'); 
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
  { name: 'headerbgimage', maxCount: 1 }
  
]);


// Create a new page
const updateResourceData = async (req, res) => {
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
      content
  } = req.body;
  console.log(id)

  const metaImg = req.body.metaimage;
  const headerbgImg = req.body.headerbgimage;
 

  if (req.files) {
      const files = req.files;
      const metaimage = files?.metaimage ? files.metaimage[0].filename : metaImg;
      const headerbgimage = files?.headerbgimage ? files.headerbgimage[0].filename : headerbgImg;
     
      try {
          if (metatitle && metadescription && metatags && headertitle && headerdescription  && headerbuttonlabel && headerbuttonlink && title &&content ) {
              const currentData = await Resource.findOne({ where: { id }, attributes: ['metaimage', 'headerbgimage'] });

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
                
              }

              const [about, created] = await Resource.upsert({
                  id,
                  metatitle,
                  metadescription,
                  metatags,
                  metaimage,
                  headertitle,
                  headerdescription,
                  headerbgimage,
            
                  headerbuttonlabel,
                  headerbuttonlink,
                  title,
                  content
            
              });

              return res.status(200).json({ msg: "Resources data added/updated successfully" });
          } else {
              return res.status(400).json({ msg: "Invalid input data" });
          }
      } catch (err) {
          console.error("Database error:", err);
          return res.status(500).send({ msg: "Database error" });
      }
  } else {
      try {
          const [about, created] = await Resource.upsert({
            id,
            metatitle,
            metadescription,
            metatags,
            metaImg,
            headertitle,
            headerdescription,
            headerbgImg,
            headerbuttonlabel,
            headerbuttonlink,
            title,
            content
      
          });

          return res.status(200).json({ msg: "About data added/updated successfully", about });
      } catch (err) {
          console.error("Database error:", err);
          return res.status(500).send({ msg: "Database error" });
      }
  }
};

    const getResourceDataById = async (req, res) => {
        const id=req.params.id;
      
        try {
          const about = await Resource.findOne({ where: { id } });
      
          if (!about) {
            return res.status(404).json({ msg: "About data not found" });
          }
      
          return res.status(200).json({ data: about });
        } catch (err) {
          console.error("Database error:", err);
          return res.status(500).send({ msg: "Database error" });
        }
      };



module.exports = {updateResourceData,getResourceDataById,upload,multiUpload };
