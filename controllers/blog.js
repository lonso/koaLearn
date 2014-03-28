/**
 * Created by lonso on 14-3-19.
 * liusc@polyvi.com
 */

var parse = require('co-body');
var mongo = require('../model/db');
var db = mongo.db;
var toObjectID = mongo.toObjectID;
var thunkify = require('thunkify');
var co = require('co');


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
		cb(new Error('miss arg'), o);
	})
}
function getItems(cb) {
		db.blogs.find().toArray(function (err, results) {
			cb(err, results);
		})
}


function findOneFun(id, cb) {
	db.blogs.findOne({_id: id}, function(err, o){
		cb(err, o);
	})
}

var items = thunkify(getItems);
var findOne = thunkify(findOneFun);
var save = thunkify(saveFun);


exports.create = function *() {
	try{
		var body = yield parse.json(this);
		this.body = yield save(body);
	}catch(e) {
		this.status = 500
		return;
	}

};

exports.blogList = function *() {
	this.body = yield items();
};

exports.read = function *() {
	var blog = yield findOne(new toObjectID(this.params.id));
	yield  this.render('blogRead', {
		blog: blog
	});

};