const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const User = require('../models/user')

module.exports = passport => {
  let options = {}
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  options.secretOrKey = process.env.JWT_SECRET
  passport.use(
    new JwtStrategy(options, (payload, done) => {
      User.findOne({ _id: payload._id }, (err, user) => {
        if (err)
         return done(err, false)
        if (user)
         return done(null, user)
        else
         return done(null, false)
      })
    })
  )
}
