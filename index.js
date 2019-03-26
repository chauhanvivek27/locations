const koa = require('koa');
const router = require('./src/router');
const http = require('http');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const app = new koa();

app.use(router.routes());
const port =  process.env.PORT || process.env.npm_package_config_port || 3000;
console.log('process.env.npm_package_config_port')
console.log(port)
app.listen(port);

