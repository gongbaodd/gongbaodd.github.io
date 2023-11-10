const fs = require('fs');
const path = require('path');

function renameFilesInFolder(folderPath) {
  fs.readdirSync(folderPath).forEach(file => {
    const filePath = path.join(folderPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      // If the current item is a directory, recursively call the function
      renameFilesInFolder(filePath);
    } else if (path.extname(file) === '.markdown') {
      const newFilePath = path.join(folderPath, path.basename(file, '.markdown') + '.md');

      fs.renameSync(filePath, newFilePath);
      console.log(`Renamed: ${file} to ${path.basename(file, '.markdown') + '.md'}`);
    }
  });
}

const rootFolder = './_docs'; 
renameFilesInFolder(rootFolder);

console.log('Renaming completed.');