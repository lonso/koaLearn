/**
 * Created by lonso on 14-3-19.
 * liusc@polyvi.com
 */



app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/blog/new', {
			templateUrl: '/blog/new'
		})
		.when('/blog/:id', {
			templateUrl: function (params) {
				return '/blog/' + params.id
			}
		})
		.when('/', {
			templateUrl: '/blog/list'
		})
}]);


app.controller('blogController', ['$scope', 'blogService', '$location' , '$upload',
	function ($scope, blogService, $location, $upload) {
		$scope.blog = {};
		$scope.submit = function () {
			if (!$scope.blog.image) {
				alert('请输入完整内容');
				return;
			} else {
				blogService.save($scope.blog).then(function () {
					alert('成功');
					$location.path('/');
				}, function () {
					alert('失败');
				})
			}
		};

		$scope.init = function () {
			blogService.all().then(function (items) {
				$scope.blogList = items;
			}, function () {
				alert('失败')
			})
		};

		$scope.onFileSelect = function ($files) {
			for (var i = 0; i < $files.length; i++) {
				$scope.blog.image = $files[i];
			}
		}

	}]);

