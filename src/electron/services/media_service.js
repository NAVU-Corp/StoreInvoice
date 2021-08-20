const { storePdfPath } = require('../database/index');
const fs = require('fs');
const path = require("path");
const uuid = require('uuid');

class MediaService {
  constructor({ storePdfPath }) {
    this.storePdfPath = storePdfPath;
  }

  // The function triggered by your button
  storeFile({ filePath }) {
    let fileOutput = [];

    filePath.forEach(file => {
      // get file name
      const fileName = path.basename(file);
      const extension = path.extname(fileName);
      const fileNameWithoutExtension = path.parse(fileName).name;
      const fileNameBuilder = fileNameWithoutExtension + '_' + uuid.v4() + extension;

      // copy file from original location to app data folder
      fs.copyFile(file, path.join(this.storePdfPath, fileNameBuilder), (err) => {
          if (err) throw err;
      });

      fileOutput.push({
        filename: file,
        filenamestore: fileNameBuilder,
      });
    });

    return fileOutput;
  }
}

module.exports = {
  MediaService,
};