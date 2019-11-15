const abp = require('./AllBallsParent');
cc.Class({
    extends: cc.Component,

    properties: {
        scoreDisplay: {
            default: null,
            type:cc.Label
        },
        
    },

    onLoad () {
        this.player = cc.find("Canvas/player").getComponent("Player");
        this.bg = cc.find("Canvas/bg");
        this.b1 = cc.find("Canvas/overGame/gameOver/sstar/bright1");
        this.b2 = cc.find("Canvas/overGame/gameOver/sstar/bright2");
        this.b3 = cc.find("Canvas/overGame/gameOver/sstar/bright3");
        this.d1 = cc.find("Canvas/overGame/gameOver/fstar/dull1");
        this.d2 = cc.find("Canvas/overGame/gameOver/fstar/dull2");
        this.d3 = cc.find("Canvas/overGame/gameOver/fstar/dull3");
        this.b1.active = false;
        this.b2.active = false;
        this.b3.active = false;
        this.d1.active = false;
        this.d2.active = false;
        this.d3.active = false;
        this.game = cc.find("Canvas").getComponent("Game");
        let self = this;
        cc.loader.loadRes('bg',function(err,assets){
            self.bg1 = new cc.SpriteFrame(assets);
        })
        cc.loader.loadRes('yellow',function(err,assets){
            self.yellowImg = new cc.SpriteFrame(assets);
        })
        this.score = 0;
        // this.level = cc.custom;
    },

    onOver () {
        // cc.director.loadScene('playGame')
        
        abp.StopMove();
        this.node.x = 0;
    },
    again () {
        this.player.getComponent(cc.Sprite).spriteFrame = this.yellowImg;
        this.bg.getComponent(cc.Sprite).spriteFrame = this.bg1;
        // this.node.x = 1000;
        // abp.initLevel();
        this.player.respos();
    },
    scoreGet() {
        this.score = this.game.score;
        this.scoreDisplay.string = this.score;
    },
    starActive (num1) {
        let s =0;

        let level = abp.levelId + 1;
        if (this.score >= abp.s1 && this.score < abp.s2) {
            this.b1.active = true;
            this.b2.active = false;
            this.b3.active = false;
            this.d1.active = false;
            this.d2.active = true;
            this.d3.active = true;
            s = 1;
            // console.log(s);
            cc.levelCtor.changeStar(s);
            console.log('one star');
        }else if(this.score >= abp.s2 && this.score < abp.s3){
            this.b1.active = true;
            this.b2.active = true;
            this.b3.active = false;
            this.d1.active = false;
            this.d2.active = false;
            this.d3.active = true;
            cc.leveldata.leveldata[level].unlock = 1;
            s = 2;
            cc.levelCtor.changeStar(s);
            cc.levelCtor.changeUnlock();
            // console.log('2 star');
        }else if (this.score >= abp.s3){
            this.b1.active = true;
            this.b2.active = true;
            this.b3.active = true;
            this.d1.active = false;
            this.d2.active = false;
            this.d3.active = false;
            cc.leveldata.leveldata[level].unlock = 1;
            s = 3;
            cc.levelCtor.changeStar(s);
            cc.levelCtor.changeUnlock();
            // console.log('3 star');
        }

    },
    starAllDull () {
        this.b1.active = false;
        this.b2.active = false;
        this.b3.active = false;
        this.d1.active = true;
        this.d2.active = true;
        this.d3.active = true;
    }

    // update (dt) {},
});
