

const { Home } = require('../../models'); // Import the Page model


const completeData= async (req, res) => {
    const id=req.params.id;
    const {
         // This should match the Page id
        metatitle, metadescription, metatags, metaimage,
        headertitle, headerdescription, headerbuttonlabel, headerbuttonlink, headerbgimage,
        bottomsectiontitle, bottomsectiondescription, bottomsectionimage
      } = req.body;
    
      try {
        if(metatitle&&metadescription && metatags && metaimage &&
            headertitle && headerdescription && headerbuttonlabel && headerbuttonlink && headerbgimage &&
            bottomsectiontitle && bottomsectiondescription && bottomsectionimage){
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
    
        return res.status(200).json({ msg: "Home data added/updated successfully"});}
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


module.exports = {completeData,getHomeDataById};
