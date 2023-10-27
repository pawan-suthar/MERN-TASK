const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = 3000
const ProductRoute = require('./router/ProductRoutes.js');
app.use(bodyParser.json())
app.use(cors())

//db
try {
  mongoose.connect('ADD YOUR MONGOATLAS DB LINK', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('db connected');
    })
    .catch((error) => {
      console.error('Error connecting to the db:', error);
    });
} catch (error) {
  console.log(error);
}


app.get("/", (req, res) => {
  res.json({ msg: "hello from server" })
})


//middlewares
app.use("/api/", ProductRoute)


//listening
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
});
