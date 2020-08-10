const {serverMapping} = require("../config/config");

const  matchURL = {
    /**
     * @name isOurResourceServer
     * @description check this request is for any of our ResourceServer
     * @param urlPath contain the incoming URL 
     */
    isOurResourceServer: (urlPath) => {
        try {
            const serverList = Object.keys(serverMapping);
            let resourceServer = urlPath.split(/\/(.+)/)[1].split(/\/(.+)/);
            const index = serverList.indexOf(resourceServer[0]);
            const available = index >= 0? true: false;
            let newPath = "/"+resourceServer[1];
            if(urlPath.includes("?")) {
                newPath = `${newPath}&`;
            } else {
                newPath = `${newPath}?`
            }
            return {status: available, remainingPath: newPath, serverInfo: serverMapping[resourceServer[0]]};
        } catch (error) {
            throw error;
        }
    }};

module.exports = matchURL;