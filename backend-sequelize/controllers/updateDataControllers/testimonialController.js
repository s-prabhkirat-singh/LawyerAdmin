const { Testimonials } = require('../../models');
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

const getTestimonialList = async (req, res) => {


  try {
    const Testimonial = await Testimonials.findAll();

    if (!Testimonial) {
      return res.status(404).json({ msg: "Testimonials not found" });
    }

    return res.status(200).json({ data: Testimonial });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).send({ msg: "Database error" });
  }
};

const addTestimonial = async (req, res) => {
  const { id, name, position, review_text } = req.body;
  const files = req.file;



  const image = files ? files.filename : 0;



  try {


    await Testimonials.create({ id, name, position, image, review_text });

    return res.status(200).json({ msg: "Testimonial added successfully" });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).send({ msg: "Database error" });
  }


}

const updateTestimonialData = async (req, res) => {

  const { id, name, position, review_text } = req.body;
  const files = req.file;




  var image = files ? files.filename : 0;
  console.log(image);
  const currentData = await Testimonials.findOne({ where: { id: id }, attributes: ['image'] });
  console.log(currentData)
  if (currentData) {



    if (image) {
      fs.unlink(`uploads/${currentData.image}`, (err) => {
        if (err) console.log("image file not present");
        else console.log('image file deleted!');
      });

    }
    else {
      image = currentData.image;
    }

    try {


      await Testimonials.upsert({ id, name, position, image, review_text });

      return res.status(200).json({ msg: "Testimonial Updated Successfully" });
    } catch (err) {
      console.error("Database error:", err);
      return res.status(500).send({ msg: "Database error" });
    }
  }
  else {
    fs.unlink(`uploads/${image}`, (err) => {
      if (err) console.log("image file not present");
      else console.log('image file deleted!');
    });

    return res.status(400).send({ msg: "Card with specified id not present" })
  }

}

const deleteTestimonial = async (req, res) => {

  const { id } = req.params;
  console.log(id)

  try {

    const currentData = await Testimonials.findOne({ where: { id: id }, attributes: ['image'] });
    console.log(currentData)
    if (currentData) {
      fs.unlink(`uploads/${currentData.image}`, (err) => {
        if (err) console.log("image file not present");
        else console.log('image file deleted!');
      });
      const result = await Testimonials.destroy({ where: { id: id } });
      if (result) {

        return res.status(200).json({ msg: "Testimonial Deleted successfully" });
      }
      else {
        return res.status(400).json({ msg: "Testimonial Not Present" })


      }
    }






    else {
      return res.status(400).json({ msg: "error deleting file" })

    }


  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).send({ msg: "Database error" });
  }


}

module.exports = { updateTestimonialData, getTestimonialList, upload, deleteTestimonial, addTestimonial };
