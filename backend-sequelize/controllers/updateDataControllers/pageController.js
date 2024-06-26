// Example route using the Page model


const { Page } = require('../../models'); 

// Create a new page

const completeData = async (req, res) => {
  const { id, name, slug, sequence } = req.body;

  try {


    await Page.create({ id, name, slug, sequence });

    return res.status(200).json({ msg: "Page added successfully" });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).send({ msg: "Database error" });
  }
};


module.exports = { completeData };
