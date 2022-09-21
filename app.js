const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authUsers = require("./routes/authUserRoutes");
const users = require("./routes/userRoutes ");
const subCategory = require("./routes/subCategoryRoutes");
const category = require("./routes/categoryRoutes");
const brand = require("./routes/brandRoutes");
const product = require("./routes/productRoutes");

const express = require("express");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("images"));
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/api/authUsers", authUsers);
app.use("/api/users", users);
app.use("/api/subCategory", subCategory);
app.use("/api/category", category);
app.use("/api/brands", brand);
app.use("/api/products", product);

app.all("*", (req, res, next) => {
  const err = new Error(`can't find this route ${req.originalUrl}`);
  next(err);
});

mongoose
  .connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected is done ");
    const port = process.env.PORT || 3030;
    app.listen(port, () =>
      console.log(`Listening on port http://localhost:${port} ...`)
    );
  })
  .catch((err) => {
    console.log("something is wrong .. ", err);
  });

// global error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json({ error: err.message });
});

process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection Errors:${err}`);
  process.exit(1);
});
// app.use('/api/forgetPassword', forgetPassword);
