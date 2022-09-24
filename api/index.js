const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const userRoute = require("./routes/users");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

const userAuth = require("./routes/auth");
const userPost = require("./routes/posts");

const app = express();
const port = 8800;

const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (logs) => {
    console.log(logs);
  }
);

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
// REACT_APP_PUBLIC_FOLDER="http://localhost:3000/assets/"-> this was the old address
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded Successfully");
  } catch (err) {
    console.log(err);
  }
});
app.get("/", function (request, response) {
  //what will happen if someone made
  // a get request to the home or the root
  //of the server
  // response.send("hello");
  response.send("<h1>hello world</h1>");
});

app.use("/api/users", userRoute);
app.use("/api/auth", userAuth);
app.use("/api/posts", userPost);

app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(port, function () {
  // body...
  console.log("Server Started At port 8800");
});
