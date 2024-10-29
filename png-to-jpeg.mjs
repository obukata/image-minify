import fs from 'fs'
import path from 'path'
import pngToJpeg from 'png-to-jpeg'

const pngFiles = fs.readdirSync('./dist').filter(file => path.extname(file) === '.png');
pngFiles.forEach(file => {
  const filePath = path.join('./dist', file);
  const data = fs.readFileSync(filePath);
  pngToJpeg({quality: 90})(data)
    .then(output => {
      const jpegFilePath = path.join('./dist', path.basename(file, '.png') + '.jpeg');
      fs.writeFileSync(jpegFilePath, output);
      fs.unlinkSync(filePath);
    })
    .catch(error => console.error(error));
});
