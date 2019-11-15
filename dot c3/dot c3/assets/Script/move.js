const abp = require('./AllBallsParent');

cc.Class({
    extends: cc.Component,

    properties: {
        isAllRotate : false,//是否整个块旋转
        rotateSpeed : 360,//移动速度(多少度)
        moveObj : [cc.Node],//要移动的子节点
        moveDis : [cc.Vec2],//移动的距离
        moveTime : [cc.Integer]//移动的时间
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.speed = 5;
        this.over = cc.find("Canvas/overGame").getComponent('gameOver');
        this.game = cc.find("Canvas").getComponent('Game');
        this.player = cc.find("Canvas/player").getComponent('Player');
        this.allBallPos = [];
        this.allSp = [];
        this.isOver = false;//是否走完了
        this.ismove = false;

        cc.move = this;

        let self = this;
        cc.loader.loadRes('blue',function(err,assets){
            self.blueImg = new cc.SpriteFrame(assets);
        });
        cc.loader.loadRes('red',function(err,assets){
            self.redImg = new cc.SpriteFrame(assets);
        });
        cc.loader.loadRes('black',function(err,assets){
            self.blackImg = new cc.SpriteFrame(assets);
        })
        cc.loader.loadRes('yellow',function(err,assets){
            self.yellowImg = new cc.SpriteFrame(assets);
        })

        let len = this.node.childrenCount;
        for(let i=0;i<len;i++){
            this.allBallPos[i] = {};
            this.allBallPos[i].x = this.node.children[i].x;
            this.allBallPos[i].y = this.node.children[i].y;
            this.allSp[i] = this.node.children[i].getComponent(cc.Sprite);
        }
        
        this.node.on('StartMove',this.StartMove,this);
        this.node.on('StopMove',this.StopMove,this);
        this.node.on('calHalf',this.CalHalf,this);
        this.node.on('move2Player',this.MoveToPlayer,this);
        
        console.log("node on");
    },

    start () {
        // this.speed = 5;
    },
    StartMove(){
        console.log(this.allBallPos);
        let len = this.node.childrenCount;
        for(let i=0;i<len;i++){     
            this.node.children[i].x = this.allBallPos[i].x;
            this.node.children[i].y = this.allBallPos[i].y;
            this.node.children[i].isLive = true;
            if(this.node.children[i].name == 'r' && abp.isRun){
                this.node.children[i].name = 'r_b'
                this.allSp[i].spriteFrame = this.blueImg;
            }
        }
        this.ismove = true;
        this.isOver = false;

        if(this.isAllRotate){
            this.node.runAction(cc.repeatForever(cc.rotateBy(1,this.rotateSpeed)));
        }
        let lm = this.moveObj.length;
        for(let i=0;i<lm;i++){
            this.moveObj.runAction(cc.moveBy(this.moveTime[i],cc.v2(this.moveDis[i].x,this.moveDis[i].x)))
        }

        this.schedule(this.ballMove,0.016);
        // console.log(this.ismove);
    },
    StopMove(num1){
        if(this.ismove != true) return;
        
        this.unschedule(this.ballMove);
        this.ismove = false;

        if(this.isAllRotate){
            this.node.stopAllActions();
        }
        let lm = this.moveObj.length;
        for(let i=0;i<lm;i++){
            this.moveObj.runAction(cc.moveBy(this.moveTime[i],cc.v2(this.moveDis[i].x,this.moveDis[i].x)))
        }

        this.node.y = 1000;
        let len = this.node.childrenCount;
        for(let i=0;i<len;i++){
            if(this.node.children[i].name == 'r_b'){
                this.node.children[i].name = 'r';
                this.allSp[i].spriteFrame = this.redImg;
            }
        }

        if(abp.chunkOver && this.isOver){
            console.log('next');
            //通关
            // abp.GameClear();
            // console.log('num1:'+num1);
            abp.StopMove();
            cc.page.gamewin();
            this.over.scoreGet();
            this.over.starActive();
            this.game.restoreScore();
        }
    },
    CalHalf(apos){
        // let py = npos[1] - this.node.y;
        let npos = apos[0];
        let opos = apos[1];
        let len = this.node.childrenCount;
        for(let i=0;i<len;i++){
            let bx = this.node.children[i].x;
            let by = this.node.children[i].y + this.node.y;
            let bw = this.node.children[i].width;
            let name = this.node.children[i].name;
            if((bw/2+npos[2] >= this.getDistence(npos[0]-bx,npos[1]-by) &&
                this.node.children[i].isLive) || 
                this.getPointToLine(npos,opos,[bx,by,bw])<=bw/2){
                //peng dao le
                console.log('peng dao le:',name);
                this.node.children[i].isLive = false;
                this.node.children[i].stopAllActions();
                // let self = this;
                if(name == 'b' || name == 'r_b'){
                    // this.player.getScoreAnimation();
                    this.game.gainScore();
                }
                if(name == 'p' && !abp.isRun){
                    console.log('speed' + this.speed)
                    this.game.changeBgImg();
                    abp.changespeed(2,3);
                    let playImg = this.player.getComponent(cc.Sprite);
                    playImg.spriteFrame = this.blackImg;
                    this.scheduleOnce(function(){
                    playImg.spriteFrame = this.yellowImg;
                    },3)
                }
                if(name == 'r'){
                    //死亡
                    // this.player.boom.resetSystem();
                    abp.StopMove();
                    this.over.scoreGet();
                    this.over.starAllDull();
                    cc.page.gameOver();
                    // this.over.onOver();
                    this.game.restoreScore();

                }
                if(name == 'g'){
                    // console.log("in g");
                    let gpos = {};
                    gpos.x = bx;
                    gpos.y = by;
                    // let ppos = {};
                    // ppos.x = npos[0];
                    // ppos.y = npos[1];
                    abp.CheckGreen(gpos,npos);
                }
                if(name == 'b' || name == 'p' || name == 'g' || name == 'r_b'){
                    let mt = 0.1;
                    let ac1 = cc.moveBy(mt,cc.v2(npos[0]-bx,npos[1]-by+abp.ballSpeed*(mt/0.016)));
                    let ac2 = cc.scaleTo(mt,0);
                    let ac3 = cc.callFunc(function(){
                        this.node.children[i].x = 2000;
                        this.node.children[i].scale = 1;
                    },this);
                    this.node.children[i].runAction(cc.sequence(cc.spawn(ac1,ac2),ac3));
                }
            }
        }
    },
    MoveToPlayer(pos){
        if(this.isAllRotate){
            this.node.stopAllActions();
        }
        let len = this.node.childrenCount;
        for(let i=0;i<len;i++){
            if(this.node.children[i].isLive){
                this.game.gainScore();
                let bx = this.node.children[i].x;
                let by = this.node.children[i].y + this.node.y;
                let name = this.node.children[i].name;
                // let sp = this.node.children[i].getComponent(cc.Sprite);
                if (name == 'r'){
                    this.allSp[i].spriteFrame = this.blueImg;
                }
                // console.log(this.node.children);
                let mt = 0.3;
                let ac1 = cc.moveBy(mt,cc.v2(pos[0]-bx,pos[1]-by+abp.ballSpeed*(mt/0.016)));
                let ac2 = cc.scaleTo(mt,0);
                let ac3 = cc.callFunc(function(){
                    this.node.children[i].x = 2000;
                    this.node.children[i].scale = 1;
                    if(name == 'r'){
                        this.allSp[i].spriteFrame = this.redImg;
                    }
                },this);
                this.node.children[i].runAction(cc.sequence(cc.spawn(ac1,ac2),ac3));
                this.node.children[i].isLive = false;
                //move to pos
            }
        }
    },
    getDistence(x,y){
        return Math.sqrt(x*x + y*y);
    },
    ballMove(){
        if(this.ismove){
            this.node.y -= abp.ballSpeed;
            if(this.node.y >= -550 && this.node.y <= 400 && abp.isRun){
                this.chgCollor();
            }
            if(this.node.y<=-1000){
                this.isOver = true;
                this.StopMove();
            }
        }
    },
    chgCollor(){
        let len = this.node.childrenCount;
        for(let i=0;i<len;i++){
            if(this.node.children[i].name == 'r' && abp.isRun){
                this.node.children[i].name = 'r_b'
                this.allSp[i].spriteFrame = this.blueImg;
            }
        }
    },
    getPointToLine(npos,opos,tpos){
        // console.log(npos,opos,tpos);
        let dis = this.getDistence(opos[0]-npos[0],opos[1]-npos[1])
        if(dis <= 100) return;
        let cx = (npos[0]+opos[0])/2;
        let cy = (npos[1]+opos[1])/2;
        if(tpos[2]+dis/2 < this.getDistence(cx-tpos[0],cy-tpos[1])) return;
        console.log(npos,opos,tpos);
        let a = (npos[1]-opos[1])/(npos[0]-opos[0]);
        let b = -1;
        let c = npos[1] - a*npos[0];
        let d = Math.abs((a*tpos[0]+b*tpos[1]+c)/(Math.sqrt(a*a+b*b)));
        return d;
    }
    // update (dt) {
    // },
});
