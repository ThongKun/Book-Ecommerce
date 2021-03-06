const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan') //logger middleware
const bodyParder = require('body-parser') //body parser middleware
const cookieParser = require('cookie-parser')
require('dotenv').config();

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const app = express()

// SECTION DATABASE
mongoose.connect(
    process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)

var db = mongoose.connection;

db.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})
db.once('open', () => {
    //we're connected
    console.log('DB connected')
})


// SECTION Middlewares 
app.use(morgan('dev'))
app.use(bodyParder.json())
app.use(cookieParser())
// SECTION Routes middleware
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)


const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port  ${port}`)
})