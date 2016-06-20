var https = require("https"),
  zlib = require("zlib");

// EmailService.js - in api/services
module.exports = {
    httpsGET : function(options,callback) {
         
        // Start the request
       
        https.get(options, function(response) {
            
              
             var chunks = [];
            //response.pipe(gunzip);
             response.on('data', function (chunk) {
                chunks.push(chunk);
              });

              response.on('end', function () {
                   var buffer = Buffer.concat(chunks);
                  var encoding = response.headers['content-encoding'];
                  if (encoding == 'gzip') {
                    zlib.gunzip(buffer, function(err, decoded) {
                      callback(decoded && decoded.toString());
                    });
                  } else if (encoding == 'deflate') {
                    zlib.inflate(buffer, function(err, decoded) {
                      callback(decoded && decoded.toString());
                    })
                  } else {
                    
                    callback(buffer.toString());
                  }
                  
                // your code here if you want to use the results !
              });
              

        }).on('error', function(e) {
            console.error(e);
            callback(null);
        });;

    }   

};