
cc.Class({
    extends: cc.Component,

    properties: {
    },
    changebg:function () {
        var self = this;
        cc.loader.loadRes("bg2", cc.SpriteFrame, function (err, spriteFrame) {
        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });

        this.schedule(function() {
            cc.loader.loadRes("bg", cc.SpriteFrame, function (err, spriteFrame) {
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
        },3);
    },

    start () {
        //cc.AudioController.playGameBgMusic();
        cc.AudioController.playStartBgMusic();
    },

});
