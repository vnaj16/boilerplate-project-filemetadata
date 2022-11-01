var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer  = require('multer')
const upload = multer({ dest: './uploads/' })
let bodyParser = require('body-parser')

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), function (req, res){
  console.log(req)
  console.log("---------RES---------")
  console.log(req.file, req.body)
  let response = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  } 

  console.log("Response", response)
  res.json(response)
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
