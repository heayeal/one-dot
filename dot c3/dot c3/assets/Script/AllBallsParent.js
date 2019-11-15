const table = require('./table');
class AllBallsParent{
    constructor(){
        this.chunkParent = null;
        this.ballsChunk = [];//所有块
        this.levelBalls = [];//用于关卡顺序
        this.ballOrder = 0; //单个副节点
        this.chunkOver = false;
        this.ballSpeed = 5;
        this._checkFunc = null;//检测function
        this.sch = null;//计时器
        this.levelId = 0;//关卡id
        this.isRun = false;//是否冲刺
    }
    initBallsChunk(chunkParent,cb){
        this.chunkParent = chunkParent;
        let self = this;
        cc.loader.loadResDir('level',cc.Prefab,function(err,assets){
            if(err){ 
                console.log('load err: ',err);
                cb(false);
            }
            else{
                let len = assets.length;
                for(let i=0;i<len;i++){
                    // console.log(assets[i]);
                    self.ballsChunk[i] = cc.instantiate(assets[i]);
                    self.ballsChunk[i].parent = chunkParent;
                    self.ballsChunk[i].x = 0;
                    self.ballsChunk[i].y = 1001;
                }
                cb(true);
            }
        });
        
        // this.ballsChunk[0] = cc.find("Canvas/1");
        // this.ballsChunk[1] = cc.find("Canvas/2");
        // this.ballsChunk[2] = cc.find("Canvas/3");
        // this.ballsChunk[3] = cc.find("Canvas/4");
        // console.log(this.ballsChunk);
        this.sch = new cc.Component();
    }
    // LoadLevel(){
    //     let list = table.level[this.levelId].list;
    //     let ll = list.length;
    //     let self = this;
    //     for(let i=0;i<ll;i++){
    //         if(this.ballsChunk[list[i]]==undefined){
    //             this.LoadAsset('level/'+list[i],cc.Prefab,(res)=>{
    //                 self.ballsChunk[list[i]] = cc.instantiate(assets);
    //                 self.ballsChunk[list[i]].parent = self.chunkParent;
    //                 self.ballsChunk[list[i]].x = 0;
    //                 self.ballsChunk[list[i]].y = 1001;
    //             });
    //         }
    //     }
    // }
    // LoadAsset(url,typ,cb){
    //     cc.loader.loadRes(url,typ,function(err,res){
    //         if(err) console.log(err);
    //         else cb(res);
    //     });
    // }
    initLevel(num){
        // console.log(this.ballsChunk);
        //2 3 1
        this.levelId = num;
        console.log('关卡 ：'+this.levelId);
        console.log(table.level);
        // this.levelList = [1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4];
        this.levelList = table.level[this.levelId].list;
        this.s1 = table.level[this.levelId].s1;
        this.s2 = table.level[this.levelId].s2;
        this.s3 = table.level[this.levelId].s3;
        console.log(this.levelList);
        this.chunkOver = false;
        // this.levelBalls = [];
        // let len = levelList.length;
        // for(let i =0;i<len;i++){
        //     this.levelBalls[i] = this.ballsChunk[this.getBalls(levelList[i])];
        // }
        // this.levelBalls[0] = this.ballsChunk[1];
        // this.levelBalls[1] = this.ballsChunk[2];
        // this.levelBalls[2] = this.ballsChunk[0];
        this.ballOrder = 0;
        this.StartMove();
    }
    getBalls(id){
        let len = this.ballsChunk.length;
        let i = 0;
        for(i=0;i<len;i++){
            if(this.ballsChunk[i].name == id+'' && this.ballsChunk[i].y >= 999){
                console.log(i+1);
                return i;
            }
        }
        // let newnode = cc.instantiate();
        // this.ballsChunk.push(newnode);
        // return i+1;
    }
    StartMove(){
        // let len = this.levelBalls.length;
        // for(let i=0;i<len;i++){
        //     this.levelBalls[i].emit('StartMove');
        // }
        let i = this.getBalls(this.levelList[this.ballOrder]);
        console.log("index: "+i);
        this.ballsChunk[i].emit('StartMove');
        let self = this;
        this._checkFunc = function(){
            // console.log("check");
            if(self.CheckNext()){
                self.ballsChunk[self.getBalls(self.levelList[self.ballOrder])].emit('StartMove');
            }
        }
        this.sch.schedule(this._checkFunc,0.01);
        // setInterval(()=>{
        //     self._checkFunc();
        // },10);
    }
    StopMove(){
        this.sch.unschedule(this._checkFunc);
        let len = this.ballsChunk.length;
        // let num1 =this.levelId; 
        for(let i=0;i<len;i++){
            this.ballsChunk[i].emit('StopMove');
        }
    }
    //通关
    GameClear(){
        this.StopMove();
        this.levelId++;
        //判断分数
    }
    //失败
    GameOver(){
        this.StopMove();
        //失败界面
    }
    changespeed (num,time){
        this.ballSpeed = num;
        let self = this;
        this.sch.scheduleOnce(function () {
            self.ballSpeed = 5;
        },time)
    }
    CheckMove(){
        if(this.CheckNext()){
            this.ballsChunk[this.getBalls(this.levelList[this.ballOrder])].emit('StartMove');
        }
    }
    CheckNext(){
        // console.log(this.ballsChunk[this.levelList[this.ballOrder]-1]);
        if(this.ballsChunk[this.levelList[this.ballOrder]-1].y <= 0 &&
            this.ballsChunk[this.levelList[this.ballOrder]-1].y >= -320){
            if(this.ballOrder >= this.levelList.length-1) this.chunkOver = true;
            else if(this.ballOrder < this.levelList.length-1){
                this.ballOrder++;
                console.log("c t");
                return true;
            }
        }
        return false;
    }
    CheckInView(npos,opos){
        let len = this.ballsChunk.length;
        for(let i=0;i<len;i++){
            if(this.ballsChunk[i].y<=470 && this.ballsChunk[i].y>=-800){
                this.ballsChunk[i].emit('calHalf',[npos,opos]);
            }
        }
    }
    CheckGreen(gpos,ppos){
        let len = this.ballsChunk.length;
        for(let i=0;i<len;i++){
            // console.log(this.ballsChunk[i].y , gpos.y);
            if(this.ballsChunk[i].y <= gpos.y+400 && this.ballsChunk[i].y >= gpos.y-400 &&
                this.ballsChunk[i].y<=400 && this.ballsChunk[i].y>=-550){
                this.ballsChunk[i].emit('move2Player',ppos);
            }
        }
    }
}
module.exports = new AllBallsParent();