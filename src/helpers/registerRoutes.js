const {serverMapping,AUTHMODE, headerList} = require("../config/config");

const routeExpose = {
    registerRoutes: (routeObj,authMode = AUTHMODE.status) => {
        try {
            if(typeof routeObj == 'object') {
                Object.assign(serverMapping,routeObj);
            } else {
                throw new Error('First argument should be of type object');
            }
            if(typeof authMode == 'boolean') {
                AUTHMODE.status = authMode;
            } else {
                throw new Error('Second argument should be of type boolean');
            }
        } catch (error) {
            throw error.message || error;
        }
    },
    UnRegisterRoutes: () => {
        Object.keys(serverMapping).forEach(key => delete serverMapping[key]);
    },
    changeAuthMode: (value = false) => {
        AUTHMODE.status = value;
    },
    copyHeaderFromClientRequest: async (clientRequest = {},proxiedRequest = {}) => {
        let length = headerList.length;
        for(let i=0; i < length; i++) {
            proxiedRequest[headerList[i]] = clientRequest[headerList[i]] || '';
        }
        return 1;
    },
    copyClientHeader: (headers = []) => {
        if(Array.isArray(headers)) {
            headerList.splice(0,headerList.length);
            headers.forEach(header => headerList.push(header))
        } else {
            throw new Error("Argument should be of type Array");
        }
    }
}
 



module.exports = routeExpose;