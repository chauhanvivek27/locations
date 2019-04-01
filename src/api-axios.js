const _got = require('got');
const GEO_CODE_AUTH_KEY = process.env.GEO_CODE_AUTH_KEY || '16590574076259517357x1993';
const GEO_CODE_URL = process.env.GEO_CODE_URL || 'http://geocode.xyz/?locate=';
const CITIES_API_URL = process.env.CITIES_API_URL || 'http://www.metaweather.com/api/location/search/?lattlong=';
const WEATHER_API_URL = process.env.WEATHER_API_URL || 'http://www.metaweather.com/api/location/';
const WATER_API_KEY = process.env.WATER_API_KEY  || 'yxJ4UAZNq3T-jYpjLY_A'
const WATER_API_URL  = process.env.WEATHER_API_URL || 'https://api.onwater.io/api/v1/results/{latitude,longitude}?access_token={your_token}'

module.exports.getGeoLocation = (async (location) => {  
  const url =  `${GEO_CODE_URL}${location}&json=1&auth=${GEO_CODE_AUTH_KEY}`  
  const result = await _got(url,option = {json : true}).on('error', function(error,body,response){
      console.log(error);
  });
  return result.body;
});

module.exports.getNearCities = (async(latt, longt)=>{    
    const url =  `${CITIES_API_URL}${latt},${longt}`  
    const result = await _got(url,option = {json : true}).on('error', function(error,body,response){
        console.log(error);
    });
    return result.body;
});

module.exports.getWeather = (async(woeid)=>{
  const url =  `${WEATHER_API_URL}${woeid}/`
  const result = await _got(url,option = {json : true}).on('error', function(error,body,response){
    console.log(error);
    })
    return result.body;
});
module.exports.getWater = (async(latt_long)=>{
    const url =  `${WATER_API_URL}`.replace('{latitude,longitude}',latt_long).replace('{your_token}', WATER_API_KEY);
    const result = await _got(url,option = {json : true}).on('error', function(error,body,response){
      console.log(error);
      })
      return result.body;
  });
  

