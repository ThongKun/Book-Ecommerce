const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
// import routes
const userRoutes = require('./routes/user')
// SECTION app
const app = express()

// SECTION db 
mongoose.connect(
    process.env.DATABASE,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)

var db = mongoose.connection;

db.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})
db.once('open', () => {
    //we're connected
    console.log('DB connected')
})


// SECTION routes middleware
app.use("/api",userRoutes)



const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port  ${port}`)
})

