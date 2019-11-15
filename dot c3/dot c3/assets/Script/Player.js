cc.Class({
    extends: cc.Component,

    properties: {
        // boom: {
        // default:null,
        // type:cc.ParticleSystem,
        // },
    },
    onLoad () {
        
        
		//节点初始位置,每次触摸结束更新
        this.nodePos = this.node.getPosition();
        this.animationComponent = this.getComponent(cc.Animation);
        //触摸监听(this.node.parent是屏幕)
        //想达到按住节点，节点才能移动的效果，将监听函数注册到 this.node 上，去掉  .parent 即可
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.opos = [];//上一帧的位置
    },
    getScoreAnimation () {
        this.animationComponent.play('blueball');
    },
    onDestroy() {
        this.node.parent.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.parent.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.parent.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },
    start(){
        var section = cc.find("Canvas").getComponent("Game").currentSection //关卡列表
        //section 关卡信息
        // {
        //     路程距离
        //     关卡内对象的排布
        //     玩家生命奖励
        //     玩家速度奖励
        // }
        this.opos[0] = this.node.x;
        this.opos[1] = this.node.y;
        const abp = require('./AllBallsParent');
        this.schedule(()=>{
            abp.CheckInView([this.node.x,this.node.y,this.node.width/2],this.opos);
            this.opos[0] = this.node.x;
            this.opos[1] = this.node.y;
        },0.016);
    },
 
    //触摸移动；
    onTouchMove (event) {
        var self = this;
        var touches = event.getTouches();
        //触摸刚开始的位置
        var oldPos = self.node.parent.convertToNodeSpaceAR(touches[0].getStartLocation());
        //触摸时不断变更的位置
        var newPos = self.node.parent.convertToNodeSpaceAR(touches[0].getLocation());
        
        //var subPos = cc.pSub(oldPos,newPos); 1.X版本是cc.pSub
 
        var subPos = oldPos.sub(newPos); // 2.X版本是 p1.sub(p2);
 
        self.node.x = self.nodePos.x - subPos.x;
        self.node.y = self.nodePos.y - subPos.y;
        
        // 控制节点移不出屏幕; 
        var minX = -self.node.parent.width/2 + self.node.width/2; //最小X坐标；
        var maxX = Math.abs(minX);
        var minY = -self.node.parent.height/2 + self.node.height/2; //最小Y坐标；
        var maxY = Math.abs(minY);
        var nPos = self.node.getPosition(); //节点实时坐标；
 
        if (nPos.x < minX) {
            nPos.x = minX;
        };
        if (nPos.x > maxX) {
            nPos.x = maxX;
        };
        if (nPos.y < minY) {
            nPos.y = minY;
        };
        if (nPos.y > maxY) {
            nPos.y = maxY;
        };
        self.node.setPosition(nPos);
    },
    onTouchEnd () {
        this.nodePos = this.node.getPosition(); //获取触摸结束之后的node坐标；
    },
    onTouchCancel: function () {
        this.nodePos = this.node.getPosition(); //获取触摸结束之后的node坐标；
    },
    beginTouch () {
        this.node.resumeSystemEvents(true);
    },
    pauseTouch () {
        this.node.pauseSystemEvents(true);
    },
    respos() {
        this.node.x = 0;
        this.node.y = 0;
        this.nodePos.x = 0;
        this.nodePos.y = 0;
    },
    // changebg:function () {
    //     var self = this;
    //     cc.loader.loadRes("black", cc.SpriteFrame, function (err, spriteFrame) {
    //     self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    //     });

    //     this.scheduleOnce(function() {
    //         cc.loader.loadRes("yellow", cc.SpriteFrame, function (err, spriteFrame) {
    //             self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    //             });
    //     },3);
    // },
    
    // gameovers: function() {
    //     cc.director.loadScene('Game Over')
    // },

  

});
