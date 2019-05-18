const request = require('request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGFudGVnciIsImEiOiJjanZhd2F1ZWowb3lkM3lxbWNwbXBmdW9lIn0.3gVF-ekrnv4XrVRJ4YBUmQ&limit=1';

  request({url, json: true}, (error,{body}) => {
    if(error) {
      callback('Unable to connect to geocoding service',undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find loacation',undefined);
    } else {
      callback(undefined,{
        latitude: body.features[0].center[1],
        longtitude:body.features[0].center[0],
        location:body.features[0].place_name
      });
    }
  });

};

module.exports = geocode;