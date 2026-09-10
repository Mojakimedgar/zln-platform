const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./Routes/authRoutes");
const alertRoutes = require("./Routes/alertRoutes");
//const visitorRoutes = require("./routes/visitorRoutes");

const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "ZLN API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/alerts", alertRoutes);
//app.use("/api/visitors", visitorRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`ZLN backend running on http://localhost:${PORT}`);
});