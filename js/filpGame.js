/*
* 翻一番小游戏
* By CY  2018/01/10
*/

$(function(){
    var  game = new fyfGame();	
})
var timer = null;
var audio1 = document.getElementById('successMusic'); 
var audio2 = document.getElementById('failMusic'); 
;(function($){
	var fyfGame = function(){
		var self = this;
		self.eleBack = null;  // 表示反面
		self.eleFront = null;  // 表示正面
		self.imgGroup = [{
				name  : 1,
				word  : '规模以上工业实现增加值同比增长7.2%',
			},{
				name  : 2,
				word  : '固定资产投资同比增长14.7%' ,
			},{
				name  : 3,
				word  : '社会消费品零售总额同比增长10.1%' ,
			},{
				name  : 4,
				word  : '进出口总额同比增长9.4%' ,
			},{
				name  : 5,
				word  : '财政总收入同比增长16.9%' ,
			},{
				name  : 6,
				word  : '银行存贷款回升' ,
			},{
				name  : 7,
				word  : '居民消费价格指数（CPI）累计上涨1.5%' ,
			},{
				name  : 8,
				word  : '全社会用电量小幅回落' ,
			}
		];
		self.total = 0;
		self.current = []; // 存放当前的数值  用于比较 
		self.errorArr = []; // 存放错误的id 用于样式渲染
		self.rightArr = [];  // 存放正确的id  用于样式渲染
		self.init();
		self.click = false;   // 允许翻牌
		self.close = 1;    // 用来判断是否第一次看游戏规则，第一次看游戏规则会有3秒的计时时间。
		self.flag = true;   // 用于截图
		$(".f36").bind('click',function(){
			if($(this).hasClass('again')){
				// window.location.reload();
				$(".cards").children().remove();
				self.init();
				$(this).removeClass('again').html('开始');
				self.total = 0;
				self.current = []; // 存放当前的数值  用于比较
				self.errorArr = []; // 存放错误的id
				self.rightArr = [];  // 存放正确的id
				self.click = false;
				self.close = 1;
				self.flag = true;
				return;
			}
			// 计时开始
			self.timingBegins();
			self.click = true;
		})
		$(".cards").delegate('.box',"click", function() {
			if(self.click == false || self.click == 'false'){
				return;
			}
			if($(this).attr('data-fyf') == 'false' || $(this).attr('data-fyf') == false){
				return ;
			}
			self.funBackOrFront($(this));
		    self.eleFront.addClass("out").removeClass("in");   // out反面  in正面
		    setTimeout(function() {
		        self.eleBack.addClass("in").removeClass("out");
		        // 重新确定正反元素
		        self.funBackOrFront($(this));
		    }, 100);
		    // 游戏第一步：判断是否相同
		    self.startGame($(this));
		    return false;
		});

		$(".close").bind('click',function(){
			// 关闭弹窗
			$(this).parent(".alert-box").addClass('hide').removeClass('show');
			$(".mask").addClass('hide').removeClass('show');

			var _p = $(this).parent().attr('id');
			if(_p == 'rules'){
				// 如果当前窗口是第一次关闭游戏规则 
				if(self.close == 1){
					// 给3秒看牌
					$(".box").each(function(){
						$(this).find('a').eq(0).removeClass('out').addClass('in');
						$(this).find('a').eq(1).removeClass('in').addClass('out');
					})
					self.countTime();
					self.close ++ ;
				}
			}
			if(_p == 'result'){
				$(".share-bg").removeClass('show').addClass('hide');
				$(".ranking-btn").trigger('click');
			}
		})

		// 查看排行版
		$(".ranking-btn").bind('click',function(){
			self.getRankingLists();
		})

		// 查看游戏规则
		$(".rule-btn").bind('click',function(){
			$(".rules-box,.mask").addClass('show').removeClass('hide');
		})
	}
	fyfGame.prototype = {
		countTime:function(){
			var sec = 3 , ms = 100;		
			timer2 = setInterval(function(){
				showTime2();
			},10)
			function showTime2(){
				ms -- ;
	
			    if(ms==0){
			        sec -- ;
			        ms = 100;
			    }
			    if(sec== 0){
			    	ms = 0;
			       	clearInterval(timer2);
			       	$(".box").each(function(){
						$(this).find('a').eq(1).removeClass('out').addClass('in');
						$(this).find('a').eq(0).removeClass('in').addClass('out');
					})
					$(".wordBox .f36").html('开始');
					return;

			    }
			    var msStr=ms;
			    if(ms<10){
			        msStr="0"+ms;
			    }
			    var secStr=sec;
			    if(sec<10){
			        secStr="0"+sec;
			    }
			    $(".wordBox .f36").html(secStr+":"+msStr);
			}
		},
		startGame:function(element){
			 var self = this;
			 _current = parseInt($(element).attr('id').slice(7));
			 self.current.push(_current);
			 if(self.current.length == 2 ){
			 	if(self.current[0] + self.current[1] == 17 ){
			 		// 正确
			 		self.rightArr.push(_current,17-_current);
			 		self.matchSuccess();
			 		$("#cardNum"+self.rightArr[0]).attr('data-fyf',false);
			        $("#cardNum"+self.rightArr[1]).attr('data-fyf',false);
			 	} else{
			 		self.errorArr.push(self.current[0],self.current[1]);
			 		self.matchFail();
			 	}
			 	self.clear2val(self.current); // 清除数组，以保证2-2比较
			 	// console.log(self.current);
			 }
		},
		matchSuccess:function(){
			// 匹配成功的函数 已经成功的牌  不允许点击
			var self = this;
			self.total += 17;  // 累计达到17*8
			console.log(self.total);
			$("#cardNum"+self.rightArr[0]).find('a').eq(1).removeClass('in').addClass('out');
		    $("#cardNum"+self.rightArr[0]).find('a').eq(0).removeClass('out').addClass('in');
		    $("#cardNum"+self.rightArr[1]).find('a').eq(1).removeClass('in').addClass('out');
		    $("#cardNum"+self.rightArr[1]).find('a').eq(0).removeClass('out').addClass('in');
            $("#cardNum"+self.rightArr[0]).attr('data-fyf',false);
			$("#cardNum"+self.rightArr[1]).attr('data-fyf',false);
			var _index = 0;
			self.rightArr[0] > self.rightArr[1] ? _index = self.rightArr[1]: _index = self.rightArr[0];
			// console.log(self.rightArr[0] , self.rightArr[1],_index);
			self.successResult(_index);
			self.clear2val(self.rightArr);		
			if(self.total == 136){
				// 全部成功
				clearInterval(timer);
				self.saveUserInfo($(".f36").html());
				setTimeout(function(){
					$(".result .time").html($(".f36").html())
					$(".result,.mask").addClass('show').removeClass('hide');
					self.failResult();
					$(".f36").addClass('again').html('再玩一次');
				},500);
			}
		},
		saveUserInfo:function(time){
			console.log('用户用时'+time);
			// ajax方法
		},
		clear2val:function(arr){
			var self = this;
			var removed = arr.splice(0,2);
			self.arr = arr;
		},
		successResult:function(index){
			// 成功的表现
			
			var self = this;
			// 成功的音乐
			if(audio1 !== null){
				audio1.currentTime = 0;
				audio1.play();// 播放 
			}
			// 成功的文字
			var _class = 'icon'+index+'   icon';
			$(".wordBox .icon").removeClass().addClass(_class);
			$(".wordBox .f36").hide();
			$(".wordBox .word").show().html(self.imgGroup[index-1].word);
		},
		matchFail:function(element){
			// 匹配失败的函数
			//失败的音乐
			 
			if(audio2 !== null){
				audio2.currentTime = 0;
				audio2.play();// 播放 
			}
			var self = this;
		    setTimeout(function(){
		    	$("#cardNum"+self.errorArr[0]).find('a').eq(0).removeClass('in').addClass('out');
		     	$("#cardNum"+self.errorArr[0]).find('a').eq(1).removeClass('out').addClass('in');
		     	$("#cardNum"+self.errorArr[1]).find('a').eq(0).removeClass('in').addClass('out');
		     	$("#cardNum"+self.errorArr[1]).find('a').eq(1).removeClass('out').addClass('in');
		     	self.failResult();
		     	self.clear2val(self.errorArr);
		     	console.log(self.errorArr);
		     },800);
		     return false;		 
		},
		failResult:function(){
			// 失败的表现
			$(".wordBox .icon").removeClass().addClass('icon');
			$(".wordBox .word").hide();
			$(".wordBox .f36").show();
		},
		timingBegins:function(){
			// 开始计时
			var min = 0 ,sec = 0 , ms = 0;
			clearInterval(timer);
			timer = setInterval(function(){
				showTime();
			},10)
			function showTime(){
				ms++;
			    if(sec==60){
			        min++;sec=0;
			    }
			    if(ms==100){
			        sec++;ms=0;
			    }
			    var msStr=ms;
			    if(ms<10){
			        msStr="0"+ms;
			    }
			    var secStr=sec;
			    if(sec<10){
			        secStr="0"+sec;
			    }
			    var minStr=min;
			    if(min<10){
			        minStr="0"+min;
			    }
			    $(".wordBox .f36").html(minStr+":"+secStr+":"+msStr);
			}
		},
		init:function(){
			var self = this;
			self.randomToSetImg();   // 初始化图片
		},
		getRankingLists:function(){
			var self = this;
			// 请求排行版数据
			for(var i = 0 ;i < 20; i++){
				$(".ranking-lists").append('<li><span class="count">'+(i+1)+'.</span><span>name</span><span>00:10:10</span></li>');
			}
			$(".ranking-box,.mask").addClass('show').removeClass('hide');
		},
		// 随机函数方法
		randomToSetImg:function(){
			var self = this;
			var _num = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];	// 1-16  2-15		 ==17
			_num.sort(function(){ return 0.5 - Math.random() });
			console.log(_num);
			for(var i = 0 ; i < _num.length; i++){
				var _index = "";
				_num[i] > 8 ? _index = (17 - _num[i]): _index = _num[i];
				var _html  = '<li class="box viewport-flip" id="cardNum'+_num[i]
				             +'"><a href="javascript:;" class="list flip out"><img src="images/card'+_index+'.png"></a>'
				             +'<a href="javascript:;" class="list flip"><img src="images/card.png"></a></li>';
				$(".cards").append(_html);
			}
			
		},
		// 判断正反面的方法
		funBackOrFront : function(element){
			var self = this;
			$(element).find('.list').each(function() {
		        if ($(this).hasClass("out")) {
		            self.eleBack = $(this);
		        } else {
		            self.eleFront = $(this);
		        }
		    });
		},
	}
	window.fyfGame = fyfGame;
})($)