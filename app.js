/**
 * Created by lonso on 14-3-18.
 * liusc@polyvi.com
 */
var koa = require('koa')
    , app = koa()
    , router = require('koa-router')
    , routes = require('./routes/web.js')
    , views = require('koa-views')
    , staticServer = require('koa-static');

// logger

app.use(views('./views', 'jade'));
app.use(staticServer(__dirname + '/public'));
app.use(router(app));
routes(app);
function *show(id) {
    console.log(id)
}

app.listen(3000);