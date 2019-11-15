const abp = require('./AllBallsParent');
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        cc.leveldata = this;
    },
    saveData(){     
        this.leveldata = [
            {unlock:1,star:0},
            {unlock:1,star:0},
            {unlock:1,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
            {unlock:0,star:0},
        ]
        this.sd = JSON.stringify(this.leveldata);
        cc.sys.localStorage.setItem('leveldata',this.sd);
    },
    loadData(){
        cc.sys.localStorage.getItem('leveldata');
        this.lsd = JSON.parse(this.sd);
        
        return this.lsd;
    },
    // update (dt) {},
});
