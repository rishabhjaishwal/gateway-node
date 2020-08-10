var http = require('http');
const routeExpose = require('./helpers/registerRoutes');
const {getOption} = require("./helpers/optionFetcher");
const authorizeUser = require("./middleware/authorizeUser");
const {AUTHMODE} = require("./config/config");
async function onRequest(request, response) {
try {
  let authorizedResponse = {};
  
  if(AUTHMODE.status) {
    authorizedResponse = await authorizeUser(request);

    // apply your auth logic
    if(authorizedResponse.rawData) {
  
    }
  }


  let options = getOption(request,authorizedResponse.rawData);
  var proxy = http.request(options, async function (proxyRes) {
    await routeExpose.copyHeaderFromClientRequest(authorizedResponse.headers, proxyRes.headers);
    response.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(response, {
      end: true
    });

  });
  request.pipe(proxy, {
    end: true
  });

} catch (error) {
  response.writeHead(error.statusCode || 500);
  response.write(error.message);
  response.end();
}

  }

const server=http.createServer(onRequest);


module.exports = {
    server, 
    registerRoutes:routeExpose.registerRoutes,
    UnRegisterRoutes: routeExpose.UnRegisterRoutes,
    changeAuthMode: routeExpose.changeAuthMode,
    copyClientHeader: routeExpose.copyClientHeader
  };