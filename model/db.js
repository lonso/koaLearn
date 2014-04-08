/**
 * Created by lonso on 14-3-19.
 * liusc@polyvi.com
 */



//var mongo = require('mongoskin');
//var db = mongo.db("mongodb://localhost:27017/koaLearn", {native_parser: true});
//var toObjectID = mongo.ObjectID;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://localhost:27017/koaLearn');

var blogSchema = new Schema({
	title:  {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	filePath: {
		type: String,
		required: true
	}
});


var blogModel = db.model('blog', blogSchema);

exports.blogSchema = blogSchema;
exports.blogModel = blogModel;