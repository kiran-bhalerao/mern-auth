const bcrypt = require("bcryptjs")

module.exports = password => {
  return bcrypt.hash(password, 10)
}
