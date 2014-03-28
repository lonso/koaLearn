/**
 * Created by lonso on 14-3-19.
 * liusc@polyvi.com
 */

var parse = require('co-body');
var db = require('../model/db').db;
var thunkify = require('thunkify');

db.bind('blogs');

exports.index = function *() {
	yield this.render('index');
};

exports.new = function *() {
	yield  this.render('blogNew');
};

exports.list = function *() {
	yield  this.render('blogList');
};

function saveFun(data, cb) {
		db.blogs.insert(data, {safe: true}, function (err, o) {
			cb(err, o);
		})
}

var save = thunkify(saveFun);
function items() {
	return function (fn) {
		db.blogs.find().toArray(function (err, results) {
			fn(err, results);
		})
	}
}

function findOne(id) {
	return function (fn) {
		db.blogs.findOne({_id: id}, fn)
	}
}


exports.create = function *() {
	var body = yield parse.json(this);
	this.body = yield save(body);
};

exports.blogList = function *() {
	this.body = yield items();
};

exports.read = function *() {
	var blog = yield findOne();
	console.log(blog);
};
