# Flop-Game<br>
A small game of flop demo, users can achieve the best speed to win one by one by remembering the location of cards in a short time.<br>
这是一个简单的翻牌游戏<br>
翻牌的样式可以查看css文件夹里面的animate.css文件<br>
<br>
<br>
v1.0<br>
游戏逻辑：<br>
1-初始化页面的时候，先弹出游戏规则，第一次关闭游戏规则会有3秒的时间摊牌给用户记忆<br>
2-用户进行摊牌：<br>
        随机生成牌的位置，每张牌对应一个位置，这里总共16张牌，牌1和牌16是同一张，以此判断当两张牌的值和为17即为同一张<br>
        初始化一个total=0；当两张牌匹配成功的时候，total+=17；<br>
        当total的值为136（17*8），证明所有的牌都匹配成功，游戏结束。<br>
