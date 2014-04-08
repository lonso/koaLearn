/**
 * Created by lonso on 14-3-19.
 * liusc@polyvi.com
 */




var db = require('../model/db');
var parse = require('co-body');
var thunkify = require('thunkify');
var co = require('co');
var bParse = require('co-busboy');
var fs = require('fs');
var path = require('path');
var uploadFolder = path.resolve(__dirname, "..", 'upload/')+"/";
var debug = require('debug')('controller:blog');



exports.index = function *() {
	debug('index..............');
	yield this.render('index');
};

exports.new = function *() {
	yield  this.render('blogNew');
};

exports.list = function *() {
	yield  this.render('blogList');
};

function saveFun(data, cb) {
	db.blogModel.create(data, function(err, o){
		cb(err, o);
	})
}
function getItems(cb) {
	db.blogModel.find({}, function(err, blogs){
		cb(err, blogs)
	});
}


function findOneFun(id, cb) {
	db.blogModel.findById(id, function(err, o){
		cb(err, o);
	})
}

var items = thunkify(getItems);
var findOne = thunkify(findOneFun);
var save = thunkify(saveFun);


exports.create = function *() {
	try{
		var parts = bParse(this);
		var part;
		var _obj  = {};
		while (part = yield parts) {
			if (part['fieldname']) {
				var filePath = uploadFolder + Math.random() + part['filename'];
				var stream = fs.createWriteStream(filePath);
				part.pipe(stream);
				_obj['filePath'] = filePath;
			} else {
				_obj[part[0]] = part[1];
			}
		}
		this.body = yield save(_obj);
	}catch(e) {
		this.status = 500
		return;
	}

};

exports.blogList = function *() {
	this.body = yield items();
};

exports.read = function *() {
	var blog = yield findOne(this.params.id);
	yield  this.render('blogRead', {
		blog: blog
	});

};