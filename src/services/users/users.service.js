// Initializes the `users` service on path `/users`
const { Service } = require('feathers-memory')
const hooks = require('./users.hooks')
const users = require('../../../fixtures/users.json')
const logger = require('../../logger')

module.exports = function (app) {
    const options = {
        paginate: app.get('paginate'),
    }

    // Initialize our service with any options it requires
    app.use('/users', new Service(options, app))

    // Get our initialized service so that we can register hooks
    const service = app.service('users')

    service.hooks(hooks)

    Promise.all(users.map((user) => service.create(user))).then((stored) => {
        logger.info(
            'Users loaded',
            stored.map(({ username, email }) => ({ username, email }))
        )
    })
}
