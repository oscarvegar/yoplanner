var https = require("https");

// EmailService.js - in api/services
module.exports = {
    httpsGET : function(options,calllback) {
         
        // Start the request
       
        https.get(options, function(response) {
            
            var gunzip = require("zlib").createGunzip();
             str = '';
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