/**
 * Created by lonso on 14-3-19.
 * liusc@polyvi.com
 */

var parse = require('co-body')
    , db = require('../model/db').db;

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

function save(data){
    return function(fn) {
        db.blogs.insert(data, {safe:true}, function(err, o) {
            fn(err, o);
        })
    }
}

function items() {
    return function(fn) {
        db.blogs.find().toArray(function(err, results){
            fn(err, results);
        })
    }
}

function findOne(id) {
   return function(fn) {
       db.blogs.findOne({_id: id}, fn)
   }
}


exports.create = function *() {
    var body = yield parse.json(this);
    this.body =  yield save(body);
}

exports.blogList = function *(){
    this.body = yield items();
}

exports.read = function *() {
    console.log('read.....')
    console.log(db.getObjectId(this.params.id));
    var blog = yield findOne();
    console.log(blog);
}
