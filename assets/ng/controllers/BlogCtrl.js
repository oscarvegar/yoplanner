angular.module('yoplanner.blog',[])
.controller('BlogCtrl',function($scope,$http,$sce,$filter,$stateParams,$state,$timeout){
	
	$scope.init = function(){
		$scope.current = $state.current;
		console.log("STATE NAME >>>>>",$state.current.name)
		console.log("YEAR >>>>>",$stateParams.year)
		console.log("MONTH >>>>>",$stateParams.month)
		console.log("ID >>>>>",$stateParams.id)
		if($state.current.name == 'blogPost'){
			var retry = function(cb){
				$scope.posts = [];
				$http.get('https://www.googleapis.com/blogger/v3/blogs/6838970422906123086/posts/bypath?path=/'+$stateParams.year+"/"+$stateParams.month+"/"+$stateParams.id+'&key=AIzaSyBAg_S0Hde7VaxSVp_mmEB0gOdzCCO756Y')
				.success(function(data){
					var content = data.content;
					var idxImgIni = content.search("<a href=");
					var idxImgExt = content.search(".jpg");
					if(idxImgExt<0)idxImgExt = content.search(".JPG");
					if(idxImgExt<0)idxImgExt = content.search(".png");
					if(idxImgExt<0)idxImgExt = content.search(".PNG");
					if(idxImgExt<0)idxImgExt = content.search(".gif");
					if(idxImgExt<0)idxImgExt = content.search(".GIF");
					data.imagensrc = content.substr(idxImgIni+9,idxImgExt-idxImgIni-5);
					$scope.posts.push(data)
					$timeout(FB.XFBML.parse,250);
					cb(1);	
				}).catch(function(err){
					console.error(err)
					cb(-1)
				})
			}
			retry(function(res){
				if(res<0)retry();
			})
		}else{
			
				$http.get('https://www.googleapis.com/blogger/v3/blogs/6838970422906123086/posts?key=AIzaSyBAg_S0Hde7VaxSVp_mmEB0gOdzCCO756Y')
				.success(function(data){
					console.log("BLOG DATA >>>>> ",data.items);
					$scope.posts = data.items;
					for(var i in $scope.posts){
						var post = $scope.posts[i];
						console.log("'more'",post.content.search("<a name='more'>"))
						if(post.content.search("<a name='more'>")<0){
							post.contentText = post.content;
							post.imagen = "";
							post.limitText = $filter('limitTo')(post.contentText, 450);
							continue;
						}
						post.url = post.url.replace("http://yoplanner.blogspot.com/","");
						post.contentText = post.content.substr(post.content.search("<a name='more'>"))
						post.imagen = post.content.substr(0,post.content.search("<a name='more'>"))
						post.limitText = $filter('limitTo')(post.contentText, 450);
						post.limitText = post.limitText.replace("white","")
						var content = post.content;
						var idxImgIni = content.search("<a href=");
						var idxImgExt = content.search(".jpg");
						if(idxImgExt<0)idxImgExt = content.search(".JPG");
						if(idxImgExt<0)idxImgExt = content.search(".png");
						if(idxImgExt<0)idxImgExt = content.search(".PNG");
						if(idxImgExt<0)idxImgExt = content.search(".gif");
						if(idxImgExt<0)idxImgExt = content.search(".GIF");
						post.imagensrc = content.substr(idxImgIni+9,idxImgExt-idxImgIni-5);
						if(!post.labels)post.labels=[];
						post.resume="";
						for(var i in post.labels){
							if(i==0)
								post.resume=""+post.labels[i];
							else
								post.resume=post.resume+", "+post.labels[i];
						}
					}
					$scope.latestPost = $scope.posts[0];
					console.log("IMAGENSRC >>>>> "+$scope.latestPost.imagensrc)
					
				}).catch(function(err){
					console.error(err)
				})
			
		}
	}
	


	
	$scope.deliberatelyTrustDangerousSnippet = function(data) {
		return $sce.trustAsHtml(data);
	};


	$scope.init();
	
	
})
