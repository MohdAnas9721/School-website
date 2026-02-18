const router = require("express").Router();
const { listEvents, createEvent } = require("../controllers/events.controller");
const { auth, onlyAdmin } = require("../middleware/auth.middleware");

router.get("/", listEvents);
router.post("/", auth, onlyAdmin, createEvent);

module.exports = router;