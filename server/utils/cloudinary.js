require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
   cloud_name: 'dwxvplzfb',
   api_key: '535339876576229',
   api_secret: 'J4Kl8QBhCFS_dkn7U4Ehc05cj7I',
});

module.exports = { cloudinary };
