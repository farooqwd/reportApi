const { Router } = require("express");
const report = require("../schemas/report");

const router = Router();

router.post("/submit", async (req, res) => {
  // const { title, description, location } = req.body;
  console.log(req.body);
  try {
    await report.create({ title, description, location });
    res.status(200).send({
      msg: `report has been registered`,
    });
  } catch (error) {
    res.status(500).json({ error: "Error saving item" });
  }
});
module.exports = router;
