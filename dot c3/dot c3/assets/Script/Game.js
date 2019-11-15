const abp = require('./AllBallsParent');

// const ScoreFX = require('ScoreFX');
cc.Class({
    extends: cc.Component,

    properties: {
        scoreDisplay: {
            default: null,
            type:cc.Label
        },
        playbgm:{
            default: null,
            type: cc.AudioClip
        },
        // scoreFXPrefab:{
        //     default: null,
        //     type: cc.prefab
        // },
        levelNode : cc.Node
    },

    onLoad: function() {
        this.speedbg = cc.find("Canvas/1dot_combo_bg");
        this.player = cc.find("Canvas/player");
        this.bg = cc.find("Canvas/bg");
        this.startgame = cc.find("Canvas/startGame");
        let self = this;
        cc.loader.loadRes('bg2',function(err,assets){
            self.bg2 = new cc.SpriteFrame(assets);
        })
        cc.loader.loadRes('bg',function(err,assets){
            self.bg1 = new cc.SpriteFrame(assets);
        })

        console.log(this.speedbg);
        // this.reds = cc.find("Canvas/redballs").children;
        // this.blues = cc.find("Canvas/scoreballs").children;
        // this.purples = cc.find("Canvas/prupleballs").children;
        // this.greens = cc.find("Canvas/greenballs").children;
        //获取进度条图片
        this.jindutiao1 = cc.find("Canvas/1dot_jindutiao_left").getComponent(cc.ProgressBar);
        this.jindutiao2 = cc.find("Canvas/1dot_jindutiao_right").getComponent(cc.ProgressBar);
        // console.log(this.jindutiao);
        this.jindutiao1.progress = 0;
        this.jindutiao2.progress = 0;
        
        this.score = 0;

        // abp.StopMove();
        // this.resetScore();
        // cc.director.getPhysicsManger().enabled = true;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;

        // this.initGame()
        // this.initPlayer()

        cc.audioEngine.playMusic(this.playbgm,true);

        abp.initBallsChunk(this.levelNode,(res)=>{
            console.log('load level : '+res);
        });
        
        // this.scorePool = new cc.NodePool('ScoreFX');
    },
    // initPlayer(){
    //     //加载玩家数据 ： 等级 金钱 通关进度
    // },
    // initGame(){
    //     //加载关卡列表 : require("section")
    //     this.sections = require("section")
    // },

    startGame(num){
        // abp.initBallsChunk(this.levelNode,(res)=>{
        //     if(res) abp.initLevel();
        //     else console.log('load level failed');
        // });
        // this.startgame.x = 10000;
        // console.log('关卡：' + num);
        abp.initLevel(num);
        // 当前玩家进度
        // 获取当前关卡内容
        // 加载目标关卡内容
        // 准备关卡相关资源加载
        // ready go
    },
    
    changeBgImg () {
        let bgImg = this.bg.getComponent(cc.Sprite);
        bgImg.spriteFrame = this.bg2;
        this.scheduleOnce(function () {
            bgImg.spriteFrame = this.bg1;
        },3)

    },
    _progressAdd :function () {
        // console.log(abp.isRun);
        if(abp.isRun) return;
        if(!abp.isRun){
            this.jindutiao1.progress += 0.02;
            this.jindutiao2.progress += 0.02;
        }
        if(this.jindutiao1.progress >= 1){
            this.jindutiao1.progress = 1;
            this.jindutiao2.progress = 1;
            this._changeSpeedbg();
            let sec = 5;
            abp.changespeed(10,sec)
            abp.isRun = true;
            let lowdown = function(){
                console.log(this.jindutiao1.progress)
                this.jindutiao1.progress -= 0.031/sec;
                this.jindutiao2.progress -= 0.031/sec;
                if(this.jindutiao1.progress <= 0){
                    this.unschedule(lowdown);
                    abp.isRun = false;
                }
            }
            this.schedule(lowdown,0.02);
        }
    },

    start () {
        // this.scheduleOnce(()=>{
        //     abp.initLevel();    
        // },3);
        // // abp.initLevel();
    },
  
    _changeSpeedbg: function () {
        // console.log(this.speedbg);
        this.speedbg.x = 0;
        this.speedbg.y = 0;
        this.player.width = 56;
        this.player.height = 56;
        // console.log(this.speedbg.node.x);
        let self = this;
        this.scheduleOnce(function () {
            // console.log(self.speedbg.node.x);
            self.speedbg.x = 10000;
            self.speedbg.y = 10000;
            self.player.width = 32;
            self.player.height = 32;
        },5)

    },

    gainScore: function(pos) {
        this.score += 1;
        this.scoreDisplay.string = this.score;
        this._progressAdd();
        // let fx = this.spawnScoreFX();
        // this.node.addChild(fx.node);
        // fx.node.setPosition();
        // fx.play();
    },
    restoreScore () {
        this.score = 0;
        this.scoreDisplay.string = this.score;
        this.jindutiao1.progress = 0;
        this.jindutiao2.progress = 0;

    },

    // spawnScoreFX :function () {
    //     let fx;
    //     if (this.scorePool.size() > 0) {
    //         fx = this.scorePool.get();
    //         return fx.getComponent('ScoreFX');
    //     } else {
    //         fx = cc.instantiate(this.scoreFXPrefab).getComponent('ScoreFX');
    //     }
    // },

    // despawnScoreFX(ScoreFX) {
    //     this.scorePool.put.put(ScoreFX);
    // }


    // update (dt) {
        
           
          
    // },
    
});
