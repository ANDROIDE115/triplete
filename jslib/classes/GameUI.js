
////////////////buttons class///////////////////

function ButtonUI(btnLabel,btnName,btnImg,blinkImg){

var btnEvent=new CustomEvent("ui_btn",{detail:{bname:btnName}});



this.cButton=new createjs.Container();	
this.spriteSheet = new createjs.SpriteSheet({ images: [btnImg],frames: {width:btnImg.width, height:(btnImg.height/4)},animations: {disabled:0,enabled:1,pressed:2,onover:3}});
this.btnSprite = new createjs.Sprite(this.spriteSheet, "enabled");
//this.btnSprite = new createjs.Bitmap(btnImg);
this.btnSprite.name=btnName;


var blinkInt=0;
var blinkSpeed=0.05;
var blinkCnt=1;


this.btnText=new createjs.Text(btnLabel, "25px VerdanaBold", "#000000");
this.btnText2=new createjs.Text(btnLabel, "25px VerdanaBold", "#FFFFFF");
this.btnText3=new createjs.Text(btnLabel, "25px VerdanaBold", "#FFFFFF");

var textAligned=this.btnText.getBounds();

this.btnText.set({textAlign:"center",x:(btnImg.width/2),y:(btnImg.height/4)/4+2});
this.btnText2.set({textAlign:"center",x:(btnImg.width/2),y:(btnImg.height/4)/4+2});
this.btnText3.set({textAlign:"center",x:(btnImg.width/2),y:(btnImg.height/4)/4+2});
this.btnText3.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 3);
this.btnText2.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 3);
this.btnText.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 3);





this.cButton.addChild(this.btnSprite);


this.cButton.addChild(this.btnText3);
this.cButton.addChild(this.btnText2);
this.cButton.addChild(this.btnText);




var self=this;

this.ShowBlink=function(){
blinkCnt=1;	
this.blinkInt=setInterval(this.Blinked,50);	
	
blinkSpeed=0.04;
};

this.HideBlink=function(){
	
clearInterval(this.blinkInt);	
self.btnSprite.filters = [
 
 ];	
 self.btnSprite.cache(self.btnSprite.x,self.btnSprite.y,200,200);
};



this.Blinked=function(){



self.btnSprite.filters = [
     new createjs.ColorFilter(blinkCnt,blinkCnt,blinkCnt,1, 0,0,0,0)
 ];

blinkCnt+=blinkSpeed;

if(blinkCnt>1.3){
blinkSpeed=-blinkSpeed;
}	

if(blinkCnt<0.8){
blinkSpeed=-blinkSpeed;
}

self.btnSprite.cache(self.btnSprite.x,self.btnSprite.y,200,200);

}

this.Disable=function(){

this.btnSprite.gotoAndStop("disabled");
this.btnText.color="#5B5B5B";


this.btnText3.shadow = new createjs.Shadow("#CCCCCC", 0, 0, 3);
this.btnText2.shadow = new createjs.Shadow("#CCCCCC", 0, 0, 3);
this.btnText.shadow = new createjs.Shadow("#CCCCCC", 0, 0, 3);
self.btnSprite.cache(self.btnSprite.x,self.btnSprite.y,200,200);
};

this.Enable=function(){

this.btnSprite.gotoAndStop("enabled");
this.btnText.color="#000000";
this.btnText3.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 3);
this.btnText2.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 3);
this.btnText.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 3);

self.btnSprite.cache(self.btnSprite.x,self.btnSprite.y,200,200);
};

this.ChangeText=function(newText){

this.btnText.text=newText;
this.btnText2.text=newText;
this.btnText3.text=newText;
	
};


this.btnSprite.addEventListener("mouseover",function(ev){
	
	if(ev.currentTarget.currentAnimation=="enabled"){
	ev.currentTarget.gotoAndStop("onover");
	}
	self.btnSprite.cache(self.btnSprite.x,self.btnSprite.y,200,200);
	});
	
this.btnSprite.addEventListener("mouseout",function(ev){
	
	if(ev.currentTarget.currentAnimation=="onover"){
	ev.currentTarget.gotoAndStop("enabled");
	}
	self.btnSprite.cache(self.btnSprite.x,self.btnSprite.y,200,200);
	});	
this.btnSprite.addEventListener("mousedown",function(ev){
	
	if(ev.currentTarget.currentAnimation!="disabled"){
	ev.currentTarget.gotoAndStop("pressed");
	}
	self.btnSprite.cache(self.btnSprite.x,self.btnSprite.y,200,200);
	});
	
this.btnSprite.addEventListener("pressup",function(ev){
	
	if(ev.currentTarget.currentAnimation!="disabled"){
	ev.currentTarget.gotoAndStop("onover");
	
	ActionButtons(self.btnSprite.name);
	
	}
	self.btnSprite.cache(self.btnSprite.x,self.btnSprite.y,200,200);
	});	


	
}




/////////////UI class////////////////////
function GameUI(){

GameObj.apply(this);	

this.cResources	=new Array("img/ui/fieldbackground.png","img/ui/fieldbackground2.png","img/ui/b_gamble.png"
,"img/ui/b_gamble_black.png","img/ui/b_gamble_red.png","img/ui/b_paytable.png","img/ui/b_plus.png"
,"img/ui/b_skip.png","img/ui/b_start.png","img/ui/blink.png");	


this.Create=function(){

////objects
this.cObjects['view']=new createjs.Container();
this.cObjects['ui_bg']=new createjs.Bitmap(this.cImages['fieldbackground']);
this.cObjects['view'].addChild(this.cObjects['ui_bg']);
this.cObjects['ui_bg'].set({x:-10,y:0});
this.cObjects['view'].set({x:150,y:836});
this.cObjects['view'].set({scaleX:1.135,scaleY:1.15,x:-4,y:913});

///text labels

this.cObjects['ui_lbl_credit']=new createjs.Text("Credits", "14px VerdanaBold", "#FFFFFF");
this.cObjects['ui_lbl_credit'].set({textAlign:"center",x:108,y:9});

this.cObjects['ui_lbl_lw']=new createjs.Text("Last Win", "14px VerdanaBold", "#FFFFFF");
this.cObjects['ui_lbl_lw'].set({textAlign:"center",x:1125,y:9});

this.cObjects['ui_lbl_lines']=new createjs.Text("Lines", "14px VerdanaBold", "#FFFFFF");
this.cObjects['ui_lbl_lines'].set({textAlign:"center",x:420,y:98});

this.cObjects['ui_lbl_betline']=new createjs.Text("Bet/Line", "14px VerdanaBold", "#FFFFFF");
this.cObjects['ui_lbl_betline'].set({textAlign:"center",x:615,y:98});

this.cObjects['ui_lbl_bet']=new createjs.Text("Bet", "14px VerdanaBold", "#FFFFFF");
this.cObjects['ui_lbl_bet'].set({textAlign:"center",x:806,y:98});

///text counters

this.cObjects['ui_cnt_credit']=new createjs.Text("1000", "28px VerdanaBold", "#FFFF00");
this.cObjects['ui_cnt_credit'].set({textAlign:"center",x:108,y:34});
this.cObjects['ui_cnt_credit'].shadow = new createjs.Shadow("#000000", 0, 0, 4);

this.cObjects['ui_cnt_lw']=new createjs.Text("0", "27px VerdanaBold", "#FFFF00");
this.cObjects['ui_cnt_lw'].set({textAlign:"center",x:1130,y:34});
this.cObjects['ui_cnt_lw'].shadow = new createjs.Shadow("#000000", 0, 0, 4);

this.cObjects['ui_cnt_lines']=new createjs.Text("10", "22px VerdanaBold", "#FFFF00");
this.cObjects['ui_cnt_lines'].set({textAlign:"center",x:416,y:134});
this.cObjects['ui_cnt_lines'].shadow = new createjs.Shadow("#000000", 0, 0, 4);

this.cObjects['ui_cnt_betline']=new createjs.Text("1", "22px VerdanaBold", "#FFFF00");
this.cObjects['ui_cnt_betline'].set({textAlign:"center",x:617,y:134});
this.cObjects['ui_cnt_betline'].shadow = new createjs.Shadow("#000000", 0, 0, 4);

this.cObjects['ui_cnt_bet']=new createjs.Text("10", "22px VerdanaBold", "#FFFF00");
this.cObjects['ui_cnt_bet'].set({textAlign:"center",x:808,y:134});
this.cObjects['ui_cnt_bet'].shadow =new createjs.Shadow("#000000", 0, 0, 4);

///////////info text

this.cObjects['ui_inf_text']=new createjs.Text("Please place your bet", "34px VerdanaBold", "#FFFF00");
this.cObjects['ui_inf_text'].set({textAlign:"center",x:615,y:24});
this.cObjects['ui_inf_text'].shadow = new createjs.Shadow("#000000", 0, 0, 4);

///////////add stage
//this.cObjects['view'].addChild(this.cObjects['ui_lbl_credit']);
//this.cObjects['view'].addChild(this.cObjects['ui_lbl_lw']);
this.cObjects['view'].addChild(this.cObjects['ui_lbl_lines']);
this.cObjects['view'].addChild(this.cObjects['ui_lbl_betline']);
this.cObjects['view'].addChild(this.cObjects['ui_lbl_bet']);

//this.cObjects['view'].addChild(this.cObjects['ui_cnt_credit']);
//this.cObjects['view'].addChild(this.cObjects['ui_cnt_lw']);
this.cObjects['view'].addChild(this.cObjects['ui_cnt_lines']);
this.cObjects['view'].addChild(this.cObjects['ui_cnt_betline']);
this.cObjects['view'].addChild(this.cObjects['ui_cnt_bet']);

//this.cObjects['view'].addChild(this.cObjects['ui_inf_text']);

this.CreateButtons();

};	
var self=this;
this.LockButtons=function(){

this.cObjects['ui_btnAuto'].Disable();	
this.cObjects['ui_btnHelp'].Disable();	
this.cObjects['ui_btnGamble'].Disable();	
this.cObjects['ui_btnSpin'].Disable();	
this.cObjects['ui_btnBetMinus'].Disable();	
this.cObjects['ui_btnBetPlus'].Disable();		
this.cObjects['ui_btnLinesMinus'].Disable();	
this.cObjects['ui_btnLinesPlus'].Disable();	

this.cObjects['ui_btnSpin'].HideBlink();
this.cObjects['ui_btnGamble'].HideBlink();	

this.cObjects['ui_btnRed'].Disable();	
this.cObjects['ui_btnBlack'].Disable();	
this.cObjects['ui_btnRed'].HideBlink();
this.cObjects['ui_btnBlack'].HideBlink();

if(gameInfo.autoStart){
this.cObjects['ui_btnAuto'].Enable();	
this.cObjects['ui_btnAuto'].ChangeText("Autostop");

}else{
this.cObjects['ui_btnAuto'].ChangeText("Autoplay");	
}
	
};

this.CreateButtons=function(){

this.cObjects['ui_btnAuto']=new ButtonUI("Autoplay","btn_auto",this.cImages['b_start'],new Image());
this.cObjects['ui_btnHelp']=new ButtonUI("Paytable","btn_info",this.cImages['b_paytable'],new Image());


this.cObjects['ui_btnRed']=new ButtonUI("Red","btn_red",this.cImages['b_gamble_red'],new Image());
this.cObjects['ui_btnBlack']=new ButtonUI("Black","btn_black",this.cImages['b_gamble_black'],new Image());

this.cObjects['ui_btnGamble']=new ButtonUI("Gamble","btn_gamble",this.cImages['b_gamble'],this.cImages['blink']);
this.cObjects['ui_btnSpin']=new ButtonUI("Start","btn_spin",this.cImages['b_start'],this.cImages['blink']);

this.cObjects['ui_btnSkip']=new ButtonUI("Start","btn_spin",this.cImages['b_skip'],this.cImages['blink']);

this.cObjects['ui_btnLinesMinus']=new ButtonUI("-","btn_lines_minus",this.cImages['b_plus'],new Image());
this.cObjects['ui_btnLinesPlus']=new ButtonUI("+","btn_lines_plus",this.cImages['b_plus'],new Image());

this.cObjects['ui_btnBetMinus']=new ButtonUI("-","btn_bet_minus",this.cImages['b_plus'],new Image());
this.cObjects['ui_btnBetPlus']=new ButtonUI("+","btn_bet_plus",this.cImages['b_plus'],new Image());


this.cObjects['ui_btnAuto'].cButton.set({x:5,y:98,scaleX:0.97});
this.cObjects['ui_btnRed'].cButton.set({x:5,y:98,scaleX:0.97});
this.cObjects['ui_btnHelp'].cButton.set({x:178,y:98,scaleX:0.97});
this.cObjects['ui_btnBlack'].cButton.set({x:178,y:98,scaleX:0.97});
this.cObjects['ui_btnBetMinus'].cButton.set({x:493,y:122,scaleX:0.97,scaleY:0.98});
this.cObjects['ui_btnBetPlus'].cButton.set({x:680,y:122,scaleX:0.97,scaleY:0.98});
this.cObjects['ui_btnLinesMinus'].cButton.set({x:350,y:122,scaleX:0.97,scaleY:0.98});
this.cObjects['ui_btnLinesPlus'].cButton.set({x:440,y:122,scaleX:0.97,scaleY:0.98});
this.cObjects['ui_btnSpin'].cButton.set({x:1041,y:98,scaleX:0.97});
this.cObjects['ui_btnSkip'].cButton.set({x:1041,y:98,scaleX:0.97});
this.cObjects['ui_btnGamble'].cButton.set({x:870,y:98,scaleX:0.97});

/////add stage



this.cObjects['view'].addChild(this.cObjects['ui_btnAuto'].cButton);
this.cObjects['view'].addChild(this.cObjects['ui_btnHelp'].cButton);
this.cObjects['view'].addChild(this.cObjects['ui_btnRed'].cButton);
this.cObjects['view'].addChild(this.cObjects['ui_btnBlack'].cButton);
this.cObjects['view'].addChild(this.cObjects['ui_btnGamble'].cButton);	
this.cObjects['view'].addChild(this.cObjects['ui_btnSpin'].cButton);	
this.cObjects['view'].addChild(this.cObjects['ui_btnSkip'].cButton);	
this.cObjects['view'].addChild(this.cObjects['ui_btnBetMinus'].cButton);	
this.cObjects['view'].addChild(this.cObjects['ui_btnBetPlus'].cButton);	
this.cObjects['view'].addChild(this.cObjects['ui_btnLinesMinus'].cButton);	
this.cObjects['view'].addChild(this.cObjects['ui_btnLinesPlus'].cButton);	
	

};


this.UpdateCounters=function(){
	
gameUI.cObjects['ui_cnt_credit'].text=gameInfo.credit;	
gameUI.cObjects['ui_cnt_bet'].text=gameInfo.bet;	
gameUI.cObjects['ui_cnt_betline'].text=gameInfo.betline;	
gameUI.cObjects['ui_cnt_lines'].text=gameInfo.lines;	

}
this.UpdateButtons=function(){
	
this.cObjects['ui_btnAuto'].Disable();	
this.cObjects['ui_btnHelp'].Disable();	
this.cObjects['ui_btnGamble'].Disable();	
this.cObjects['ui_btnSpin'].Disable();	
this.cObjects['ui_btnSkip'].Disable();	
this.cObjects['ui_btnRed'].cButton.visible=false;	
this.cObjects['ui_btnBlack'].cButton.visible=false;	
this.cObjects['ui_btnSkip'].cButton.visible=false;	
this.cObjects['ui_btnBetMinus'].Disable();	
this.cObjects['ui_btnBetPlus'].Disable();		
this.cObjects['ui_btnLinesMinus'].Disable();	
this.cObjects['ui_btnLinesPlus'].Disable();	

this.cObjects['ui_btnSpin'].HideBlink();
this.cObjects['ui_btnGamble'].HideBlink();
this.cObjects['ui_btnSkip'].HideBlink();	
this.cObjects['ui_btnRed'].HideBlink();
this.cObjects['ui_btnBlack'].HideBlink();	
	
if(GameEvent=="betting" || GameEvent=="info_is_open"){
	
this.cObjects['ui_btnSpin'].ChangeText("Start");

this.cObjects['ui_btnAuto'].Enable();	
this.cObjects['ui_btnHelp'].Enable();	
	
this.cObjects['ui_btnSpin'].Enable();		
this.cObjects['ui_btnBetMinus'].Enable();	
this.cObjects['ui_btnBetPlus'].Enable();		
this.cObjects['ui_btnLinesMinus'].Enable();		
this.cObjects['ui_btnLinesPlus'].Enable();	
this.cObjects['ui_btnSpin'].ShowBlink();	


	
}else if(GameEvent=="takewin"){
	

	
this.cObjects['ui_btnGamble'].Enable();		
this.cObjects['ui_btnSpin'].Enable();		

this.cObjects['ui_btnSpin'].ChangeText("Collect");

this.cObjects['ui_btnSpin'].ShowBlink();
this.cObjects['ui_btnGamble'].ShowBlink();
	
}else if(GameEvent=="spin"){
	

this.cObjects['ui_btnSkip'].cButton.visible=true;	
this.cObjects['ui_btnSkip'].Enable();		



this.cObjects['ui_btnSkip'].ShowBlink();

	
}else if(GameEvent=="double_is_open"){
	
this.cObjects['ui_btnSpin'].ChangeText("Collect");
this.cObjects['ui_btnSpin'].Enable();
this.cObjects['ui_btnSpin'].ShowBlink();
this.cObjects['ui_btnRed'].cButton.visible=true;	
this.cObjects['ui_btnBlack'].cButton.visible=true;	

this.cObjects['ui_btnRed'].Enable();	
this.cObjects['ui_btnBlack'].Enable();	

this.cObjects['ui_btnRed'].ShowBlink();
this.cObjects['ui_btnBlack'].ShowBlink();
	
}		
	
	
if(gameInfo.autoStart){
this.cObjects['ui_btnAuto'].Enable();	
this.cObjects['ui_btnAuto'].ChangeText("Autostop");

}else{
this.cObjects['ui_btnAuto'].ChangeText("Autoplay");	
}
	
};



	
}