
const mockLocation = require('../mock/location');

function getMock(url, opts) {
  return new Promise((resolve, reject)=> {
    console.log('calling mock');
    const response = {
     body: mockLocation
   }
   resolve(response)
});
}

describe('Location test case',()=>{
  beforeEach(() => {
    jest.resetModules()
  })

  test('Geo coordinate for london location should be',async ()=>{
    jest.setMock('got', getMock);
    const { getGeoLocation } = require('./api-axios');
    const coordinate = await getGeoLocation('london');    
    expect(coordinate.latt).toBe('52')
    expect(coordinate.longt).toBe('-0.11352')
   
});
  
test('Geo response form service on location', async()=>{
      const { getGeoLocation } = require('./api-axios');
       const resposne = await getGeoLocation('london');
       expect(resposne).toBeDefined();
    });
});


