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

var debug = require('debug')('koa');
var passport = require('koa-passport');
var LocalStrategy = require('passport-local').Strategy;




debug('stat..........');
// logger

app.on('error', function*(err, ctx){
	console.error('server error');
});


//passport.serializeUser(function(user, done) {
//	done(null, user.id);
//});
//
//passport.deserializeUser(function(id, done) {
//	User.get(id, function (err, user) {
//		done(err, user);
//	});
//});
//
//passport.use(new LocalStrategy(
//	function (username, password, done) {
//		process.nextTick(function () {
//			console.log(username);
////			User.find({username: username}).all(function (err, users) {
////				if (err) {
////					return done(err);
////				} else if (users.length === 0) {
////					return done(null, false, { message: '未知用户名:' + username });
////				} else if (users[0].password !== crypto.createHash('md5').update(password).digest('hex')) {
////					return done(null, false, { message: '密码错误.' });
////				}
////				else return done(null, users[0]);
////			});
//		});
//	}
//));

app.use(views('./views', 'jade'));
app.use(staticServer(__dirname + '/public'));
//app.use(passport.initialize());
//app.use(passport.session());
app.use(router(app));
routes(app);
app.listen(3000);