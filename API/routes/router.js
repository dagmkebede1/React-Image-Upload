const Router = require("express").Router();
const { AddImage, getAllImages } = require("../controler/imageController");
const { imageUploader } = require("../middlewares/imageParser");

Router.route("/uploads").post(imageUploader, AddImage).get(getAllImages);

module.exports.Router = Router;
