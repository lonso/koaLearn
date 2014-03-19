/**
 * Created by lonso on 14-3-19.
 * liusc@polyvi.com
 */

var blog = require('../controllers/blog.js');

module.exports = routes;
function routes(app) {
    app.get('/', blog.index);
    app.get('/blog/new', blog.new);
    app.get('/blog/list', blog.list);
    app.post('/blog', blog.create);
    app.get('/blog/all', blog.blogList);
    app.get('/blog/:id', blog.read);
}