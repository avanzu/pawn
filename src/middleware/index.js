// eslint-disable-next-line no-unused-vars
const health = require('./health')
module.exports = function (app) {
    app.configure(health)
}
