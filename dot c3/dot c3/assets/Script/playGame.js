const abp = require('./AllBallsParent');
cc.Class({
    extends: cc.Component,

    properties: {
        startGame: cc.Node,
        overGame: cc.Node,
        game: cc.Node,
        guanqia: cc.Node,
        advert: cc.Node,
        muneList: cc.Node,
        stopBt: cc.Node,
        failLabel: cc.Node,
        successLabel: cc.Node,
        nextBt: cc.Node,
        replayBt: cc.Node,
        tryAgain: cc.Node
        // fSatrNode : cc.Node,
        // sStarNode: cc.Node
    },

    onLoad () {
        this.outOfWrold = cc.v2(-1320,480);
        this.inOfWorld = cc.v2(0,0);
        cc.page = this;
        this.leveldata = cc.leveldata;
        // this.player = cc.find("Canvas/player").getComponent("Player");
        this.game = cc.find('Canvas').getComponent('Game');
        this.over = cc.find("Canvas/overGame").getComponent('gameOver');
        // abp.StopMove();
    },
     //开始游戏
     onStart (num) {
        num = 0;
        this.startGame.position = this.outOfWrold;
        this.onHide();
        cc.AudioController.stopStartBgMusic();
        cc.AudioController.playGameBgMusic();
     //    abp.initLevel();
        this.game.startGame(num);
        console.log("move");
        this.over.again();
     },
    //返回主菜单
    returnHome () {
        this.startGame.position = this.inOfWorld;
        this.overGame.position = this.outOfWrold;
        abp.StopMove();
        cc.AudioController.stopGameBgMusic();
        cc.AudioController.playStartBgMusic();
     },
    //游戏结束过关
    gamewin(){
        this.tryAgain.active = true;
        this.overGame.position = this.inOfWorld;
        this.successLabel.active = true;
        this.failLabel.active =false;
        this.nextBt.active = true;
        this.replayBt.active = false;
    },
     //游戏结束失败
    gameOver(){
        this.tryAgain.active = false;
         this.overGame.position = this.inOfWorld;
         this.successLabel.active = false;
         this.failLabel.active =true;
         this.nextBt.active = false;
         this.replayBt.active = true;
     }, 
     //失败，重玩此关
     againGame(){
        this.level = abp.levelId;
        cc.move.StopMove();
        let num = this.level;
        console.log('重来'+num);
        this.overGame.position = this.outOfWrold;
        this.game.startGame(num);
        this.over.again();
    },
    //重玩此关
    again(){
        this.level = abp.levelId;
        cc.move.StopMove();
        let num = this.level;
        console.log('重来'+num);
        this.overGame.position = this.outOfWrold;
        this.game.startGame(num);
        this.over.again();
    },
    //下一关
    continueGame(){
        // abp.StopMove();
        abp.levelId++;
        this.level = abp.levelId;
        let num = this.level;
        this.overGame.position = this.outOfWrold;
        this.game.startGame(num);
        this.over.again();
    }, 
    //菜单栏重新开始
    reStart () {
        cc.director.resume();
        abp.StopMove();
        this.game.restoreScore();
        this.overGame.position = this.outOfWrold;
        this.startGame.position = this.inOfWorld;
        this.guanqia.position = this.outOfWrold;
        cc.AudioController.stopGameBgMusic();
        cc.AudioController.playStartBgMusic();
     },
     //选择关卡
     chooseGuanqia(){
         this.guanqia.position = this.inOfWorld;
         this.startGame.position = this.outOfWrold;
     },
     //从关卡进入game
     levelPlay(num){
        if(this.leveldata.leveldata[num].unlock == 1){
            console.log('1');

            this.guanqia.position = this.outOfWrold;
            this.muneList.active = false;
            this.over.again();
            this.game.startGame(num); 
        }
    },
    //停止游戏
    onStop(){
        this.muneList.active = true;
        cc.director.pause()
    },
    //关闭设置栏
    onHide(){
        this.muneList.active = false;
        cc.director.resume();
    }
    // update (dt) {},
});
