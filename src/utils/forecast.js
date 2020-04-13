const request = require('request');

module.exports = forecast;

function forecast(latitude, longitude, callback) {
  const url = `http://api.weatherstack.com/current?access_key=7deaba4937adef968acd9538c360b3d0&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service.');
    } else if (body.error) {
      callback('Unable to find weather info for the given location. Try another search.')
    } else {
      const current = body.current;

      callback(
        undefined,
        {
          temperature: current.temperature,
          feelsLike: current.feelslike,
          forecast: `The temperature is ${current.temperature} and it feels like ${current.feelslike}.`
        }
      );
    }
  });
}
