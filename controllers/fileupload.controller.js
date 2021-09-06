const upload = require('../upload/fileupload');

const URL = 'http://localhost/get-cfiles/';
const fs = require('fs');

const uploadFile = async(req, res) => {
    try {
        await upload(req, res);
        if (req.file == undefined) {
            res.status(400).json({ 'result': 'Choose a file to upload' })
        }
        res.status(200).json({ 'result': 'File uploaded successfully: ' + req.file.originalname })
    } catch (error) {
        console.log(error);
        if (error.code == 'LIMIT_FILE_SIZE') {
            return res.status(500).json({ 'result': 'File size should be less than 10MB.' });
        }
        res.status(500).json({ 'result': `Error occured: ${error}` });
    }
}

const getFilesList = (req, res) => {
    const path = __basedir + '/files/document';

    fs.readdir(path, (err, files) => {
        if (err) {
            res.status(500).json({ 'result': 'Files not found.' });
        }
        const filesList = [];

        files.forEach((file) => {
            filesList.push({
                name: file,
                url: URL + file
            });
        });

        res.status(200).json({ 'result': filesList });
    });
}

const downloadFiles = (req, res) => {
    const fileName = req.params.name;
    const path = __basedir + "/files/document";

    res.download(path + fileName, (err) => {
        if (err) {
            res.status(500).json({ message: "File can not be downloaded: " + err });
        }
    });
};

module.exports = { uploadFile, downloadFiles, getFilesList };