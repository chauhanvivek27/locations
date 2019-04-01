module.exports = {
    successResponse: (url, opts) => {
        return new Promise((resolve, reject) => {
            const response = {
                "standard": {
                  "addresst": { },
                  "city": "New York",
                  "prov": "US",
                  "countryname": "United States of America",
                  "postal": {},
                  "confidence": "1.0"
                },
                "longt": "-73.97193",
                "alt": {},
                "elevation": {},
                "remaining_credits": "-56",
                "latt": "40.77138"
            };
            resolve(response)
        });
    }
}