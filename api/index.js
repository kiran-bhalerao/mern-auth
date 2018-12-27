const User = require('../models/user')
const getHash = require('../utils/getHash')
const genToken = require('../utils/genToken')
const bcrypt = require('bcryptjs')

module.exports = (app, passport) => {

  // protected route
  app.post(
    '/api/protected',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.send(req.user)
    }
  )

  // Signin user route
  app.post('/api/signin', async (req, res) => {
    let { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      res.end({ success: false, message: "User doesn't exists." })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.end({ success: false, message: "Password doesn't match." })
    }

    res.send({
      success: true,
      message: 'User Login successfully.',
      token: genToken(user)
    })
  })

  // Signup user route
  app.post('/api/signup', async (req, res) => {
    let { email, password, username } = req.body

    const userExist = await User.find({ email })

    if (userExist.length) {
      res.end({ success: false, message: 'Email already exists.' })
    }
    const hashPassword = await getHash(password)

    new User({ email, password: hashPassword, username })
      .save()
      .then(user => {
        res.send({
          success: true,
          message: 'User registered.',
          token: genToken(user)
        })
      })
      .catch(err => res.send({ success: false, message: 'Server error.' }))
    //
  })
}
