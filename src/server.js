require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/news", require("./routes/news.routes"));
app.use("/api/events", require("./routes/events.routes"));
app.use("/api/contact", require("./routes/contact.routes"));

const PORT = process.env.PORT || 3000;

connectDB(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`✅ Backend running http://localhost:${PORT}`)))
  .catch((err) => {
    console.error("DB Error:", err.message);
    process.exit(1);
  });
