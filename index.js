const customExpress = require('./config/customExpress')
app = customExpress()
app.listen(3000, () => console.log('Server running.'))