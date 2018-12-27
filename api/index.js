const User = require('../models/user')
const getHash = require('../utils/getHash')
const genToken = require('../utils/genToken')
const bcrypt = require('bcryptjs')

module.exports = (app, passport) => {
  // protected route
  app.post(
    '/api/users',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      User.find({})
        .then(users =>
          res.send({
            success: true,
            message: 'List of all users',
            users
          })
        )
        .catch(err =>
          res.status(400).send({ success: false, message: err.message })
        )
    }
  )

  // Signin user route
  app.post('/api/signin', async (req, res) => {
    let { email, password } = req.body

    if (!email || !passport)
      return res
        .status(400)
        .send({ success: false, message: 'Some fields are missing.' })

    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User doesn't exists." })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res
        .status(400)
        .send({ success: false, message: "Password doesn't match." })
    }

    return res.send({
      success: true,
      message: 'User Login successfully.',
      token: genToken(user),
      user: {
        email: user.email,
        username: user.username
      }
    })
  })

  // Signup user route
  app.post('/api/signup', async (req, res) => {
    let { email, password, username } = req.body

    if (!email || !passport || !username)
      return res
        .status(400)
        .send({ success: false, message: 'Some fields are missing.' })

    const userExist = await User.find({ email })

    if (userExist.length) {
      return res
        .status(400)
        .send({ success: false, message: 'Email already exists.' })
    }
    const hashPassword = await getHash(password)

    new User({ email, password: hashPassword, username })
      .save()
      .then(user => {
        return res.send({
          success: true,
          message: 'User registered',
          user: {
            email: user.email,
            username: user.username
          },
          token: genToken(user)
        })
      })
      .catch(err =>
        res.status(400).send({ success: false, message: 'Server error.' })
      )
    //
  })
}
