
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Services } = require('../../models')
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

const updateServicesData = async (req, res) => {
    const {
        id,
        metatitle,
        metadescription,
        metatags,
        headertitle,
        headerdescription,
        headerbuttonlabel,
        headerbuttonlink,
        section1title,
        section1description,
        section1buttonlabel,
        section1buttonlink,
        section1yearsofexperience,
        section2title,
        section2description,
        name,
        slug
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
            if (headerbuttonlabel && headerbuttonlink && metatitle && metadescription && metatags && headertitle && headerdescription && section1title && section1description && section1buttonlabel && section1buttonlink && section1yearsofexperience && section2title && section2description) {
                const currentData = await Services.findOne({ where: { id }, attributes: ['metaimage', 'headerbgimage', 'section1image'] });

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

                const [services, created] = await Services.upsert({
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
                    section1title,
                    section1description,
                    section1image,
                    section1buttonlabel,
                    section1buttonlink,
                    section1yearsofexperience,
                    section2title,
                    section2description,
                    name,
                    slug
                });

                return res.status(200).json({ msg: "Services data added/updated successfully" });
            } else {
                return res.status(400).json({ msg: "Invalid input data" });
            }
        } catch (err) {
            console.error("Database error:", err);
            return res.status(500).send({ msg: "Database error" });
        }
    } else {
        try {
            const [services, created] = await Services.upsert({
                id,
                metatitle,
                metadescription,
                metatags,
                headertitle,
                headerdescription,
                headerbuttonlabel,
                headerbuttonlink,
                section1title,
                section1description,
                section1buttonlabel,
                section1buttonlink,
                section1yearsofexperience,
                section2title,
                section2description,
                name,
                slug
            });

            return res.status(200).json({ msg: "Services data added/updated successfully", Services });
        } catch (err) {
            console.error("Database error:", err);
            return res.status(500).send({ msg: "Database error" });
        }
    }
};

const getServicesDataById = async (req, res) => {
    const id = req.params.id;

    try {
        const Services_All = await Services.findOne({ where: { id } });

        if (!Services_All) {
            return res.status(404).json({ msg: "Services data not found" });
        }

        return res.status(200).json({ data: Services_All });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).send({ msg: "Database error" });
    }
};

module.exports = { updateServicesData, getServicesDataById, upload, multiUpload };
