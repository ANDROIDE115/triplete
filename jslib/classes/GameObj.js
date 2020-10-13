function GameObj(){

this.cResources=new Array();
var lEvent=new Event("isResLoad");
var erEvent=new Event("isErrLoad");
this.cObjects= new Array();	
this.cImages= new Array();	

/*load res*/	
this.LoadResource=function(){
	
for(var i=0; i<this.cResources.length; i++){

var tmpImg=this.cResources[i].split(".")[0].split("/")[2];

this.cImages[tmpImg]=new Image();
this.cImages[tmpImg].src=this.cResources[i];
this.cImages[tmpImg].onload=IsLoadingRes;
this.cImages[tmpImg].onerror=IsLoadingRes;



}	
	
};	

this.CreateSprite=function(anim_data){
	
var spriteSheet = new createjs.SpriteSheet(anim_data);
var newSprite = new createjs.Sprite(spriteSheet, "");	

return newSprite;

	
};
	
/*get sprite*/	

this.GetSprite=function(sid){


return this.cObjects[sid];	



};	

/*get resource count*/	

this.GetResCount=function(){

return 	this.cResources.length;

};	

	
};
