var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors({
  origin: '*'
}));
app.use(express.static('public'));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
