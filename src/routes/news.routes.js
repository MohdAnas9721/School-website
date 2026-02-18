const router = require("express").Router();
const { listNews, createNews } = require("../controllers/news.controller");
const { auth, onlyAdmin } = require("../middleware/auth.middleware");

router.get("/", listNews);
router.post("/", auth, onlyAdmin, createNews);

module.exports = router;
