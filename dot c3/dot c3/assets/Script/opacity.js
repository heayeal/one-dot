
cc.Class({
    extends: cc.Component,

    properties: {
     },
  
     onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
        this.node.on(cc.Node.EventType.MOUSE_UP,this.onMouseUp,this);
     },
     onDestroy(){
        this.node.off(cc.Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
        this.node.off(cc.Node.EventType.MOUSE_UP,this.onMouseUp,this);
     },
     /*onMouseDown(event){
         let mouseType = event.getButton();
         if(mouseType === cc.Event.EventMouse.BUTTON_LEFT){
            if(this.node.opacity == 255){
               this.node.opacity = 50;
            }else if(this.node.opacity ==  50){
               this.node.opacity = 255;
            }
        }
     },*/
     onMouseUp(event){
        
     },
     onOpacityMusic(){
         if(this.node.opacity == 255){
            this.node.opacity = 50;
            cc.AudioController.setBgMusic(0);
         }else if(this.node.opacity ==  50){
            this.node.opacity = 255;
            cc.AudioController.setBgMusic(1);
         }
     },
     onOpacityEffect(){
      if(this.node.opacity == 255){
         this.node.opacity = 50;
         cc.AudioController.setEffect(0);
      }else if(this.node.opacity ==  50){
         this.node.opacity = 255;
         cc.AudioController.setEffect(1);
      }
  },
    update(){
        
    }
});
