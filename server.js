const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.set("view engine", "ejs");
app.set("views", "./viewFolder");
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueStuff = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueStuff + ext);
  },
});

const upload = multer({ storage });
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/uploads", upload.single("file"), (req, res) => {
  console.log("file removed successfully");
  res.send("file remove successfully");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
