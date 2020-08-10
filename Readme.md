# Proxy Server & API Gateway using Core NodeJs 🚀

<b>Proxy Server</b> serves as a hub through which request redirected to many other server which help in hiding resources servers from direct expose.

<b>API Gateway</b> is an API management tool that sits between a client and set of many backend servers. An API Gateway acts as a reverse proxy to accept all (API) request calls, aggregate the various services required to fulfill them, and return the respective response of services.

## Contents

- [How it works](#How-it-works-📖)
- [How to use as proxy server](#How-to-use-as-proxy-server-🖊)
- [How to use as api gateway](#How-to-use-as-api-gateway)

## How it works 📖

This library work on NodeJs core <b>http</b> module which is used for creating http server and also for making request to other backend servers. In that library, Client request is piped to the backend server which also improve the performance compare to other framework based proxy server. And it alo don't have any extra dependency which also decreases the dependency resolve cost. we can also use <b>cluster</b> NodeJs module above this library for getting the best production-ready performance.

## How to use as proxy server 🖊

<p> Using library as Proxy Server</p>

```javascript
const { server, registerRoutes} = require('gateway-node');

// create your server object for redirection
let configDetail = {
    server1: {
        hostname:"www.backend1.com",
        port: 8000
    },
    server2: {
        hostname:"127.0.0.1",
        port: 4000
    },
    server3: {
        hostname:"127.0.0.1",
        port: 3000
    }
};

// Function exposed from library for registering set of backend server
/**
 * @name registerRoutes
 * @description Used for registering servers so, proxy server can forward
 * @param {Object} configDetail [key]: [value]
 * [key] is used for identify the request from prefix first param
 * [value] is used for redirecting based on key found in url prefix
*/
registerRoutes(configDetail);

// Proxy http server port and other details same as http createServer module
server.listen(7000);

};

```

<p>Example Request for above code</p>

```javascript
/**
 Like there is a GET Request for resource server as
 BACKEND_URL: 127.0.0.1:4000/getRecords?start=0&limit=20
 METHOD: GET
 */
    REQUEST_URL: 127.0.0.1:7000/server2/getRecords?start=0&limit=20
    METHOD: GET
/**
 * NOTE- Now you have to request as REQUEST_URL,
 * library automatically check
 * "server2" as key and remove it from REQUEST_URL
 * and create it as BACKEND_URL
 * and then library make a http request
 * and also pipe the header and payload from
 * original request.
 */
```
