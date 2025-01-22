const vision = require('@google-cloud/vision');

// Khởi tạo client
const client = new vision.ImageAnnotatorClient({
  keyFilename: '../server/vision-api.json', // Đường dẫn đến file JSON
});

module.exports = client;
