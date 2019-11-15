cc.Class({
    extends: cc.Component,

    properties: {
        gameBgMusic: {
            default: null,
            type: cc.AudioClip
        },
        startBgMusic: {
            default: null,
            type: cc.AudioClip
        },
        redEffect: {
            default: null,
            type: cc.AudioClip
        },
        blueEffect: {
            default: null,
            type: cc.AudioClip
        },
        greenEffect: {
            default: null,
            type: cc.AudioClip
        },
        purpleEffect: {
            default: null,
            type: cc.AudioClip
        },
        volumn:1,
    },

    onLoad () {
        cc.AudioController = this;
    },

    playGameBgMusic () {
        cc.audioEngine.playMusic(this.gameBgMusic,true);
        cc.audioEngine.setMusicVolume(this.volumn);
    },
    stopGameBgMusic () {
        cc.audioEngine.stopMusic(this.gameBgMusic,true);
        cc.audioEngine.setMusicVolume(this.volumn);
    },
    playStartBgMusic () {
        cc.audioEngine.playMusic(this.startBgMusic,true);
        cc.audioEngine.setMusicVolume(this.volumn);
    },
    stopStartBgMusic () {
        cc.audioEngine.stopMusic(this.startBgMusic,true);   
    },
    playRedEffect(){
        cc.audioEngine.playEffect(this.redEffect,false);
    },
    playGreenEffect(){
        cc.audioEngine.playEffect(this.greenEffect,false);
    },
    playBlueEffect(){
        cc.audioEngine.playEffect(this.blueEffect,false);
    },
    playPurpleEffect(){
        cc.audioEngine.playEffect(this.purpleEffect,false);
    },
    //禁背景音乐
    setBgMusic : function(is_music) {
        /*if(this.volumn === is_music){
            return;
        }*/
        this.volumn = (is_music)? 1: 0;
        if(this.volumn  === 1){
            cc.audioEngine.setMusicVolume(1);
        }else if(this.volumn === 0){
            cc.audioEngine.setMusicVolume(0);
        }

        cc.sys.localStorage.setItem("BgMusic", this.volumn);
    },
    //禁音效
    setEffect : function(is_music) {
        /*if(this.volumn === is_music){
            return;
        }*/
        this.volumn = (is_music)? 1: 0;
        if(this.volumn  === 1){
            cc.audioEngine.setEffectsVolume(1);
        }else if(this.volumn === 0){
            cc.audioEngine.setEffectsVolume(0);
        }

        cc.sys.localStorage.setItem("effect", this.volumn);
    },
    // update (dt) {},
});
