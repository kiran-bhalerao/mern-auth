const jwt = require('jwt-simple')
module.exports = user => {
  return `Bearer ${jwt.encode(user, process.env.JWT_SECRET)}`
}
