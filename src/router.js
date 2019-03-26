const koaRouter = require('koa-router');
const router = new koaRouter();
const api = require('./api');
const {
    getGeoLocation,
    getNearCities,
    getWeather,
    getWater

} = require('./api-axios');
const api_promise = require('./api-promise');

router.get("search","/search",async (ctx)=> {
    const { q }  = ctx.query;    
    let geolocation = await getGeoLocation(q);     
    let nearcities = await getNearCities(geolocation.latt ,geolocation.longt)
    var arrWeather = [];
    await Promise.all(nearcities.map(async (cities)=> {        
        arrWeather.push(await getWeather(cities.woeid));       
    }));
    
    let waterDetails = await Promise.all(arrWeather.map(async(cities)=> {
        let getWaterDetails = await getWater(cities.latt_long);
        let obj_assign = Object.assign({},cities,getWaterDetails)        
        return  obj_assign;
    }));
    ctx.body = JSON.stringify(waterDetails);     
});

module.exports = router ;