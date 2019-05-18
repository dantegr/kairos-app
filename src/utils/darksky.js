const request = require('request');

const darksky = (latitude , longtitude, callback) => {
  const url = 'https://api.darksky.net/forecast/131c59f4dd9c0c2c3f1bca28f69c250d/'+ encodeURIComponent(latitude) + ','+  encodeURIComponent(longtitude) +'?units=si';

  request({url, json: true}, (error,{body }) => {
    if(error) {
      callback('Unable to connect to weather service',undefined);
    } else if (body.error) {
      callback('Unable to find location',undefined);
    } else {
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + 'C degrees out. There is ' + body.currently.precipProbability +'% chance of rain');
    }
  });

};

module.exports = darksky;