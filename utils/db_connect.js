const mongoose = require("mongoose")
module.exports = (app, PORT) => {
  mongoose
    .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => {
      app.listen(PORT, () => console.log(`Server started at ${PORT}`))
    })
    .catch(err => {
      console.log(err.message)
    })
}
