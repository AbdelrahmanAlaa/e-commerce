const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv')
require('dotenv').config()

const app = express();
  const dbConnection = ()=>{
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
    )
  })
  .catch((err) => {
    console.log("something is wrong .. ", err);
  });

}
module.exports = dbConnection

