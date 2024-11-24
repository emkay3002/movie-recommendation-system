const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json([
    {
      name: "Avengers Endgame",
      price: 10000,
    },
  ]);
});

module.exports = router;
