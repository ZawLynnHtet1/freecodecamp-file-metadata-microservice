const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


//store in local storage 
const multerStorage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename : (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname}`)
  }
});
const upload = multer({storage : multerStorage})
//upload with post method
app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  console.log(req.file, req.body)
  res.json({
    name : req.file.originalname,
    type : req.file.mimetype,
    size : req.file.size,
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
