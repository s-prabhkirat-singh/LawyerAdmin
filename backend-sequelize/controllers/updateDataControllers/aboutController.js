// Example route using the Page model


const { About } = require('../../models'); // Import the Page model

// Create a new page
const completeData= async (req, res) => {
    const {
        id, metatitle, metadescription, metatags, metaimage,
        headertitle, headerdescription, headerbgimage,
        section1title, section1description, section1image, section1buttonlabel, section1buttonlink, section1yearsofexperience,
        section2title, section2description
      } = req.body;
    
      try {
        await About.create({
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
    
        return res.status(200).json({ msg: "About data added successfully" });
      } catch (err) {
        console.error("Database error:", err);
        return res.status(500).send({ msg: "Database error" });
      }
    };

    const getAboutDataById = async (req, res) => {
        const { id } = req.body;
      
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


module.exports = {completeData, getAboutDataById};
