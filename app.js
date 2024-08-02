const express = require("express");
const userRouter = require("./server/routes/user-auth")
const port = 3001;
const app = express();
const aws = require('aws-sdk');
const multer = require('multer');
const fs = require('fs');
const multerS3 = require('multer-s3')

app.get("/", (req, res) => {
  res.status(200).send(" hello user")
})

app.listen(port, () => {
  console.log("server is runing on port 3001");
});

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  region: 'eu-west-2',
});
// Configure multer-s3
const upload = multer({ dest: 'uploads/' });
const s3 = new aws.S3();

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('File are required.');
  }

  const fileContent = fs.readFileSync(req.file.path);
  const params = {
    Bucket: 'aiaasbucket',
    Key: req.file.filename,
    Body: fileContent,
    ContentType: req.file.mimetype
  };

  s3.upload(params, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });

});


const mongoose = require("mongoose");

// const connection_string = "mongodb+srv://satyasandhyaboffinblocks:satyasandhya@cluster0.fueg6vz.mongodb.net/";

// function connectToDb() {
//   mongoose.connect(connection_string);

//   mongoose.connection.on("connected", () => {
//     console.log("Connection to MongoDB successful");
//   });

//   mongoose.connection.on("error", () => {
//     console.log("An error occured");
//   });
// };

// connectToDb();
//Body parser middleware
app.use(express.json());

// Routes
app.use("/", userRouter);