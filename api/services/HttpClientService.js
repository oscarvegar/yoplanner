var https = require("https");
var gunzip = require("zlib").createGunzip();

// EmailService.js - in api/services
module.exports = {
    httpsGET : function(options,calllback) {
         
        // Start the request
        str = '';
        https.get(options, function(response) {
            response.pipe(gunzip);
             gunzip.on('data', function (chunk) {
                str += chunk;
              });

              gunzip.on('end', function () {
                  calllback(str);
                // your code here if you want to use the results !
              });

        });

    }   

};