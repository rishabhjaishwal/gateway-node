
const httpService = require("../helpers/promisifyhttp");
const { serverMapping} = require("../config/config");
const { CustomError } = require("../helpers/error");

async function authorizeUser(request) {
    try {
        let body = {['x-access-token']: request.headers['x-access-token']};
     let result = await httpService.request(serverMapping["authService"],request);
     console.log(result);
     return result;
    } catch (error) {
       throw new CustomError(500, error);
    }
}

module.exports = authorizeUser;