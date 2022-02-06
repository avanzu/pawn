module.exports = (app) => {
    app.use('/health', (req, res) => res.send('OK'))
}
