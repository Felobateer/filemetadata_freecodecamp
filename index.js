var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  const file = req.file;
  if (!file) {
    return res.json({ error: 'No file uploaded' });
  }
  const fileInfo = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  };

  res.json(fileInfo);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
