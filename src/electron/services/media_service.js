

class MediaService {
  constructor({ storePdfPath, fs, path, uuid }) {
    this.storePdfPath = storePdfPath;
    this.fs = fs;
    this.path = path;
    this.uuid = uuid;
  }

  // The function triggered by your button
  storeFile({ filePath }) {
    let fileOutput = [];

    filePath.forEach(file => {
      // get file name
      const fileName = this.path.basename(file);
      const extension = this.path.extname(fileName);
      const fileNameWithoutExtension = this.path.parse(fileName).name;
      const fileNameBuilder = fileNameWithoutExtension + '_' + this.uuid.v4() + extension;

      // copy file from original location to app data folder
      this.fs.copyFile(file, this.path.join(this.storePdfPath, fileNameBuilder), (err) => {
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