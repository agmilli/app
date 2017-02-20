
var app=angular.module('app',['ngRoute']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/main',{ //首页
		templateUrl:'./tpl/main.html',
		cotroller:'mainCtr'
	})
	.when('/vlist',{//视频
		templateUrl:'./tpl/vlist.html',
		controller:'videoCtr'
	})
	.when('/music',{//观点
		templateUrl:'./tpl/music.html',
		controller:'musicCtr'
	})
	.when('/tianqi',{//天气
		templateUrl:'./tpl/tianqi.html',
		controller:'rankCtr'
	})
	.when('/article/:id',{//文章
		templateUrl:'./tpl/article.html',
		controller:'arCtr'
	})
	.when('/play/:id',{//视频播放
		templateUrl:'./tpl/play.html',
		controller:'playCtr'
	})
	.otherwise({redirectTo:'/main'});

}]);
//用$sce服务来过滤HTML标签
app.filter('trustHtml', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(input);
        }
    });
//$http的get方法第二个形参接受第一个对象，该对象的cache字段可以接受一个bool类型实现缓存，也是可以接受一个服务
app.service('service1',function($http,$rootScope){
	this.getDate=function(){
		
		return $http.get($rootScope.url,{cache:true});
	}		

})
//加载更多首页
app.service('service2',function($http,$rootScope){
	this.getDate=function(){		
		return $http.get($rootScope.abc,{cache:true});
	}		

})
//加载更多视频
app.service('service3',function($http,$rootScope){
	this.getDate=function(){		
		return $http.get($rootScope.vedio,{cache:true});
	}		

})
/*首页*/
app.controller('mainCtr',['$scope','$rootScope','$compile','service1','service2',function($scope,$rootScope,$compile,service1,service2){
	$rootScope.url='http://news-at.zhihu.com/api/4/news/latest';
	//alert($rootScope.id);
	var fff=true;
	$rootScope.d=new Date().getTime();
	service1.getDate().then(function(d){
		$rootScope.ri=d.data.date;
		$rootScope.data=d.data.stories;
		console.log($rootScope.sri)
		//点击加载
		var fff=true;
		var sss=1;
		//angular.element(document).on('scroll',function(){
		angular.element('.more').on('Tag click',function(){
				//$(document).height()=$(document).scrollTop()+$(window).height();
				//$rootScope.hhhh=$(document).scrollTop()+$(window).height()-$('footer').outerHeight();
				//$rootScope.more=$('.more').position().top+$('.more').outerHeight();
				//console.log($scope.hhhh+'   '+$scope.more)
				//if($rootScope.hhhh>$rootScope.more){
					if(fff){
						fff=false;						
						$rootScope.dd=$rootScope.d-1000*60*60*24*sss;
						$rootScope.ddd=new Date($rootScope.dd);
						$rootScope.ddy=$rootScope.ddd.getFullYear();//
						$rootScope.ddm=$rootScope.ddd.getMonth()+1;//月数
						if($rootScope.ddm<10){
							$rootScope.ddm='0'+$rootScope.ddm;
						}
						$rootScope.dds=$rootScope.ddd.getDate();//日数
						console.log($rootScope.dds)
						if($rootScope.dds<10){
							$rootScope.dds='0'+$rootScope.dds;
						}
						console.log($rootScope.sri+'  '+$rootScope.ddy+$rootScope.ddm+$rootScope.dds);
						$rootScope.url='http://news-at.zhihu.com/api/4/news/before/'+$rootScope.ddy+$rootScope.ddm+$rootScope.dds;//要用全局变量
						service1.getDate().then(function(d){
							$rootScope.sri=d.data.date;
							$rootScope.sdata=d.data.stories;
							//$rootScope.str=$compile('<div class="listBox" ng-repeat="d in sdata"> <a href="#/article/{{d.id}}"> <div class="listImg"> <img class="img" src="{{d.images[0]}}" alt=""> </div> <div class="list"> <p> <strong>{{d.title}}</strong><b>{{ddy}}-{{ddm}}-{{dds}}</b> </p> </div> </a> </div>')($scope);
							console.log(d.data.date+'   '+$rootScope.url)
							angular.forEach($scope.sdata,function(obj,index){
								$rootScope.str='<div class="listBox" "> <a href="#/article/'+$rootScope.sdata[index].id+'"> <div class="listImg"> <img class="img" src="'+$rootScope.sdata[index].images[0]+'" alt=""> </div> <div class="list"> <p> <strong>'+$rootScope.sdata[index].title+'</strong><b>'+$rootScope.ddy+'-'+$rootScope.ddm+'-'+$rootScope.dds+'</b> </p> </div> </a> </div>';
								angular.element('#main_index').append($rootScope.str);
								
							})
							fff=true;
							sss++;;
						});
					}else{
						console.log("请等待数据加载...");
						setTimeout(2000);
						console.log("数据请求失败，请重新请求");
						return;
					}
//				}

		});
		
	});
}])
/*視頻*/
app.controller('videoCtr',['$scope','$rootScope','$compile','service1','service3',function($scope,$rootScope,$compile,service1,service3){
	$scope.title='热门视频';
//	$rootScope.url='http://www.tudou.com/tvp/getMultiTvcCodeByAreaCode.action?type=3&app=4&codes=Lqfme5hSolM&areaCode=320500&jsoncallback=__TVP_getMultiTvcCodeByAreaCode';//火影视频
	var i=1;
	$rootScope.url='http://apps.game.qq.com/lol/act/website2013/video.php?page=1i&r=0.884398277848959&_=1484646506003'//lol
	service1.getDate().then(function(d){
		var p=d.data;
		var b=p.substr(14);
		var c=b.substring(0,b.length - 1)
		var f=JSON.parse(c);
		$scope.videoList=f.msg.result;
		var fff=true;
		//点击加载视频
//		angular.element(document).on('scroll',function(){
//			console.log(1)s
//		})
			$scope.ngclick2=function(){
				if(fff){
					fff=false;
					i++;
					$rootScope.url='http://apps.game.qq.com/lol/act/website2013/video.php?page='+i+'i&r=0.884398277848959&_=1484646506003'//lol
					service1.getDate().then(function(d){
						if(d.status){
							var p=d.data;
							var b=p.substr(14);
							var c=b.substring(0,b.length - 1)
							var f=JSON.parse(c);
							$scope.svideoList=f.msg.result;
							console.log(+'   '+$rootScope.url);
							//var vee=$compile('<li ng-repeat="d in svideoList"> <a href="#/play/{{d.id}}"> <div class="imgBox"> <img class="img" src="{{d.thumb}}" alt="{{d.title}}"> </div> <p>{{d.title}}</p> </a> </li>')($scope);
							angular.forEach($scope.svideoList,function(obj,index){
								var vee='<li> <a href="#/play/'+$scope.svideoList[index].id+'"> <div class="imgBox"> <img class="img" src="'+$scope.svideoList[index].thumb+'" alt="'+$scope.svideoList[index].title+'"> </div> <p>'+$scope.svideoList[index].title+'</p> </a> </li>'
								angular.element('.m-video-ul').append(vee);
								fff=true;
							})
						}else{
							console.log("请等待数据加载...");
							setTimeout(2000);
							console.log("数据请求失败，请重新请求");
						}	
					});	
				}
			}
	});
	
}])
/* 音乐 */
app.controller('musicCtr',['$scope','$rootScope','service1','$http','$compile',function($scope,$rootScope,service1,$http,$compile){
	$scope.title='轻松一刻';
	var page_i=1;
	//开始加载
	$http.get("json/music.json").success(function(data){
		for(var i=0;i<data.data.length;i++){
				var index=Number(i)+1;
//				var a=data.data[i].music;
//				var b=a.substring(0,a.length - 4);
				//var mu=encodeURI(data.data[i].music);
				var mu=data.data[i].url;
				var str='<li class="active" src="music/'+mu+'" alt=""> <i>'+index+'</i><span>'+data.data[i].author+' - '+data.data[i].music+'</span><b></b> </li>';
				angular.element('.m-music-hd').append(str);
				console.log(angular.element('.m-music-hd li').attr('src')+mu)
		}
		musicfn();//歌曲切换;s
	});
	
	//查询搜索
	document.onkeyup=function(){
		keyword=$('.inp_music').val();
		if(keyword.length==0){
			return;
		}else{
			$('.m-music-hd').html('');
			//$rootScope.url='http://mobilecdn.kugou.com/api/v3/search/song?iscorrect=1&keyword='+$('.inp_music').val()+'&page=1&pagesize=9';//酷狗'+keyword+'
			$rootScope.url='http://music.weiqianlong.com/list.php?_token=84b45ad88a5e8aba2fabe06d95ff3878&keyword='+keyword+'&page='+page_i+'&rand'//qq '+keyword+'
			service1.getDate().then(function(d){
				console.log(d.data.data.songs[0].singer[0].name+''+$rootScope.url+'    '+d.status);
				if(d.status){
					$scope.data=d.data.data.songs;
					for(var i=0;i<$scope.data.length;i++){
						var index=Number(i)+1;
						var surl='http://ws.stream.qqmusic.qq.com/'+$scope.data[i].songid+'.m4a?fromtag=46';
						var str='<li class="active" src='+surl+' alt=""> <i>'+index+'</i><span>'+$scope.data[i].singer[0].name+' - '+$scope.data[i].songname+'</span><b></b> </li>';
						angular.element('.m-music-hd').append(str);
						$('.pages>.pagination').html(d.data.pageinfo);
					}
					musicfn();//歌曲切换
					pages();//分页
				}else{
					alert("数据请求失败，请重新请求");
					setTimeout(2000);
				}
			});
		}
	}
	//分页
	function pages(){
		$('.pages>.pagination>li').on('click', function(){
		    $('.m-music-hd').html('');
		    page_i = $(this).attr('data-page');
		    $rootScope.url='http://music.weiqianlong.com/list.php?_token=84b45ad88a5e8aba2fabe06d95ff3878&keyword='+keyword+'&page='+page_i+'&rand';
		   // console.log($rootScope.url+''+page_i);
		    service1.getDate().then(function(d){
				$scope.data=d.data.data.songs;
				for(var i=0;i<$scope.data.length;i++){
					var index=Number(i)+1;
					var surl='http://ws.stream.qqmusic.qq.com/'+$scope.data[i].songid+'.m4a?fromtag=46';
					var str='<li class="active" src='+surl+' alt=""> <i>'+index+'</i><span>'+$scope.data[i].singer[0].name+' - '+$scope.data[i].songname+'</span><b></b> </li>';
					angular.element('.m-music-hd').append(str);
					$('.pages>.pagination').html(d.data.pageinfo);
				}
				musicfn(keyword);//歌曲切换
				pages();//分页
			});
	    })
	}
	//歌曲切换
		function musicfn(){
			var Music = $("#audio")[0];//var Music = document.getElementById('aduio');
			$('.m-music-hd li').on('click Tag',function(){
				src=$(this).attr('src');
				if(Music.paused){	
					$(this).siblings().find('b').removeClass('play');
					$(this).find('b').addClass('play');
					$(this).siblings().find('span').removeClass('active');
					$(this).find('span').addClass('active');
					$('#audio').attr('src',src);
					console.log(Music.duration+' 1 '+src+'   '+Music.startTime)
					Music.play();				
					$(this).addClass('active').siblings().removeClass('active','');
					console.log(Music.duration+' 1 '+src+'   '+Music.startTime)
				}else{
					$(this).siblings().find('b').removeClass('play');
					if($(this).find('b').attr('class')=='play'){
						$(this).find('b').removeClass('play');
						Music.pause();
					}else{			
						$(this).find('b').addClass('play');
						$('#audio').attr('src',src);
						console.log(Music.duration+' 2 '+src+'   '+Music.startTime)
						Music.play();
						$(this).siblings().find('span').removeClass('active');
						$(this).find('span').addClass('active');
						console.log(Music.duration+' 2 '+src+'   '+Music.startTime)
					}
				}
			});
		}
}])
/*天气。。*/
app.controller('rankCtr',['$scope','$rootScope','service1','$http',function($scope,$rootScope,service1,$http){
	$scope.title='今日天气';	
	$http.get("json/weather.json").success(function(data){
		
		var myCity = new BMap.LocalCity();
		myCity.get( function(result){
			var keyword=result.name;
			var c=keyword.substring(0,keyword.length - 1)
			//alert('当前位置'+keyword)
			fn(c);
		   
		}); 
		document.onkeyup=function(){
			keyword=$('.keyword').val();
			fn(keyword);
		}
		function fn(keyword){
				var textid;
				angular.forEach(data.weatherinfo,function(obj,index){
					angular.forEach(data.weatherinfo[index].city,function(obj2,index2){					
						if(data.weatherinfo[index].city[index2].cityname==keyword){
							textid=data.weatherinfo[index].city[index2].cityid;
						}
					})
				})
				if(textid==undefined){
					console.log('没有这个城市')
				}else{
						$rootScope.url='http://www.weather.com.cn/data/cityinfo/'+textid+'.html';
						//$rootScope.url='http://www.weather.com.cn/data/sk/'+textid+'.html';
						//$rootScope.url='http://m.weather.com.cn/data/101010100.html';
						service1.getDate().then(function(d){
							$scope.city=d.data.weatherinfo.city;
							$scope.weather=d.data.weatherinfo.weather;
							$scope.temp1=d.data.weatherinfo.temp1;
							$scope.temp2=d.data.weatherinfo.temp2;
						});
						//console.log(textid+'')//城市编码		
				}
			}
		
	});
    
}]);

/*main页控制器*/
app.controller('arCtr',['$scope','$rootScope','$routeParams','service1',function($scope,$rootScope,$routeParams,service1){
	$rootScope.url='http://news-at.zhihu.com/api/4/news/'+$routeParams.id;
	service1.getDate().then(function(d){
		$scope.ar = d.data;
		$('#arBox').html($scope.ar.body);
		//alert($scope.ar.image_source)
		//alert($scope.ar.title)
//		alert(d.data.body)	
	});
	
}])
/*视频页控制器*/
app.controller('playCtr',['$scope','$rootScope','$routeParams','service1','service3',function($scope,$rootScope,$routeParams,service1,service3){
	//$rootScope.url='http:\/\/lol.qq.com\/m\/act\/a20150319lolapp\/exp_3.htm?iVideoId='+$routeParams.id+'&e_code=lolapp.videolist.'+$routeParams.id;//lol
	$rootScope.url='http://apps.game.qq.com/lol/Go/video/videoInfo?p1='+$routeParams.id+'&type=jsonp&p2=MERGE';
	service1.getDate().then(function(d){
		var p=d.data;
		var b=p.substr(13);
		var f=JSON.parse(b);
		$scope.play = f.msg;
		$rootScope.url='http://v.qq.com/iframe/txp/player.html?vid='+f.msg.vid+'&amp;tiny=0&amp;auto=0';
//		service1.getDate().then(function(d){
//			console.log(d.data)
//		})
		$('iframe').attr('src',$rootScope.url);
		console.log($('iframe').attr('src')+'   '+$rootScope.url+'   '+f.msg+'   '+f.msg.img+'   '+f.msg.vid+'   ');
	})
}])

