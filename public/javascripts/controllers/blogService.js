/**
 * Created by lonso on 14-3-19.
 * liusc@polyvi.com
 */

app.factory('blogService', [ '$http', '$q', function ($http, $q) {
    var blog = {
        //查询企业信息
        all: function () {
            var deferred = $q.defer();
            $http.get('/blog/all')
                .success(function (items, code) {
                    if (code === 200) {
                        deferred.resolve(items);
                    } else {
                        deferred.reject();
                    }
                })
                .error(function (err) {
                    deferred.reject(err)
                });
            return deferred.promise;
        },
        save: function(data) {
            var deferred = $q.defer();
            $http.post('/blog', data).success(function(item, code){
							console.log(item, code)
                if (code === 200) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            }).error(function(err){
                    deferred.reject();
            });
            return deferred.promise;
        }
    };
    return blog;
}]);