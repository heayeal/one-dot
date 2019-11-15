const abp = require('./AllBallsParent');
cc.Class({
    extends: cc.Component,

    properties: {
        //滚动视图
        // scrollView: cc.ScrollView,
        scrollView: cc.Node,
        //关卡预制资源
        guanqiaPrefab: cc.Prefab,
    },

    onLoad () {
        cc.levelCtor = this;
        cc.leveldata.saveData();
        let result = cc.leveldata.loadData();
        //添加节点
        this.allLevelCtr = [];
        for(let i = 0;i < 50;i++){
            let newNode = cc.instantiate(this.guanqiaPrefab);
            let nnCom = newNode.getComponent('guanqia');
            // console.log('关卡'+abp.levelId);
            // abp.levelId = i;
            this.allLevelCtr[i] = nnCom;
            nnCom.initLevelTag(i);
            //cc.leveldata.readLevelData();
            nnCom.setUnlock(result[i].unlock);
            // console.log(result[i])
            nnCom.setStarOn(result[i].star);
            //console.log(result[i].star)
            newNode.parent = this.scrollView;
            // this.scrollView.content.addChild(this.getPrefab());
        }
    },

    changeStar (s) {
        console.log(s);
        this.allLevelCtr[abp.levelId].setStarOn(s);
    },

    changeUnlock () {
        this.allLevelCtr[abp.levelId+1].setUnlock(1);
    },

    // getPrefab(){
    //     return cc.instantiate(this.guanqiaPrefab);
    // },
    start () {
    },
    // update (dt) {},
});


