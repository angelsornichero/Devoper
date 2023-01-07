import app from './appConfig.js'
import './database.js'


app.listen(app.get('port'), () => console.log('Listening on port: ', app.get('port')))