const express = require("express");
const cors = require("cors");
const { Router } = require("./routes/router");
const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//exposing the resource locations
app.use(express.static("public/img"));

app.use(Router);
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
