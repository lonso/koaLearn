/**
 * Created by lonso on 14-3-19.
 * liusc@polyvi.com
 */



var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/koaLearn", {native_parser: true});
var toObjectID = mongo.ObjectID;


exports.db = db;
exports.toObjectID = toObjectID;