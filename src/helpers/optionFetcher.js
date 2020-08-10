const { isOurResourceServer} = require("./matchURL");
const { CustomError } = require("./error");
const querystring = require('querystring');
const optionFetcher = {

    getOption: (request, authdata = '') => {
        try {
            const isavailable = isOurResourceServer(request.url);
            if(isavailable.status) {
                let options = {
                    hostname: isavailable.serverInfo.hostname,
                    port: isavailable.serverInfo.port,
                    path: `${isavailable.remainingPath}auth=${querystring.escape(authdata)}`,
                    method: request.method,
                    headers: request.headers
                  };
                  return options;   
            } else {
                throw new CustomError(401,"UnAuthorized Request Error")
            }
        } catch (error) {
            throw error;
        }
    }

};

module.exports = optionFetcher;