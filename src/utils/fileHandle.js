const fs = require('fs');

function isFileExist(filePath) {
  try {
    let isExist = fs.existsSync(filePath);
    return isExist;
  } catch (error) {
    console.error(`isFileExist error: ${error.message}`);
  }
}

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString('utf-8');
  } catch (error) {
    console.error(`readFile error: ${error.message}`);
  }
}

function makeNewFile(filePath, defaultContent) {
  try {
    fs.writeFileSync(filePath, defaultContent);
  } catch (error) {
    console.error(`makeNewFile error: ${error.message}`);
  }
}

function deleteFile(filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error(`deleteFile error: ${error.message}`);
  }
}

function setFile(filePath, defaultContent) {
  try {
    if (isFileExist(filePath)) {
      deleteFile(filePath);
      makeNewFile(filePath, defaultContent);
    } else {
      makeNewFile(filePath, defaultContent);
    }
  } catch (error) {
    console.error(`setFile error: ${error.message}`);
  }
}

exports.isFileExist = isFileExist;
exports.readFile = readFile;
exports.makeNewFile = makeNewFile;
exports.deleteFile = deleteFile;
exports.setFile = setFile;
