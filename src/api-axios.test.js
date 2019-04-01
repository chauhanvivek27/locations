const {
  getGeoLocation

} = require('./api-axios');


const mockLocation = require('../mock/location');
let getMock = () => new Promise((resolve,reject)=> {
     console.log('calling mock');
     const response = {
      body: JSON.stringify(mockLocation)
    }
    resolve(response)
});

describe('Location test case',()=>{
  test('Geo coordinate for london location should be',async ()=>{
    jest.setMock('got',getMock);
    const coordinate = await getGeoLocation('london');
    console.log('coordinate' + coordinate);
    expect(coordinate.latt).toBe('51.51770')
    expect(coordinate.longt).toBe('-0.11352')
   
});

test('Geo response form service on location', async()=>{
       const resposne = await getGeoLocation('london');
       expect(resposne).toBeDefined();
    });
});


