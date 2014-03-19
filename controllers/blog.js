/**
 * Created by lonso on 14-3-19.
 * liusc@polyvi.com
 */

var parse = require('co-body')
    , mongo = require('../model/db')
    , db = mongo.db
    , toObjectID = mongo.toObjectID;

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
    var blog = yield findOne(new toObjectID(this.params.id));
    yield  this.render('blogRead', {
        blog: blog
    })

}
