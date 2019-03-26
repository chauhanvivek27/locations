const request = require('request');
const got = require('got');
const GEO_CODE_AUTH_KEY = process.env.GEO_CODE_AUTH_KEY || '16590574076259517357x1993';
const GEO_CODE_URL = process.env.GEO_CODE_URL || 'http://geocode.xyz/?locate=';
const CITIES_API_URL = process.env.CITIES_API_URL || 'http://www.metaweather.com/api/location/search/?lattlong=';
const WEATHER_API_URL = process.env.WEATHER_API_URL || 'http://www.metaweather.com/api/location/';
const WATER_API_KEY = process.env.WATER_API_KEY  || 'yxJ4UAZNq3T-jYpjLY_A'
const WATER_API_URL  = process.env.WEATHER_API_URL || 'https://api.onwater.io/api/v1/results/{latitude,longitude}?access_token={your_token}'


async function Getcity(data){   
    const { longt , latt  } = data;    
   let cityList = await GetnearCity(longt, latt);  
   //for each loop
   var city = [];
   cityList.forEach(element => {
       city.push(element.title);       
   });   

   var woeid = cityList.map(woeid=>woeid.woeid);    
   let w_forcast = await Weather4cast(woeid);  
   console.log(w_forcast);
   const final_obj = await GetWaterDetails(w_forcast)
  // console.log(`final_obj  ${JSON.stringify(final_obj)}`);
}


async function GetWaterDetails(forcast) {
    return Promise.all(forcast.map(async Ids => {
        console.log(Ids.weather_forcast.latt_long)
        var options = {
            url: `${WATER_API_URL}`.replace('{latitude,longitude}',Ids.weather_forcast.latt_long).replace('{your_token}', WATER_API_KEY),
            headers: {
                'User-Agent': 'request'    
            }
        }
    let water_d = await new Promise(function(resolve,reject){
           request(options, function(err,response,body){
               if(err){
                   reject(err);
               } else {
                   resolve(JSON.parse(body));
               }
           })
        });      

       var obj_assign  = Object.assign({},Ids,water_d);
       console.log('obj_assign' + obj_assign);
       return obj_assign;        
     })).then((data)=>{
         console.log('data');
         console.log(data);
        return data;
     });
     
}

async function Weather4cast(woeid) {  
   return Promise.all(woeid.map(async wid=> {  
        var objweather = {};                    
        let w_details = await GetweatherBywoeid(wid);
        objweather.woeid = wid;
        objweather.weather_forcast = w_details;              
        return objweather;                        
    }));  
}

const GetweatherBywoeid = (woeid) => {   
    console.log("calling get weather");
    var options = {
        url: `${WEATHER_API_URL}${woeid}/`,
        headers: {
            'User-Agent': 'request'
        }
    };      
    return new Promise(function(resolve , reject){
        request(options,function(err,response,body){
            if(err){
                reject(err)
            }else{                           
                resolve(JSON.parse(body));
            }

        })
    })
}

// const weatherDetails_got = async (longt, latt) =>{
//     const WEATHER_result =  got(WEATHER_API_URL)
//     console.log('body_1');
//     console.log(WEATHER_result);

// }

const GetnearCity = (longt,latt) => {
    console.log(longt,latt);
    var options = {
        url: `${CITIES_API_URL}${latt},${longt}`,
        headers: {
            'User-Agent': 'request'
        }
    };    
    //const location_wheather_info = await request_1(url);
    return new Promise(function(resolve,reject){
        request(options, function(err, response ,body){
            if(err) { 
                reject(err);
            }
            else {             
                   
                resolve(JSON.parse(body));
            }
        })    
    })
   
}

function Geoapiacccesspromise(location){    
    var options = {
        url: `${GEO_CODE_URL}${location}&json=1&auth=${GEO_CODE_AUTH_KEY}`,
        headers: {
            'User-Agent': 'request'
        }
    };
    let p = new Promise(function(resolve, reject){
        request(options, function(err, response,body){
            if(err) { 
                reject(err); 
            }
            else {                
                resolve(JSON.parse(body));
            }
        });
    })
    
    p.then(function (result){
        Getcity(result);
    })    
}

function request_url(location){
let url = `${GEO_CODE_URL}${location}&json=1&auth=${GEO_CODE_AUTH_KEY}`
request(url, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
}

// const weatherDetails = async function(longt,latt) {
//     console.log(longt,latt);
//     let url = `https://www.metaweather.com/api/location/search/?lattlong=${latt},${longt}`
//     const location_wheather_info = await request_1(url);
//     console.log(location_wheather_info);
//     // request(url).then(function (reps) {
//     //        console.log(JSON.stringify(reps));
//     // }).catch(function (err){
//     //     console.log(err);
//     // });
// }

module.exports = {
    // Geoapiacccess :  function(location) {
    //     let url = `http://geocode.xyz/?locate=${location}&json=1&auth=${GEO_CODE_AUTH_KEY}`
    //   request(url).then(function (reps) {
    //     getClosecity(JSON.parse(reps));
    //     }).catch(function (err) {
    //         console.log(err);
    //     });
    // } ,
   Geoapiacccesspromise,
   request_url   
}
