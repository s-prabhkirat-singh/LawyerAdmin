

const { Home } = require('../../models'); // Import the Page model
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { header } = require('express-validator');

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
    { name: 'bottomsectionimage', maxCount: 1 }
  ]);



const updateData = async (req, res) => {
    const { id, metatitle, metadescription, metatags, headertitle, headerdescription, headerbuttonlabel, headerbuttonlink, bottomsectiontitle, bottomsectiondescription, metaimage, headerbgimage, bottomsectionimage } = req.body;
    const metaImg=metaimage;
    const headerbgImg=headerbgimage;
    const bottomsectionimg=bottomsectionimage
    
    if (req.files) {
        const files = req.files;
        const metaimage = files?.metaimage ? files.metaimage[0].filename : metaImg;
        const headerbgimage = files?.headerbgimage ? files.headerbgimage[0].filename : headerbgImg;
        const bottomsectionimage = files?.bottomsectionimage ? files.bottomsectionimage[0].filename : bottomsectionimg;

        try {
            if (metatitle && metadescription && metatags && headertitle && headerdescription && headerbuttonlabel && headerbuttonlink && bottomsectiontitle && bottomsectiondescription) {
                const currentData = await Home.findOne({ where: { id }, attributes: ['metaimage', 'bottomsectionimage', 'headerbgimage'] });

                if (currentData) {
                    if (currentData.metaimage!=metaImg && metaimage) {
                        fs.unlink(`uploads/${currentData.metaimage}`, (err) => {
                            if (err) console.log("Meta image file not present");
                            else console.log('Meta image file deleted!');
                        });
                    }
                    else{
                        const {metaimage}=req.body;
                    }
                    if (currentData.headerbgimage!=headerbgImg && headerbgimage) {
                        fs.unlink(`uploads/${currentData.headerbgimage}`, (err) => {
                            if (err) console.log("Header background image file not present");
                            else console.log('Header background image file deleted!');
                        });
                    }
                    if (currentData.bottomsectionimage!=bottomsectionimg && bottomsectionimage) {
                        fs.unlink(`uploads/${currentData.bottomsectionimage}`, (err) => {
                            if (err) console.log("Bottom section image file not present");
                            else console.log('Bottom section image file deleted!');
                        });
                    }
                }

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

                return res.status(200).json({ msg: "Home data added/updated successfully" });
            } else {
                return res.status(400).json({ msg: "Invalid input data" });
            }
        } catch (err) {
            console.error("Database error:", err);
            return res.status(500).send({ msg: "Database error" });
        }
    } else {
        try {
            const [home, created] = await Home.upsert({
                id,
                metatitle,
                metadescription,
                metatags,
             
                headertitle,
                headerdescription,
                headerbuttonlabel,
                headerbuttonlink,
               
                bottomsectiontitle,
                bottomsectiondescription,
               
            });

            return res.status(200).json({ msg: "Home data added/updated successfully", home });
        } catch (err) {
            console.error("Database error:", err);
            return res.status(500).send({ msg: "Database error" });
        }
    }
};

const getHomeDataById = async (req, res) => {
    const id = req.params.id;


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


module.exports = { updateData, getHomeDataById, upload,multiUpload };
