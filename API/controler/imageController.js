//DB instance
const db = require("../dbConfig/dbConfig");

const AddImage = (req, res) => {
  let imagePath;
  if (req.file) {
    console.log(req.file);
    console.log(req.body);

    imagePath = req.file.filename; //this is coming from multer, because multer logic will run before this and return the filename in req.file
    console.log(imagePath);
  }

  let values = [imagePath, req.body.name];
  let q = `INSERT INTO image (name, other) VALUES (?)`;
  db.query(q, [values], (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("image uploaded successfully !");
    }
  });
  res.status(200).json({
    message: "Image uploaded successfully!",
  });
};

const getAllImages = (req, res) => {
  let q = `SELECT * FROM image`;
  db.query(q, [], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.json(results);
    }
  });
};

module.exports = { AddImage, getAllImages };
