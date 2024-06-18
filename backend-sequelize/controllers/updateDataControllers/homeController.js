

const { Home } = require('../../models'); // Import the Page model
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = 'uploads/';
      // Ensure the uploads directory exists
      if (!fs.existsSync(uploadPath)){
        fs.mkdirSync(uploadPath);
        
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    }
  });

const upload = multer({ storage: storage });
const completeData= async (req, res) => {
    // const id=req.params.id;
     const {id}=req.body;
     const image=req.file;
     console.log(image)
     const metaimage=image?.filename;

     console.log(metaimage)
    const {
         // This should match the Page id
        metatitle, metadescription, metatags,
        headertitle, headerdescription, headerbuttonlabel, headerbuttonlink, headerbgimage,
        bottomsectiontitle, bottomsectiondescription, bottomsectionimage
      } = req.body;
    
      try {
        if(metatitle&&metadescription && metatags  &&
            headertitle && headerdescription && headerbuttonlabel && headerbuttonlink && headerbgimage &&
            bottomsectiontitle && bottomsectiondescription && bottomsectionimage){
        // Create or update the Home data
        
            const filename = await Home.findOne({ where: { id }, attributes: ['metaimage'] });
            console.log(filename.dataValues.metaimage)
            fs.unlink(`uploads/${filename.dataValues.metaimage}`, function (err) {
                if (err) console.log("file not present")
                console.log('File deleted!');
              });

        
        
        const [home, created] = await Home.upsert({
          id,
          metatitle,
          metadescription,
          metatags,
          metaimage,
          headertitle,
          headerdescription,
          headerbuttonlabel,
          headerbuttonlink,
          headerbgimage,
          bottomsectiontitle,
          bottomsectiondescription,
          bottomsectionimage
        });
    
        return res.status(200).json({ msg: "Home data added/updated successfully"});}
        else{
            return res.status(400).json({msg:"my err"})
        }
      } catch (err) {
        console.error("Database error:", err);
        return res.status(500).send({ msg: "Database error" });
      }
};
const getHomeDataById = async (req, res) => {
    const id= req.params.id;
   
  
    try {
      const home = await Home.findOne({ where: { id } });
  
      if (!home) {
        return res.status(404).json({ msg: "Home data not found" });
      }
  
      return res.status(200).json({ data: home });
    } catch (err) {
      console.error("Database error:", err);
      return res.status(500).send({ msg: "Database error" });
    }
  };


module.exports = {completeData,getHomeDataById,upload};
