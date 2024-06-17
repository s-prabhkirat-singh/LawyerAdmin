

const { Home } = require('../../models'); // Import the Page model


const completeData= async (req, res) => {
    const {
        id, // This should match the Page id
        metatitle, metadescription, metatags, metaimage,
        headertitle, headerdescription, headerbuttonlabel, headerbuttonlink, headerbgimage,
        bottomsectiontitle, bottomsectiondescription, bottomsectionimage
      } = req.body;
    
      try {
        // Create or update the Home data
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
    
        return res.status(200).json({ msg: "Home data added/updated successfully", home });
      } catch (err) {
        console.error("Database error:", err);
        return res.status(500).send({ msg: "Database error" });
      }
};

// Other routes for reading, updating, and deleting pages...

module.exports = {completeData};
