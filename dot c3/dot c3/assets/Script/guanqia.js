
cc.Class({
    extends: cc.Component,
    properties: {
        labelLevel:{
            default: null,
            type: cc.Label
        },
        levelState : cc.Sprite,
        starArrNode: cc.Node,
        starArr:[cc.Sprite],
        levelUnlock : cc.SpriteFrame,
        levelLock : cc.SpriteFrame,
        levelWillLock : cc.SpriteFrame,
        starOn : cc.SpriteFrame,
        starOff: cc.SpriteFrame,

        labelNode:cc.Node,
        leveltip: cc.Label,
    },
    onLoad () {
        // var numChild = this.node.getChildByName("num");
        this.levelId = this.levelId||0;
        cc.custom = this;


    },
    
    initLevelTag(id){
        this.levelId = id;
        // console.log('');
        this.labelLevel.string = (id+1)+'';
        this.levelState.spriteFrame = this.levelLock;
        let len = this.starArr.length;
        for(let i=0;i<len;i++){
            this.starArr[i].spriteFrame = this.starOff;
        }
    },
    setStarOn(num){
        for(let i=0;i<num;i++){
            this.starArr[i].spriteFrame = this.starOn;
        }
    },
    setUnlock(flag){
        // if(flag) 
        // this.levelState.spriteFrame = this.levelUnlock;
        //flag && (this.levelState.spriteFrame = this.levelUnlock);
        if(flag == 1){
            this.levelState.spriteFrame = this.levelUnlock;
            this.starArrNode.active = true;
        } else if(flag == 0){
            this.levelState.spriteFrame = this.levelLock;
            this.starArrNode.active = false;
            this.labelNode.active = true;
        }else if(flag == 2){
            this.levelState.spriteFrame = this.levelWillLock;
            this.labelLevel.string = '';
            this.starArrNode.active = false;
            this.labelNode.active = true;
            this.leveltip.string ='6/9';
 
    }

    },
    buttunPlay(arg){
        // console.log(arg);
        arg = this.levelId;
        console.log('关卡'+arg);
        cc.page.levelPlay(arg);
    },
    getNum () {
       
    },

    // update (dt) {},
});
