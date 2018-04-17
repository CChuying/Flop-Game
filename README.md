###Flop-Game
###A small game of flop demo, users can achieve the best speed to win one by one by remembering the location of cards in a short time.
####这是一个简单的翻牌游戏
####翻牌的样式可以查看css文件夹里面的animate.css文件
		.in {
			-webkit-animation-timing-function: ease-out;
			-webkit-animation-duration: 350ms;
			animation-timing-function: ease-out;
			animation-duration: 350ms;
		}
.out {
	-webkit-animation-timing-function: ease-in;
	-webkit-animation-duration: 225ms;
	animation-timing-function: ease-in;
	animation-duration: 225ms;
}

.viewport-flip {
	-webkit-perspective: 1000;
	perspective: 1000;
	position: absolute;
}
.flip {
	-webkit-backface-visibility: hidden;
	-webkit-transform: translateX(0); /* Needed to work around an iOS 3.1 bug that causes listview thumbs to disappear when -webkit-visibility:hidden is used. */
	backface-visibility: hidden;
	transform: translateX(0);
}
.flip.out {
	-webkit-transform: rotateY(-90deg) scale(.9);
	-webkit-animation-name: flipouttoleft;
	-webkit-animation-duration: 175ms;
	transform: rotateY(-90deg) scale(.9);
	animation-name: flipouttoleft;
	animation-duration: 175ms;
}
.flip.in {
	-webkit-animation-name: flipintoright;
	-webkit-animation-duration: 225ms;
	animation-name: flipintoright;
	animation-duration: 225ms;
}
@-webkit-keyframes flipouttoleft {
    from { -webkit-transform: rotateY(0); }
    to { -webkit-transform: rotateY(-90deg) scale(.9); }
}
@keyframes flipouttoleft {
    from { transform: rotateY(0); }
    to { transform: rotateY(-90deg) scale(.9); }
}
@-webkit-keyframes flipouttoright {
    from { -webkit-transform: rotateY(0) ; }
    to { -webkit-transform: rotateY(90deg) scale(.9); }
}
@keyframes flipouttoright {
    from { transform: rotateY(0); }
    to { transform: rotateY(90deg) scale(.9); }
}
@-webkit-keyframes flipintoleft {
    from { -webkit-transform: rotateY(-90deg) scale(.9); }
    to { -webkit-transform: rotateY(0); }
}
@keyframes flipintoleft {
    from { transform: rotateY(-90deg) scale(.9); }
    to { transform: rotateY(0); }
}
@-webkit-keyframes flipintoright {
    from { -webkit-transform: rotateY(90deg) scale(.9); }
    to { -webkit-transform: rotateY(0); }
}
@keyframes flipintoright {
    from { transform: rotateY(90deg) scale(.9); }
    to { transform: rotateY(0); }
}


游戏逻辑：
1-初始化页面的时候，先弹出游戏规则，第一次关闭游戏规则会有3秒的时间摊牌给用户记忆
2-用户进行摊牌：
  随机生成牌的位置，每张牌对应一个位置，这里总共16张牌，牌1和牌16是同一张，以此判断当两张牌的值和为17即为同一张
  初始化一个total=0；当两张牌匹配成功的时候，total+=17；
  当total的值为136（17*8），证明所有的牌都匹配成功，游戏结束。
