const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
var db = require("./config/test-connection");
const path = require('path')
const userRouter = require("./routes/userRoutes");
const pageRouter = require('./routes/updateDataRoutes/pageRoutes');
const HomeRouter = require('./routes/updateDataRoutes/homeRoutes');
const aboutRouter = require('./routes/updateDataRoutes/aboutRoutes');
const serviceRouter = require('./routes/updateDataRoutes/serviceRoutes');
const ResourceRouter= require('./routes/updateDataRoutes/resourceRoutes')
const FaqRouter= require('./routes/updateDataRoutes/faqRoutes')
const testimonialRouter=require('./routes/updateDataRoutes/testimonialRoutes')
// hello this is testing



let app = express();
dotenv.config();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", userRouter,HomeRouter,aboutRouter,serviceRouter,ResourceRouter,testimonialRouter,FaqRouter);
app.get("/",(req,res)=>{
  res.send("hellfffffo")
})
app.use("/api", pageRouter);
app.get("/",(req,res)=>{
  res.send("hellrrrrro")
})

//error handling
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

const port = process.env.PORT;
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
