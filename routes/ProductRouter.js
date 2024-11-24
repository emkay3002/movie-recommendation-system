const { ensureAuthenticated } = require("../middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json([
    {
      name: "Avengers Endgame",
      genre: "Sci-Fi",
    },
    {
      name: "The Dark Knight",
      genre: "Thriller",
    },
  ]);
});

module.exports = router;
