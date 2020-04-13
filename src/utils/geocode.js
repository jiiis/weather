const request = require('request');

module.exports = geocode;

function geocode(address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiamlpaXMiLCJhIjoiY2s4dm55eDQyMDZ4czNrcGp6N2FpcTJ6cCJ9.q5NEXrwGOL9examzpXWbqA`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service.');
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.')
    } else {
      const feature = body.features[0];

      callback(
        undefined,
        {
          longitude: feature.center[0],
          latitude: feature.center[1],
          location: feature.place_name
        });
    }
  });
}
