const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0e25b28d0ebe8eaef893179d8bbcc96d&query='+ latitude +','+ longitude +'&units=f'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect weather Services!', undefined)
        } else if (body.error) {
            callback('Unable to find locations', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currenty ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out')
        }
    })
}

module.exports = forecast