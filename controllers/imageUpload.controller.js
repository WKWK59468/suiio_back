const upload = require("../upload/imageUpload");
const myFunction = require("../myFunction");
const URL = "/files/image/";
const fs = require("fs");

const uploadFile = async (req, res) => {
  try {
    await upload(req, res);
    if (req.file == undefined) {
      res.status(400).json({ result: "Choose a file to upload" });
      return new Promise((resolve, reject) => {});
    }
    res
      .status(200)
      .json({ result: "File uploaded successfully: " + req.file.originalname });
    return new Promise((resolve, reject) => {});
  } catch (error) {
    console.log(error);
    if (error.code == "LIMIT_FILE_SIZE") {
      res.status(400).json({ result: "File size should be less than 500MB." });
      return new Promise((resolve, reject) => {});
    }
    res.status(500).json({ result: `Error occured: ${error}` });
    return new Promise((resolve, reject) => {});
  }
};

const getFilesList = (req, res) => {
  const path = __basedir + "/files/image/";

  fs.readdir(path, (err, files) => {
    if (err) {
      res.status(404).json({ result: "Files not found." });
      return new Promise((resolve, reject) => {});
    }
    const filesList = [];

    files.forEach((file) => {
      filesList.push({
        name: file,
        url: __basedir + URL + file,
      });
    });

    res.status(200).json({ result: filesList });
    return new Promise((resolve, reject) => {});
  });
};

const downloadFiles = (req, res) => {
  const fileName = req.params.name;
  const path = __basedir + "/files/image/";

  res.download(path + fileName, (err) => {
    if (err) {
      res.status(400).json({ message: "File can not be downloaded: " + err });
      return new Promise((resolve, reject) => {});
    }
  });
};

module.exports = { uploadFile, downloadFiles, getFilesList };
