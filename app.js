// const { limiter } = require('./middleware/limiter');
const dotenv = require('dotenv')
const mongoose = require('mongoose');;
const cors = require('cors');

const users = require('./routes/userRoutes');
const products = require('./routes/productsRoutes');

dotenv.config({
  path: `${__dirname}/config/.env`,
})

const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());
app.options('*',cors())

app.use('/api/users', users);
app.use('/api/products', products);

// app.use('/api/forgetPassword', forgetPassword);


mongoose.connect(process.env.CONNECT_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected is done ')
        const port = process.env.PORT || 3030;
        const server = app.listen(port, () => console.log(`Listening on port http://localhost:${port} ...`));
    })
    .catch((err) => { console.log('something is wrong .. ', err) });


    



