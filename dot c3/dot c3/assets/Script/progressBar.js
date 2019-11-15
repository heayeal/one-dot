cc.Class({
    extends: cc.Component,
 
    properties: {
        speed: 10,
        horizontalBarReverse: {
            type: cc.ProgressBar,
            default: null
        },
    },
 
    onLoad: function () {
        this._pingpong = true;
        this.horizontalBarReverse.progress = 0;
    },
 
    update: function (dt) {
        this._updateProgressBar(this.horizontalBarReverse, dt);
    },
    
    _updateProgressBar: function(progressBar, dt){
        var progres = progressBar.progress;
        if(progres < 1.0 && this._pingpong){
            progres += dt * this.speed;
        }
        else {
            progres -= dt * this.speed;
            this._pingpong = progres <= 0;
        }
        progressBar.progress = progres;
    }
});
 
