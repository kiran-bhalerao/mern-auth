const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const passport = require('passport')

const app = express()
const PORT = process.env.PORT || 3000

// CORS MIDDLEWARE
app.use(cors())

// BODY-PARSER MIDDLEWARE
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// PASSPORT MIDDLEWARE
app.use(passport.initialize())

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`)
})

require('./api')(app, passport)
require('./utils/db_connect')(app, PORT)
require('./utils/passport_strategy')(passport)
