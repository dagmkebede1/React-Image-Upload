const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //this path should be created in API folder "public/img"
    cb(null, "./public/img/");
  },
  filename: function (req, file, cb) {
    // let fileName = `/public/img/${file.ori}`
    cb(null, file.originalname);

    //user-28649179-33336668.jpg
    // const ext = file.mimetype.split("/")[1];
    // cb(null, `image-${req.user.id}-${Date.now()}.${ext}`);
  },
});

//only taking image formats
const fileFilter = function (req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb("Not an image! please upload Only images.", false);
  }
};

//initializing multer
const upload = multer({
  storage: storage,
  //   limits: { fieldSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

//preparing the method to extruct image from the front
exports.imageUploader = upload.single("file"); //"image" here should be the name attribute of the html input element
