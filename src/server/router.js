const fs = require('fs');
const path = require('path');

module.exports = function(app){
  let routesDir = path.join(__dirname, 'routes');
  let methods = ['get', 'post', 'put', 'delete'];
  methods.forEach(method => {
    let files = fs.readdirSync(path.join(routesDir, method));
    files.forEach(file => {
      let route = require(path.join(routesDir, method, file));
      app[method](route.path, route.handler);
    })
  })
}