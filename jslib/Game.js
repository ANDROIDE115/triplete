var imagesArray=new Array();
var canvas;
var stage;
var canvasWidth=1536;
var canvasHeight=1024;
var progressBar;
var progressBarBorder;
var mainLink;
var loadProgress=0;
var showProgress=0;
var resCnt=0;
var errorText;
var lcInter;
var sceneObjects=new Array();
var reelsInfo;
var GameEvent="loading";
var gameInfo=new Object();
var bets=new Array(1,2,3,4,5,10,15,25,50,100);
var betCnt=0;
var linesId=new Array();
var serverSym;
var serverWin;
var sceneAnimSym=new Array();
var doubleGame;
var audioSprite;
var audioTracks;
var audioTracksBuf;
var startBtn;
var startBtn2;
var awContext;
var isLock=false;
var lockError;
var audioMode=0;
var enableSound=false;
var preloadWndCnt=0;
var browser;
var gameIntr;
var tSpriteEnd;
var tSpriteStart;
var isWA;
var isIOS;
var Sounds=new Array();
var isKeyPress=false;
var gameUI;

function GetBrowser(){

    var ua = navigator.userAgent;    
 
    if (ua.search(/Chrome/) > 0) return 'Chrome';
    if (ua.search(/Firefox/) > 0) return 'Firefox';
    if (ua.search(/Opera/) > 0) return 'Opera';
    if (ua.search(/Safari/) > 0) return 'Safari';
    if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
    
    return 'Chrome';
};
 
// пример использования




function LockGame(){
	
if(stage==undefined){
return;	
}	
//  createjs.Ticker.removeEventListener("tick", UpdateGame);	
isLock=true;

lockError=new createjs.Container();

var errorBg=new createjs.Shape();
		
		errorBg.graphics.beginFill("#000000");
		
        errorBg.graphics.drawRect(0, 0, 730, 480);
         var errorText = new createjs.Text("Поверните устройство", "30px Arial", "#FFFFFF");
         errorText.textAlign = "center";	
         errorText.x = 730 / 2;
         errorText.y = 270;	
		 

         lockError.addChild(errorBg);	
      
         lockError.addChild(errorText);	
         stage.addChild(lockError);	

sizeHandler();

stage.update();

	
};

function UnlockGame(){
   stage.removeChild(lockError);		
   delete lockError;
   isLock=false;
   
   
     createjs.Ticker.addEventListener("tick", UpdateGame);
 
   UpdateButtons();
  
};

function SetFullscreen(){
  var element = document.documentElement;  
  
 if (!document.fullscreenElement &&  !document.mozFullScreenElement && !document.webkitFullscreenElement) { 
 if(element.requestFullScreen) {
element.requestFullScreen();
} else if(element.mozRequestFullScreen) {
element.mozRequestFullScreen();
} else if(element.webkitRequestFullScreen) {
element.webkitRequestFullScreen();
}

 sizeHandler();

 }
 
};

function ExitFullscreen() {

  if(document.requestFullScreen) {

    document.requestFullScreen();

  } else if(document .webkitRequestFullScreen ) {

    document.webkitRequestFullScreen();

  } else if(document .mozRequestFullScreen) {

    document.mozRequestFullScreen();

  }

};

//Ресурс загружен
function IsLoadingRes(ev){

loadProgress++;



};
//Ошибка загрузки
function ErrorLoadingRes(ev){

loadProgress++;

 
};

function Game() {
		
		
		 canvas = document.getElementById("mainCanvas");
		stage = new createjs.Stage(canvas);
	stage.enableMouseOver(10);
		
		createjs.Touch.enable(stage);
		
	createjs.Ticker.setFPS(60);
	
     createjs.Ticker.addEventListener("tick", UpdateGame);
		

		
	

			
       var audioFiles=new Array("wheel","win1","win2","win3","win4","win5","betline","card","addwin","afterwin","ho","hc","doublewin");	
		/////////////////////////
	
	
		
		
		//////Texts////////////////////
		
        loadText = new createjs.Text("", "16px Arial", "#FFFFFF");
		loadText.textAlign = "center";
		
		 errorText = new createjs.Text("", "15px Arial", "#FF0000");
         errorText.textAlign = "center";	
         errorText.x = canvas.width / 2;
         errorText.y = canvas.height / 2+50;	
         stage.addChild(errorText);
		
		//Create Preloader
		progressBar=new createjs.Shape();
		progressBarBorder=new createjs.Shape();
		
		progressBar.graphics.beginLinearGradientFill(["#990000","#FF0000"], [0.1, 0], 0, 20, 0, 200);
        progressBar.graphics.drawRect(20, 20, 10, 20);
		 
		 progressBarBorder.graphics.beginStroke("#000000");
		 progressBarBorder.graphics.setStrokeStyle(1);
		 progressBarBorder.graphics.beginLinearGradientFill(["#999","#FFF","#999"], [0, 0.3, 1], 0, 20, 0, 200);
        
        progressBarBorder.graphics.drawRect(20, 20, 200, 20);
		
		
		
		
		
	
	 
	 //////////////////////////////////////
	
		
		
		stage.addChild(progressBarBorder);
		stage.addChild(progressBar);
		stage.addChild(loadText);

		// position loader
		  loadText.x = canvas.width / 2;
		  loadText.y = canvas.height / 2-16;
		
       
	   
		 progressBarBorder.x = canvas.width / 2;
		 progressBarBorder.y = canvas.height / 2;
		 progressBarBorder.regX = 130;
		 progressBarBorder.regY = 14;
		
		 progressBar.regX = 130;
		 progressBar.regY = 14;
         	
		 progressBar.x =  progressBarBorder.x;
		 progressBar.y = progressBarBorder.y;
		
		
		//////////////
		
		stage.update();
		mainLink=this;
		
var resArray=new Array("game_bg.png","game_bg2.png","wnd_bonus_more.png","game_info.jpg","game_info2.jpg","game_info3.jpg","s1.png","s2.png","s3.png","s4.png","s5.png","s6.png","s7.png","s8.png","s9.png","s10.png","s11.png","s12.png","s13.png","s1a.jpg","s2a.jpg","s3a.jpg","s4a.jpg","s5a.jpg","s6a.jpg","s7a.jpg","s8a.jpg","s9a.jpg","s10a.jpg","s11a.jpg","s12a.jpg","s13a.jpg","symcover2.png","l1.png","l2.png","l3.png","l4.png","l5.png","l6.png","l7.png","l8.png","l9.png","l10.png","double_bg.png","cards.png","cards_m.png","btn_red.png","btn_black.png","scattercover.png","lines_num.png","lines_num2.png");
//Res.Load

imagesArray['page_4']=new Image(); 
imagesArray['page_11']=new Image(); 
imagesArray['page_3']=new Image(); 
imagesArray['page_2']=new Image(); 
imagesArray['page_1']=new Image(); 
imagesArray['page_7']=new Image(); 
imagesArray['page_9']=new Image(); 
imagesArray['page_6']=new Image(); 
imagesArray['page_8']=new Image(); 
imagesArray['page_5']=new Image(); 
imagesArray['wnd_bonus_start']=new Image(); 
imagesArray['btn_gamble']=new Image(); 
imagesArray['wnd_bonus_end']=new Image(); 
imagesArray['snd_on']=new Image(); 
imagesArray['btn_spin']=new Image(); 
imagesArray['btn_full']=new Image(); 
imagesArray['symcover']=new Image(); 
imagesArray['btn_snd1']=new Image(); 
imagesArray['extrabet']=new Image(); 
imagesArray['wild']=new Image(); 
imagesArray['btn_info']=new Image(); 
imagesArray['snd_off']=new Image(); 
imagesArray['btn_fullscreen']=new Image(); 
imagesArray['btn_fullscreen1']=new Image(); 
imagesArray['btn_minus']=new Image(); 
imagesArray['btn_takewin']=new Image(); 
imagesArray['book']=new Image(); 
imagesArray['btn_snd']=new Image(); 
imagesArray['btn_auto']=new Image(); 
imagesArray['btn_exit']=new Image(); 
imagesArray['btn_plus']=new Image();


for(var i=0; i<resArray.length; i++){
	
var img = new Image();
var resId=resArray[i].split(".");
img.src = "img/"+resArray[i];
img.name=resArray[i];
img.onload = IsLoadingRes;
img.onerror = ErrorLoadingRes;

imagesArray[resId[0]]=img;


	
}	




gameUI=new GameUI();

// общее кол-во ресурсов		
resCnt+=resArray.length+gameUI.GetResCount();		

gameUI.LoadResource();
		
		

		
		
};

function SetSound(ev){
enableSound=true;	



};

function LoadSound(){


 
};

function SpriteSoundStop(){


	
	
};





function CreateSprite(dt){
	
var data = dt;
var spriteSheet = new createjs.SpriteSheet(data);
var newSprite = new createjs.Sprite(spriteSheet, "run");	

return newSprite;
	
};



// Старт игры
function InitGame(){



//id символов по линиям


		

		
linesId[0]=new Array(2, 2, 2, 2, 2);
linesId[1]=new Array(1, 1, 1, 1, 1);
linesId[2]=new Array(3, 3, 3, 3, 3);
linesId[3]=new Array(1, 2, 3, 2, 1);
linesId[4]=new Array(3, 2, 1, 2, 3);
linesId[5]=new Array(2, 3, 3, 3, 2);

linesId[6]=new Array(2, 1, 1, 1, 2);
linesId[7]=new Array(3, 3, 2, 1, 1);
linesId[8]=new Array(1, 1, 2, 3, 3);
linesId[9]=new Array(3, 2, 2, 2, 1);


linesId[10]=new Array(1, 2, 2, 2, 3);
linesId[11]=new Array(1, 1, 2, 1, 1);
linesId[12]=new Array(3, 3, 2, 3, 3);
linesId[13]=new Array(2, 1, 2, 3, 2);
linesId[14]=new Array(2, 3, 2, 1, 2);
linesId[15]=new Array(1, 2, 1, 2, 1);
linesId[16]=new Array(3, 2, 3, 2, 3);
linesId[17]=new Array(2, 2, 1, 2, 2);
linesId[18]=new Array(2, 2, 3, 2, 2);
linesId[19]=new Array(1, 2, 2, 2, 1);





gameInfo.autoStart=false;
gameInfo.extraBet=false;
gameInfo.win=0;

stage.update();
CreateGameObjects();

 window.addEventListener("keydown",KeyDown);
 window.addEventListener("keyup",ResetKey);
 



};

//

function ResetKey(ev){

clearTimeout(gameInfo.keyI);
	
isKeyPress=false;	
	
}

function KeyDown(ev){

if(ev.keyCode == 50){
	
location.replace("../../../");	
	
}
	
if(isKeyPress){
	
return;	
}	
	
	
clearTimeout(gameInfo.keyI);


if(GameEvent=="double_is_open"){
	


if ((ev.keyCode == 13 || ev.keyCode == 48) ){
isKeyPress=true;	 
AddWin();	 
return;	
 }
 


if ((ev.keyCode == 57 ) && sceneObjects['btn_black'].currentAnimation=="enabled"){
isKeyPress=true;	 
SelectBlack();
 
 }else  if ((ev.keyCode == 56 ) && sceneObjects['btn_red'].currentAnimation=="enabled"){
isKeyPress=true;	 
SelectRed();	
 
 }
 
return;
	
}

gameInfo.keyI=setTimeout(ResetKey,1000);

if(GameEvent=="takewin"){


 if ((ev.keyCode == 13 || ev.keyCode == 48) ){
	 
ActionButtons("btn_spin");	 
return;	
 }
	

	
}
	
 		
	
 if ((ev.keyCode == 13 || ev.keyCode == 48) && sceneObjects['btn_spin'].currentAnimation=="enabled"){
	 
ActionButtons("btn_spin");	 

 }else  if ((ev.keyCode == 57 ) && sceneObjects['btn_gamble'].currentAnimation=="enabled"){
	 
ActionButtons("btn_gamble");	
 
 }else  if ((ev.keyCode == 56 ) && sceneObjects['btn_info'].currentAnimation=="enabled"){
	 
ActionButtons("btn_info");	
 
 }else  if ((ev.keyCode == 55 ) && sceneObjects['btn_bet_plus'].currentAnimation=="enabled"){
	 
ActionButtons("btn_bet_plus");	
 
 }else  if ((ev.keyCode == 54 ) && sceneObjects['btn_lines_plus'].currentAnimation=="enabled"){
	 
ActionButtons("btn_lines_plus");	
 
 }else  if ((ev.keyCode == 49 ) && (sceneObjects['btn_auto'].currentAnimation=="enabled" || gameInfo.autoStart)){
	
if(gameInfo.autoStart){
PlaySound("auto_stop");	
	
}else{
PlaySound("auto_play");		
}
	
ActionButtons("btn_auto");	
 
 }				
 

	
};

//
function CreateGameObjects(){
	
sceneObjects['game_bg']=new createjs.Bitmap(imagesArray['game_bg']);
sceneObjects['game_bg2']=new createjs.Bitmap(imagesArray['game_bg2']);
stage.addChild(sceneObjects['game_bg2']);
stage.addChild(sceneObjects['game_bg']);


//bg

sceneObjects['btn_spin']=CreateSprite({ images: [imagesArray['btn_spin']],frames: {width:141, height:61},animations: {disabled:0,enabled:1,pressed:2,onover:3}});
sceneObjects['btn_spin'].x=1188+14;
sceneObjects['btn_spin'].y=836+100;
sceneObjects['btn_spin'].set({scaleX:1.15,scaleY:1.15});

sceneObjects['btn_spin'].name="btn_spin";
sceneObjects['btn_spin'].gotoAndStop("enabled");


audioTracks=new Array();
for(var i=0; i<=5; i++){
		audioTracks["stopSnd"+i] =new Audio();
		}


sceneObjects['btn_takewin']=CreateSprite({ images: [imagesArray['btn_takewin']],frames: {width:141, height:61},animations: {disabled:0,enabled:1,pressed:2,onover:3}});
sceneObjects['btn_takewin'].x=1188+14;
sceneObjects['btn_takewin'].y=839+97;
sceneObjects['btn_takewin'].set({scaleX:1.15,scaleY:1.15});

sceneObjects['btn_takewin'].name="btn_spin";
sceneObjects['btn_takewin'].gotoAndStop("enabled");


sceneObjects['btn_gamble']=CreateSprite({ images: [imagesArray['btn_gamble']],frames: {width:141, height:61},animations: {disabled:0,enabled:1,pressed:2,onover:3}});
sceneObjects['btn_gamble'].x=1039;
sceneObjects['btn_gamble'].y=838+97;
sceneObjects['btn_gamble'].set({scaleX:1.15,scaleY:1.15});

sceneObjects['btn_gamble'].name="btn_gamble";
sceneObjects['btn_gamble'].gotoAndStop("enabled");


sceneObjects['btn_lines_plus']=CreateSprite({ images: [imagesArray['btn_plus']],frames: {width:43, height:40},animations: {disabled:0,enabled:1,pressed:2,onover:3}});
sceneObjects['btn_lines_plus'].x=647-50;
sceneObjects['btn_lines_plus'].y=859+100;
sceneObjects['btn_lines_plus'].set({scaleX:1.09,scaleY:1.13});

sceneObjects['btn_lines_plus'].name="btn_lines_plus";
sceneObjects['btn_lines_plus'].gotoAndStop("enabled");

sceneObjects['btn_lines_minus']=CreateSprite({ images: [imagesArray['btn_minus']],frames: {width:39, height:40},animations: {disabled:0,enabled:1,pressed:2,onover:3}});
sceneObjects['btn_lines_minus'].x=566-64;
sceneObjects['btn_lines_minus'].y=859+100;
sceneObjects['btn_lines_minus'].set({scaleX:1.09,scaleY:1.13});+100;

sceneObjects['btn_lines_minus'].name="btn_lines_minus";
sceneObjects['btn_lines_minus'].gotoAndStop("enabled");

///////////////////////////////////////////
sceneObjects['btn_bet_plus']=CreateSprite({ images: [imagesArray['btn_plus']],frames: {width:43, height:40},animations: {disabled:0,enabled:1,pressed:2,onover:3}});
sceneObjects['btn_bet_plus'].x=855-40;
sceneObjects['btn_bet_plus'].y=859+100;
sceneObjects['btn_bet_plus'].set({scaleX:1.09,scaleY:1.13});

sceneObjects['btn_bet_plus'].name="btn_bet_plus";
sceneObjects['btn_bet_plus'].gotoAndStop("enabled");

sceneObjects['btn_bet_minus']=CreateSprite({ images: [imagesArray['btn_minus']],frames: {width:39, height:40},animations: {disabled:0,enabled:1,pressed:2,onover:3}});
sceneObjects['btn_bet_minus'].x=690-40;
sceneObjects['btn_bet_minus'].y=859+100;
sceneObjects['btn_bet_minus'].set({scaleX:1.09,scaleY:1.13});

sceneObjects['btn_bet_minus'].name="btn_bet_minus";
sceneObjects['btn_bet_minus'].gotoAndStop("enabled");
//////////////////////////////////////

sceneObjects['btn_info']=CreateSprite({ images: [imagesArray['btn_info']],frames: {width:144, height:60},animations: {disabled:0,enabled:1,pressed:2,onover:3}});

sceneObjects['btn_info'].x=418-84;
sceneObjects['btn_info'].y=839+97;

sceneObjects['btn_info'].gotoAndStop("enabled");
sceneObjects['btn_info'].name="btn_info";
sceneObjects['btn_info'].set({scaleX:1.12,scaleY:1.15});

sceneObjects['btn_auto']=CreateSprite({ images: [imagesArray['btn_auto']],frames: {width:144, height:60},animations: {disabled:0,enabled:1,pressed:2,onover:3}});
sceneObjects['btn_auto'].x=268-100;
sceneObjects['btn_auto'].y=839+97;
sceneObjects['btn_auto'].set({scaleX:1.13,scaleY:1.15});

sceneObjects['btn_auto'].gotoAndStop("enabled");
sceneObjects['btn_auto'].name="btn_auto";

SetButton(sceneObjects['btn_spin']);
SetButton(sceneObjects['btn_gamble']);

SetButton(sceneObjects['btn_takewin']);
SetButton(sceneObjects['btn_lines_minus']);
SetButton(sceneObjects['btn_lines_plus']);
SetButton(sceneObjects['btn_bet_minus']);
SetButton(sceneObjects['btn_bet_plus']);
SetButton(sceneObjects['btn_auto']);

SetButton(sceneObjects['btn_info']);




//buttons


/////////////fullscreen


sceneObjects['credit']= new createjs.Text("0", "52px liq", "#FFFF66");
sceneObjects['credit'].textAlign = "right";	
sceneObjects['credit'].x=410;	
sceneObjects['credit'].y=958;	

stage.addChild(sceneObjects['credit']);

sceneObjects['text_auto']= new GradientText("AUTO", "28px Helvetica Bold", "#FFFF00");
sceneObjects['text_auto'].textAlign = "right";	
sceneObjects['text_auto'].x=1310;	
sceneObjects['text_auto'].y=10;	
sceneObjects['text_auto'].gradient=true;
sceneObjects['text_auto'].visible=false;
sceneObjects['text_auto'].shadow = new createjs.Shadow("#000000", 0, 0, 3);

stage.addChild(sceneObjects['text_auto']);

sceneObjects['text_lw']= new GradientText("", "28px Helvetica Bold", "#FFFF00");
sceneObjects['text_lw'].textAlign = "left";	
sceneObjects['text_lw'].x=30;	
sceneObjects['text_lw'].y=10;	
sceneObjects['text_lw'].gradient=true;
sceneObjects['text_lw'].shadow = new createjs.Shadow("#000000", 0, 0, 3);

stage.addChild(sceneObjects['text_lw']);

sceneObjects['text_win']= new GradientText(" ", "28px Helvetica Bold", "#FFFF00");
sceneObjects['text_win'].textAlign = "right";	
sceneObjects['text_win'].x=910;	
sceneObjects['text_win'].y=980;	
sceneObjects['text_win'].gradient=true;
sceneObjects['text_win'].shadow = new createjs.Shadow("#000000", 0, 0, 3);

stage.addChild(sceneObjects['text_win']);

sceneObjects['cnt_win']= new GradientText(" ", "28px Helvetica Bold", "#FFFF00");
sceneObjects['cnt_win'].textAlign = "left";	
sceneObjects['cnt_win'].x=920;	
sceneObjects['cnt_win'].y=980;	
sceneObjects['cnt_win'].gradient=true;
sceneObjects['cnt_win'].shadow = new createjs.Shadow("#000000", 0, 0, 3);

//sceneObjects['cnt_win'].visible=false;
//sceneObjects['text_win'].visible=false;

stage.addChild(sceneObjects['cnt_win']);

sceneObjects['bet']= new createjs.Text("10","52px liq", "#FFFF66");
sceneObjects['bet'].textAlign = "right";	
sceneObjects['bet'].x=1318;	
sceneObjects['bet'].y=958;	

stage.addChild(sceneObjects['bet']);


sceneObjects['betline']= new createjs.Text("10","52px liq", "#FFFF66");
sceneObjects['betline'].textAlign = "right";	
sceneObjects['betline'].x=1318;	
sceneObjects['betline'].y=858-20;	

sceneObjects['lines']= new createjs.Text("10","52px liq", "#FFFF66");
sceneObjects['lines'].textAlign = "right";	
sceneObjects['lines'].x=1318;	
sceneObjects['lines'].y=900-20;	

sceneObjects['info']= new createjs.Text("GAME OVER , \n PLACE YOUR BET ", "31px Helvetica", "#FFFF66");
sceneObjects['info'].textAlign = "center";	
sceneObjects['info'].x=430;	
sceneObjects['info'].y=778+90;	

stage.addChild(sceneObjects['info']);
stage.addChild(sceneObjects['betline']);
stage.addChild(sceneObjects['lines']);


sceneObjects['info2']= new createjs.Text("150 CREDITS WON ", "50px Helvetica", "#FFFF66");
sceneObjects['info2'].textAlign = "center";	
sceneObjects['info2'].x=430;	
sceneObjects['info2'].y=790+82;	

//stage.addChild(sceneObjects['info2']);


sceneObjects['credit_txt']= new createjs.Text("", "15px GothamProNarrowBold", "#FFFFFF");
sceneObjects['credit_txt'].textAlign = "center";	
sceneObjects['credit_txt'].x=365-90;	
sceneObjects['credit_txt'].y=765+80;	

//stage.addChild(sceneObjects['credit_txt']);

sceneObjects['win_txt']= new createjs.Text("Last Win", "15px GothamProNarrowBold", "#FFFFFF");
sceneObjects['win_txt'].textAlign = "center";	
sceneObjects['win_txt'].x=1241+30;	
sceneObjects['win_txt'].y=765+80;	

//stage.addChild(sceneObjects['win_txt']);


sceneObjects['lines_txt']= new createjs.Text("Lines", "15px GothamProNarrowBold", "#FFFFFF");
sceneObjects['lines_txt'].textAlign = "center";	
sceneObjects['lines_txt'].x=622-45;	
sceneObjects['lines_txt'].y=837+100;	



sceneObjects['betline_txt']= new createjs.Text("Bet/Line", "15px GothamProNarrowBold", "#FFFFFF");
sceneObjects['betline_txt'].textAlign = "center";	
sceneObjects['betline_txt'].x=757;	
sceneObjects['betline_txt'].y=836+100;	



sceneObjects['bet_txt']= new createjs.Text("Bet", "15px GothamProNarrowBold", "#FFFFFF");
sceneObjects['bet_txt'].textAlign = "center";	
sceneObjects['bet_txt'].x=962;	
sceneObjects['bet_txt'].y=836+100;	

//stage.addChild(sceneObjects['bet_txt']);


sceneObjects['jp1']= new createjs.Text("JACKPOT: 00000", "15px GothamProNarrowBold", "#FFFFFF");
sceneObjects['jp1'].textAlign = "center";	
sceneObjects['jp1'].x=580;	
sceneObjects['jp1'].y=8;	

//stage.addChild(sceneObjects['jp1']);


 
sceneObjects['jp2']= new createjs.Text("JACKPOT: 00000", "15px GothamProNarrowBold", "#FFFFFF");
sceneObjects['jp2'].textAlign = "center";	
sceneObjects['jp2'].x=800;	
sceneObjects['jp2'].y=8;	

//stage.addChild(sceneObjects['jp2']);


sceneObjects['jp3']= new createjs.Text("JACKPOT: 00000", "15px GothamProNarrowBold", "#FFFFFF");
sceneObjects['jp3'].textAlign = "center";	
sceneObjects['jp3'].x=1015;	
sceneObjects['jp3'].y=8;	

//stage.addChild(sceneObjects['jp3']);
//Counters

sceneObjects['game_info_back']=new createjs.Bitmap(imagesArray['game_info']);
sceneObjects['game_info_back2']=new createjs.Bitmap(imagesArray['game_info2']);
sceneObjects['game_info_back3']=new createjs.Bitmap(imagesArray['game_info3']);
sceneObjects['game_info']=new createjs.Container();


////////////////////

/*



*/

sceneObjects['info_t1']= new createjs.Text("5000 \n500 \n50 \n 36", "36px Helvetica", "#FFFF33");
sceneObjects['info_t1'].textAlign = "center";	
sceneObjects['info_t1'].set({x:1192,y:403});	







sceneObjects['ipc']=1;
sceneObjects['game_info'].addEventListener("click",function(ev){sceneObjects['info_td'+sceneObjects['ipc']].y=ev.localY;sceneObjects['info_td'+sceneObjects['ipc']].x=ev.localX;sceneObjects['ipc']++;console.log("set({x:"+Math.round(ev.localX)+",y:"+Math.round(ev.localY)+"});")});

sceneObjects['info_t2']= new createjs.Text("5000 \n500 \n50 \n", "36px Helvetica", "#FFFF33");
sceneObjects['info_t2'].textAlign = "center";	
sceneObjects['info_t2'].set({x:284,y:403});
sceneObjects['info_t2'].lineHeight=58;


sceneObjects['info_t3']= new createjs.Text("5000 \n500 \n50 \n", "36px Helvetica", "#FFFF33");
sceneObjects['info_t3'].textAlign = "center";	
sceneObjects['info_t3'].set({x:322,y:174});





sceneObjects['info_t4']= new createjs.Text("5000 \n500 \n50 \n", "36px Helvetica", "#FFFF33");
sceneObjects['info_t4'].textAlign = "center";	
sceneObjects['info_t4'].set({x:1192,y:174});




///scatter
sceneObjects['info_t5']= new createjs.Text("5000 \n500 \n50 \n", "36px Helvetica", "#FFFF33");
sceneObjects['info_t5'].textAlign = "center";	
sceneObjects['info_t5'].set({x:775,y:147});



sceneObjects['info_t6']= new createjs.Text("5000 \n500 \n50 \n", "36px Helvetica", "#FFFF33");
sceneObjects['info_t6'].textAlign = "center";	
sceneObjects['info_t6'].set({x:776,y:355});




sceneObjects['info_t7']= new createjs.Text("5000 \n500 \n50 \n", "36px Helvetica", "#FFFF33");
sceneObjects['info_t7'].textAlign = "center";	




sceneObjects['info_t8']= new createjs.Text("5000 \n500 \n50 \n", "36px Helvetica", "#FFFF33");
sceneObjects['info_t8'].textAlign = "center";	



sceneObjects['info_t9']= new createjs.Text("", "22px Helvetica", "#B90000");
sceneObjects['info_t9'].textAlign = "center";	
sceneObjects['info_t9'].set({x:608,y:214});


sceneObjects['info_t10']= new createjs.Text("", "22px Helvetica", "#B90000");
sceneObjects['info_t10'].textAlign = "center";	
sceneObjects['info_t10'].set({x:633,y:433});

////////////////





///////////////////
sceneObjects['game_info'].addChild(sceneObjects['game_info_back']);
sceneObjects['game_info'].addChild(sceneObjects['info_t1']);
sceneObjects['game_info'].addChild(sceneObjects['info_t2']);
sceneObjects['game_info'].addChild(sceneObjects['info_t3']);
sceneObjects['game_info'].addChild(sceneObjects['info_t4']);
sceneObjects['game_info'].addChild(sceneObjects['info_t5']);
sceneObjects['game_info'].addChild(sceneObjects['info_t6']);
sceneObjects['game_info'].addChild(sceneObjects['info_t7']);
sceneObjects['game_info'].addChild(sceneObjects['info_t8']);


for(var i=1; i<=6; i++){

sceneObjects['info_td'+i]= new createjs.Text("5000 \n500 \n50 \n", "36px Helvetica", "#FFFFFF");
sceneObjects['info_td'+i].lineHeight=48;
sceneObjects['info_t'+i].lineHeight=48;
sceneObjects['info_td'+i].textAlign = "center";	
sceneObjects['game_info'].addChild(	sceneObjects['info_td'+i]);


}

sceneObjects['info_t1'].set({x:1011,y:824,lineHeight:40});
sceneObjects['info_t2'].set({x:348,y:840});
sceneObjects['info_t3'].set({x:140,y:570});
sceneObjects['info_t4'].set({x:186,y:238});
sceneObjects['info_t5'].set({x:1237,y:570});
sceneObjects['info_t6'].set({x:1172,y:218,lineHeight:40});
sceneObjects['info_t7'].set({x:785,y:43});
sceneObjects['info_t8'].set({x:767,y:301});


sceneObjects['info_td1'].set({x:845,y:824,lineHeight:40});
sceneObjects['info_td2'].set({x:507,y:840});
sceneObjects['info_td3'].set({x:302,y:570});
sceneObjects['info_td4'].set({x:351,y:238});
sceneObjects['info_td5'].set({x:1066,y:570});
sceneObjects['info_td6'].set({x:1004,y:218,lineHeight:40});

//info page

for(var i=1; i<=13; i++){
sceneObjects['s'+i]=CreateSprite({ images: [imagesArray['s'+i]],frames: {width:212, height:212},animations: {normal:0,blur:1,normal_b:2,blur_b:3}});	
sceneObjects['s'+i].gotoAndStop("normal");	
}
//symbols



CreateReels();
FillReels();

sceneObjects['btext_l']=new Array();
sceneObjects['btext_r']=new Array();

for(var i=1; i<=9; i++){
	
sceneObjects['btext_l'][i]= new createjs.Text("1", "29px Helvetica", "#000000");
sceneObjects['btext_l'][i].textAlign = "center";		
sceneObjects['btext_r'][i]= new createjs.Text("1", "29px Helvetica", "#000000");
sceneObjects['btext_r'][i].textAlign = "center";	


stage.addChild(sceneObjects['info']);	
	
sceneObjects['bl'+i+'l']=CreateSprite({ images: [imagesArray['lines_num']],frames: {width:59, height:57},animations: {l1:0,l2:1,l3:2,l4:3,l5:4,l6:5,l7:6,l8:7,l9:8,l10:9,l11:10,l12:11,l13:12,l14:13,l15:14,l16:15,l17:16,l18:17,l19:18,l20:19}});	
sceneObjects['bl'+i+'l'].gotoAndStop("l"+i);
sceneObjects['bl'+i+'r']=CreateSprite({ images: [imagesArray['lines_num2']],frames: {width:59, height:57},animations: {l1:0,l2:1,l3:2,l4:3,l5:4,l6:5,l7:6,l8:7,l9:8,l10:9,l11:10,l12:11,l13:12,l14:13,l15:14,l16:15,l17:16,l18:17,l19:18,l20:19}});	
sceneObjects['bl'+i+'r'].gotoAndStop("l"+i);	

}

var lnums=new Array(4,2,9,6,1,7,8,3,5);
var lnums2=new Array(0,4,2,8,6,1,7,9,3,5);

for(var i=1; i<=9; i++){
	
var lnpos=lnums[i-1];	
var lnpos2=lnums2[i];	
var yy=(88+i*73.4);
var yy2=(88+(i)*73.4);

sceneObjects['bl'+lnpos+'l'].set({x:0,y:yy,scaleX:1.08,scaleY:1.00});
stage.addChild(sceneObjects['bl'+lnpos+'l']);
sceneObjects['btext_l'][lnpos].set({x:0+25,y:yy+13});



sceneObjects['bl'+lnpos2+'r'].set({x:1301,y:yy2,scaleX:1.08,scaleY:1.00});
stage.addChild(sceneObjects['bl'+lnpos2+'r']);
sceneObjects['btext_r'][lnpos2].set({x:1301+35,y:yy2+13});
	
}

for(var i=1; i<=9; i++){
sceneObjects['l'+i]=new createjs.Bitmap(imagesArray['l'+i]);

sceneObjects['l'+i].set({x:55,y:186,scaleX:1.01,scaleY:1.01});

}
/*
sceneObjects['l1'].set({x:138,y:152,scaleX:1.01});
sceneObjects['l2'].set({x:138,y:152,scaleX:1.01});
sceneObjects['l3'].set({x:138,y:152,scaleX:1.01});
sceneObjects['l4'].set({x:138,y:152,scaleX:1.01});
sceneObjects['l5'].set({x:138,y:152,scaleX:1.01});
sceneObjects['l6'].set({x:138,y:152,scaleX:1.01});
sceneObjects['l7'].set({x:138,y:152,scaleX:1.01});
sceneObjects['l8'].set({x:138,y:152,scaleX:1.01});
sceneObjects['l9'].set({x:138,y:152,scaleX:1.01});*/












//lines

	
for(var i=1; i<=6; i++){
sceneObjects['sa'+i]=CreateSprite({ images: [imagesArray['s'+i+'a']],frames: {width:212, height:212},animations: {anim:[0,0,"anim",0.1]}});	
sceneObjects['sa'+i].gotoAndStop("normal");	
}

sceneObjects['sa'+7]=CreateSprite({ images: [imagesArray['s'+7+'a']],frames: {width:212, height:212},animations: {anim:[0,4,"anim",0.1]}});	
sceneObjects['sa'+7].gotoAndStop("normal");

sceneObjects['sa'+8]=CreateSprite({ images: [imagesArray['s'+8+'a']],frames: {width:212, height:212},animations: {anim:[0,7,"anim",0.1]}});	
sceneObjects['sa'+8].gotoAndStop("normal");

sceneObjects['sa'+9]=CreateSprite({ images: [imagesArray['s'+9+'a']],frames: {width:212, height:212},animations: {anim:[0,4,"anim",0.1]}});	
sceneObjects['sa'+9].gotoAndStop("normal");

sceneObjects['sa'+10]=CreateSprite({ images: [imagesArray['s'+10+'a']],frames: {width:212, height:212},animations: {anim:[0,7,"anim",0.1]}});	
sceneObjects['sa'+10].gotoAndStop("normal");

sceneObjects['sa'+11]=CreateSprite({ images: [imagesArray['s'+11+'a']],frames: {width:212, height:212},animations: {anim:[0,8,"anim",0.1]}});	
sceneObjects['sa'+11].gotoAndStop("normal");

sceneObjects['sa'+12]=CreateSprite({ images: [imagesArray['s'+12+'a']],frames: {width:212, height:212},animations: {anim:[0,4,"anim",0.1]}});	
sceneObjects['sa'+12].gotoAndStop("normal");

sceneObjects['sa'+13]=CreateSprite({ images: [imagesArray['s'+13+'a']],frames: {width:212, height:212},animations: {anim:[0,6,"anim",0.1]}});	
sceneObjects['sa'+13].gotoAndStop("normal");	


//animsym


//lines
for(var i=0; i<5; i++){
	


sceneObjects['scover'+i]=CreateSprite({ images: [imagesArray['symcover2']],frames: {width:212, height:212},animations: {l1:0,l2:1,l3:2,l4:3,l5:4,l6:5,l7:6,l8:7,l9:8,l10:9,l11:10,l12:11,l13:12,l14:13,l15:14,l16:15,l17:16,l18:17,l19:18,l20:19}});	
sceneObjects['scover'+i].gotoAndStop("l1");	
	



sceneObjects['scattercover'+i]=new createjs.Bitmap(imagesArray['scattercover']);
}

		


//symcover
doubleGame=new createjs.Container();
sceneObjects['double_bg']=new createjs.Bitmap(imagesArray['double_bg']);
sceneObjects['cards']=CreateSprite({ images: [imagesArray['cards']],frames: {width:213, height:316},animations: {slide:[0,1,"slide",0.2],c0:2,c1:3,c2:4,c3:5}});	
sceneObjects['cards'].gotoAndStop("slide");	


sceneObjects['double_bg'].scaleX=1;
sceneObjects['double_bg'].scaleY=1.00;
sceneObjects['double_bg'].x-=32;
sceneObjects['double_bg'].y-=25;
doubleGame.x=31;
doubleGame.y=52;
doubleGame.scaleX=1;

sceneObjects['cards'].x=545;
sceneObjects['cards'].y=253;




doubleGame.addChild(sceneObjects['double_bg']);
doubleGame.addChild(sceneObjects['cards']);

for(var m=1; m<=6; m++){
sceneObjects['cards_m'+m]=CreateSprite({ images: [imagesArray['cards_m']],frames: {width:76, height:76},animations: {slide:[0,0],c0:1,c1:2,c2:3,c3:4}});	
sceneObjects['cards_m'+m].gotoAndStop("c"+RandomInt(0,3));
sceneObjects['cards_m'+m].y=143;	
sceneObjects['cards_m'+m].x=493+(113.5*(m-1))+120;	
doubleGame.addChild(sceneObjects['cards_m'+m]);
}



sceneObjects['btn_red']=CreateSprite({ images: [imagesArray['btn_red']],frames: {width:280, height:195},animations: {disabled:0,enabled:1,pressed:1,onover:1}});
sceneObjects['btn_black']=CreateSprite({ images: [imagesArray['btn_black']],frames: {width:280, height:195},animations: {disabled:0,enabled:2,pressed:2,onover:2}});
sceneObjects['btn_black'].gotoAndStop("enabled");
sceneObjects['btn_red'].gotoAndStop("enabled");


sceneObjects['btn_black'].set({x:908,y:318,name:"btn_black"});
sceneObjects['btn_red'].set({x:116,y:318,name:"btn_red"});



/////

sceneObjects['info_d1']= new createjs.Text("", "25px GothamProNarrowBold", "#FFFFFF");
sceneObjects['info_d1'].textAlign = "center";	
sceneObjects['info_d1'].x=250;	
sceneObjects['info_d1'].y=41;	
sceneObjects['info_d1'].shadow = new createjs.Shadow("#000000", 2, 2, 3);

sceneObjects['info_d2']= new createjs.Text("", "25px GothamProNarrowBold", "#FFFFFF");
sceneObjects['info_d2'].textAlign = "center";	
sceneObjects['info_d2'].x=770;	
sceneObjects['info_d2'].y=41;	
sceneObjects['info_d2'].shadow = new createjs.Shadow("#000000", 2, 2, 3);


sceneObjects['info_d3']= new createjs.Text("", "19px GothamProNarrowBold", "#FFFFFF");
sceneObjects['info_d3'].textAlign = "center";	
sceneObjects['info_d3'].x=540;	
sceneObjects['info_d3'].y=620;	
sceneObjects['info_d3'].shadow = new createjs.Shadow("#000000", 2, 2, 3);

sceneObjects['info_d4']= new createjs.Text("", "25px GothamProNarrowBold", "#FFFFFF");
sceneObjects['info_d4'].textAlign = "center";	
sceneObjects['info_d4'].x=350;	
sceneObjects['info_d4'].y=170;	
sceneObjects['info_d4'].shadow = new createjs.Shadow("#000000", 2, 2, 3);
/////

doubleGame.addChild(sceneObjects['info_d1']);
doubleGame.addChild(sceneObjects['info_d2']);
doubleGame.addChild(sceneObjects['info_d3']);
doubleGame.addChild(sceneObjects['info_d4']);
doubleGame.addChild(sceneObjects['btn_black']);
doubleGame.addChild(sceneObjects['btn_red']);

//////double texts
sceneObjects['double_bet']= new createjs.Text("500", "38px GothamProNarrowBold", "#FFFFFF");
sceneObjects['double_bet'].textAlign = "center";	
sceneObjects['double_bet'].x=260;	
sceneObjects['double_bet'].y=75;	
sceneObjects['double_bet'].shadow = new createjs.Shadow("#000000", 2, 2, 3);
doubleGame.addChild(sceneObjects['double_bet']);

sceneObjects['double_win']= new createjs.Text("500", "38px GothamProNarrowBold", "#FFFFFF");
sceneObjects['double_win'].textAlign = "center";	
sceneObjects['double_win'].x=1000;	
sceneObjects['double_win'].y=75;	
sceneObjects['double_win'].shadow = new createjs.Shadow("#000000", 2, 2, 3);
doubleGame.addChild(sceneObjects['double_win']);


//double

stage.addChild(sceneObjects['btn_info']);

stage.addChild(sceneObjects['btn_gamble']);
stage.addChild(sceneObjects['btn_spin']);
stage.addChild(sceneObjects['btn_lines_plus']);
stage.addChild(sceneObjects['btn_lines_minus']);
stage.addChild(sceneObjects['btn_bet_plus']);
stage.addChild(sceneObjects['btn_bet_minus']);
stage.addChild(sceneObjects['btn_auto']);

ServerConnect("state");	





sceneObjects['snd_on']=new createjs.Bitmap(imagesArray['snd_on']);
sceneObjects['snd_off']=new createjs.Bitmap(imagesArray['snd_off']);
sceneObjects['btn_snd']=new createjs.Bitmap(imagesArray['btn_snd']);

sceneObjects['btn_exit']=new createjs.Bitmap(imagesArray['btn_exit']);
sceneObjects['btn_fullscreen']=new createjs.Bitmap(imagesArray['btn_fullscreen']);

sceneObjects['btn_snd1']=new createjs.Bitmap(imagesArray['btn_snd1']);
sceneObjects['btn_fullscreen1']=new createjs.Bitmap(imagesArray['btn_fullscreen1']);


sceneObjects['snd_on'].set({x:2280,y:435,name:"snd_on"});
sceneObjects['btn_snd'].set({x:2517,y:40,name:"btn_snd"});
sceneObjects['snd_off'].set({x:2220,y:435,name:"snd_off"});

sceneObjects['btn_exit'].set({x:2517,y:0,name:"btn_exit"});
sceneObjects['btn_fullscreen'].set({x:2560,y:40,name:"btn_fullscreen"});
sceneObjects['btn_snd1'].set({x:2517,y:40,name:"btn_snd1"});
sceneObjects['btn_fullscreen1'].set({x:2560,y:40,name:"btn_fullscreen1"});

//////////////////////////

sceneObjects['extrabet']=CreateSprite({ images: [imagesArray['extrabet']],frames: {width:184, height:168},animations: {enabled:0,disabled:1}});	
sceneObjects['extrabet'].set({x:1205,y:30,scaleX:0.64,scaleY:0.64});
sceneObjects['extrabet'].gotoAndStop(0);
sceneObjects['extrabet'].visible=false;
sceneObjects['extrabet'].addEventListener("click",SelectExtrabet);

stage.addChild(sceneObjects['extrabet']);
stage.addChild(sceneObjects['btn_exit']);
stage.addChild(sceneObjects['btn_fullscreen']);
stage.addChild(sceneObjects['btn_snd']);
stage.addChild(sceneObjects['btn_fullscreen1']);
stage.addChild(sceneObjects['btn_snd1']);

////////////////////////
/*
sceneObjects['snd_bg']=new createjs.Shape();
sceneObjects['snd_bg'].graphics.beginFill("#000000");
sceneObjects['snd_bg'].graphics.drawRect(0, 0, 1600, 900);
sceneObjects['snd_bg'].alpha=0.6;
////////////////////////////

stage.addChild(sceneObjects['snd_bg']);
stage.addChild(sceneObjects['btn_start']);

stage.addChild(sceneObjects['snd_on']);
stage.addChild(sceneObjects['snd_off']);

sceneObjects['snd_on'].addEventListener("click",SetSound);
sceneObjects['snd_off'].addEventListener("click",SetSound);
*/
SetSound("snd_on");


sceneObjects['btn_info'].visible=false;

sceneObjects['btn_gamble'].visible=false;
sceneObjects['btn_spin'].visible=false;
sceneObjects['btn_lines_plus'].visible=false;
sceneObjects['btn_lines_minus'].visible=false;
sceneObjects['btn_auto'].visible=false;

sceneObjects['btn_exit'].addEventListener("click",function(){location.replace("../../../");});

sceneObjects['btn_snd1'].addEventListener("click",ActionButtons);
sceneObjects['btn_snd'].addEventListener("click",ActionButtons);
sceneObjects['btn_fullscreen'].addEventListener("click",ActionButtons);
sceneObjects['btn_fullscreen1'].addEventListener("click",ActionButtons);

sceneObjects['btn_snd1'].visible=false;
sceneObjects['btn_fullscreen1'].visible=false;

///////////////
sceneObjects['wnd_bonus_back2']=new createjs.Bitmap(imagesArray['wnd_bonus_more']);
sceneObjects['wnd_bonus_back']=new createjs.Bitmap(imagesArray['wnd_bonus_start']);
sceneObjects['wnd_bonus']=new createjs.Container();
sceneObjects['wnd_bonus'].set({x:250,y:252});
sceneObjects['wnd_bonus'].addChild(sceneObjects['wnd_bonus_back']);
sceneObjects['wnd_bonus'].addChild(sceneObjects['wnd_bonus_back2']);

sceneObjects['wnd_bonus_txt']= new createjs.Text("5000", "48px Helvetica Bold", "#4A2800");
sceneObjects['wnd_bonus_txt'].textAlign = "center";	
sceneObjects['wnd_bonus_txt'].x=410;	
sceneObjects['wnd_bonus_txt'].y=210;	
sceneObjects['wnd_bonus_txt'].shadow = new createjs.Shadow("#000000", 2, 2, 3);
sceneObjects['wnd_bonus'].addChild(sceneObjects['wnd_bonus_txt']);
//////////////////






sceneObjects['wild1']=CreateSprite({ images: [imagesArray['wild']],frames: {width:221, height:670},animations: {anim:[0,27,"anim",0.2],stop:[39,39,"stop",0.8]}});	
sceneObjects['wild1'].gotoAndPlay("anim");
sceneObjects['wild1'].x=sceneObjects['reel'+1].x;
sceneObjects['wild1'].y=sceneObjects['reel'+1].y;


sceneObjects['wild2']=CreateSprite({ images: [imagesArray['wild']],frames: {width:221, height:670},animations: {anim:[0,27,"anim",0.2],stop:[39,39,"stop",0.8]}});	
sceneObjects['wild2'].gotoAndPlay("anim");
sceneObjects['wild2'].x=sceneObjects['reel'+2].x;
sceneObjects['wild2'].y=sceneObjects['reel'+2].y;


sceneObjects['wild3']=CreateSprite({ images: [imagesArray['wild']],frames: {width:221, height:670},animations: {anim:[0,27,"anim",0.2],stop:[39,39,"stop",0.8]}});	
sceneObjects['wild3'].gotoAndPlay("anim");
sceneObjects['wild3'].x=sceneObjects['reel'+3].x;
sceneObjects['wild3'].y=sceneObjects['reel'+3].y;


sceneObjects['wild4']=CreateSprite({ images: [imagesArray['wild']],frames: {width:221, height:670},animations: {anim:[0,27,"anim",0.2],stop:[39,39,"stop",0.8]}});	
sceneObjects['wild4'].gotoAndPlay("anim");
sceneObjects['wild4'].x=sceneObjects['reel'+4].x;
sceneObjects['wild4'].y=sceneObjects['reel'+4].y;


sceneObjects['wild5']=CreateSprite({ images: [imagesArray['wild']],frames: {width:221, height:670},animations: {anim:[0,27,"anim",0.2],stop:[39,39,"stop",0.8]}});	
sceneObjects['wild5'].gotoAndPlay("anim");
sceneObjects['wild5'].x=sceneObjects['reel'+5].x;
sceneObjects['wild5'].y=sceneObjects['reel'+5].y;

gameUI.Create();
stage.addChild(gameUI.cObjects['view']);


LockButtons();

};
 
//////////////////


function UpdateRules(){
	
/*	

	      $psym[1] = array( 0, 0, 2, 5, 25, 100 );       
		$psym[2] = array( 0, 0, 0, 5, 25, 100 );       
		$psym[3] = array( 0, 0, 0, 5, 25, 100 );
		$psym[4] = array( 0, 0, 0, 5, 25, 100 );       
		$psym[5] = array( 0, 0, 0, 10, 50, 125 );      
		$psym[6] = array( 0, 0, 0, 10, 50, 125 );      
		$psym[7] = array( 0, 0, 0, 15, 75, 250 );      
		$psym[8] = array( 0, 0, 0, 15, 75, 250 );     
		$psym[9] = array( 0, 0, 0, 20, 100, 400 );    
		$psym[10] = array( 0, 0, 2, 25, 125, 750 );    
		$psym[11] = array( 0, 0, 2, 25, 125, 750 );
		$psym[13] = array( 0, 0, 10, 250, 2500, 9000 ); // Man (wild)
		$psym[12] = array( 0, 0, 2, 5, 20, 500 ); // Dollar (бонус, scatter)  
*/

sceneObjects['info_t1'].text=(100*gameInfo.betline)+"\n"+(25*gameInfo.betline)+"\n"+(5*gameInfo.betline)+"\n"+(2*gameInfo.betline);//12
sceneObjects['info_td1'].text=(100*gameInfo.betline*2)+"\n"+(25*gameInfo.betline*2)+"\n"+(5*gameInfo.betline*2)+"\n"+(2*gameInfo.betline*2);//12

sceneObjects['info_t2'].text=(100*gameInfo.betline)+"\n"+(25*gameInfo.betline)+"\n"+(5*gameInfo.betline)+"\n";//4-3
sceneObjects['info_td2'].text=(100*gameInfo.betline*2)+"\n"+(25*gameInfo.betline*2)+"\n"+(5*gameInfo.betline*2)+"\n";//4-3

sceneObjects['info_t3'].text=(125*gameInfo.betline)+"\n"+(50*gameInfo.betline)+"\n"+(10*gameInfo.betline);//4-3
sceneObjects['info_td3'].text=(125*gameInfo.betline*2)+"\n"+(50*gameInfo.betline*2)+"\n"+(10*gameInfo.betline*2);//4-3

sceneObjects['info_t4'].text=(250*gameInfo.betline)+"\n"+(75*gameInfo.betline)+"\n"+(15*gameInfo.betline);//4-3
sceneObjects['info_td4'].text=(250*gameInfo.betline*2)+"\n"+(75*gameInfo.betline*2)+"\n"+(15*gameInfo.betline*2);//4-3

sceneObjects['info_t5'].text=(400*gameInfo.betline)+"\n"+(100*gameInfo.betline)+"\n"+(20*gameInfo.betline);//6-7
sceneObjects['info_td5'].text=(400*gameInfo.betline*2)+"\n"+(100*gameInfo.betline*2)+"\n"+(20*gameInfo.betline*2);//6-7

sceneObjects['info_t6'].text=(750*gameInfo.betline)+"\n"+(125*gameInfo.betline)+"\n"+(25*gameInfo.betline)+"\n"+(2*gameInfo.betline);//6-7
sceneObjects['info_td6'].text=(750*gameInfo.betline*2)+"\n"+(125*gameInfo.betline*2)+"\n"+(25*gameInfo.betline*2)+"\n"+(2*gameInfo.betlin*2);//6-7

sceneObjects['info_t7'].text=(9000*gameInfo.betline)+"\n"+(2500*gameInfo.betline)+"\n"+(250*gameInfo.betline)+"\n"+(10*gameInfo.betline);//1-2


sceneObjects['info_t8'].text=(500*gameInfo.bet)+"\n"+(20*gameInfo.bet)+"\n"+(5*gameInfo.bet)+"\n"+(2*gameInfo.bet);//10



	
	
	
};


function SelectExtrabet(){
	
if(GameEvent=="betting"){	



if(!gameInfo.extraBet){
gameInfo.extraBet=true;	
PlaySound("ex_active");	
sceneObjects['extrabet'].gotoAndStop(1);
gameInfo.lines=10;	
gameInfo.bet=gameInfo.betline*gameInfo.lines+(gameInfo.betline*5);	
SelectLines();
UpdateCounters();
}else{
gameInfo.extraBet=false;		
PlaySound("ex_deactive");
sceneObjects['extrabet'].gotoAndStop(0);	
gameInfo.bet=gameInfo.betline*gameInfo.lines;
UpdateCounters();
}


}
	
};

///////////////
 
function CreateReels(){

var xReel=new Array(90,121,152,183,214);

for(var i=1; i<=5; i++){
sceneObjects['reel'+i]=new createjs.Container();

sceneObjects['reel'+i].y=166;
sceneObjects['reel'+i].x=xReel[i-1]+(212*(i-1));



var shape = new createjs.Shape();
shape.graphics.beginFill("#ff0000").drawRect(sceneObjects['reel'+i].x, sceneObjects['reel'+i].y, 212, 636);



sceneObjects['reel'+i].mask=shape;
stage.addChild(sceneObjects['reel'+i]);

}
	
};
 
 
function FillReels(){

reelsInfo=new Array();
var randomSym=new Array(1,2,3,4,5,6,7,8);

for(var i=1; i<=5; i++){
reelsInfo[i-1]=new Array();
randomSym=shuffle(randomSym);

for(var j=0; j<4; j++){
var tmpSym=	sceneObjects['s'+randomSym[j]].clone();
reelsInfo[i-1][j]=tmpSym;

reelsInfo[i-1][j].y=-212+(j*212);

sceneObjects['reel'+i].addChild(reelsInfo[i-1][j]);

}


}
	
	
}; 
 
function ServerConnect(act){
	
	
var dataSend=new Object();	

gameInfo.action=act;

if(act=="state"){
	
dataSend.action="state";
	
}else if(act=="spin"){
	
dataSend.action="spin";
dataSend.lines=gameInfo.lines;
dataSend.betline=gameInfo.betline;
dataSend.extrabet=gameInfo.extraBet;


	
}else if(act=="freegame"){
	
dataSend.action="freegame";
dataSend.lines=gameInfo.lines;
dataSend.betline=gameInfo.betline;
dataSend.extrabet=gameInfo.extraBet;

	
}else if(act=="double_red"){
	
dataSend.action="double";
dataSend.lines=gameInfo.lines;
dataSend.bet=1;
dataSend.betline=gameInfo.betline;


	
}else if(act=="double_black"){
	
dataSend.action="double";
dataSend.lines=gameInfo.lines;
dataSend.bet=0;
dataSend.betline=gameInfo.betline;


	
}		
	
$.post("ge_server.php",dataSend,ServerLoad,"text");	
	
}; 


function ServerLoad(data){
	
        var ServString=data.split("&");
    	var ServInfoLoad=new Array();
    	var tmpInfoLoad=new Array();

    	
    	for(var i=0; i<ServString.length; i++){
    	tmpInfoLoad=ServString[i].split("=");
    	ServInfoLoad[tmpInfoLoad[0]]=tmpInfoLoad[1];
    	}	
	
	var jackpots=ServInfoLoad['jackpots'].split("|");	
	sceneObjects['jp1'].text="JACKPOT: "+jackpots[0];
	sceneObjects['jp2'].text="JACKPOT: "+jackpots[1];
	sceneObjects['jp3'].text="JACKPOT: "+jackpots[2];
	if(gameInfo.action=="state"){


////убираем лоадер	
	
stage.removeChild(progressBar);	
stage.removeChild(progressBarBorder);	
stage.removeChild(errorText);	
stage.removeChild(loadText);	
/*$("body").css("background-image","url(null)");
$("body").css("background-color","#000000");*/
/////


		
	gameInfo.credit=ServInfoLoad['balance'];	
	gameInfo.betline=1;
	gameInfo.lines=9;
	gameInfo.bet=gameInfo.betline*gameInfo.lines;
	SelectLines();
	UpdateButtons();
	UpdateCounters();
	
	
	
	}else if(gameInfo.action=="spin" || gameInfo.action=="freegame"){
	gameInfo.scatters=0;
sceneObjects['btn_spin'].gotoAndStop("enabled");	
	if(gameInfo.action=="freegame"){
	
     gameInfo.reelsCnt=new Array(10,14,18,22,26);
	
	}else{
	gameInfo.wild_pos=new Array(0,0,0,0,0,0,0,0);	
	gameInfo.reelsCnt=new Array(10,14,18,22,26);
	
	}
	
	serverSym=new Array();
	var ts=ServInfoLoad['info'].split("|");
    serverSym[0]=new Array(ts[1],ts[2],ts[3]);	
    serverSym[1]=new Array(ts[4],ts[5],ts[6]);	
    serverSym[2]=new Array(ts[7],ts[8],ts[9]);	
    serverSym[3]=new Array(ts[10],ts[11],ts[12]);	
    serverSym[4]=new Array(ts[13],ts[14],ts[15]);	
	
	
	gameInfo.scatterArr=new Array(false,false,false,false,false);
	
	
	
	serverWin=ServInfoLoad['wl'].split(":");
	
	if(ServInfoLoad['wl']==""){
	serverWin=new Array();	
	}
	gameInfo.scatterWin=ServInfoLoad['scatter_win'];
	gameInfo.expSym=parseInt(ts[20]);
	gameInfo.serverExpWin=parseInt(ServInfoLoad['expWin']);
	gameInfo.serverWin=parseFloat(ts[19]);
		
	
	}else if(gameInfo.action=="double_red" || gameInfo.action=="double_black"){
	
	DoubleResult(ServInfoLoad['info']);
	
	}
	
	
	
};
///////////////

function UpdateCounters(){

if(gameInfo.extraBet){
gameInfo.bet=gameInfo.betline*gameInfo.lines+(gameInfo.betline*5);		
}



	
sceneObjects['credit'].text=gameInfo.credit;	
sceneObjects['bet'].text=gameInfo.bet;	
sceneObjects['betline'].text=gameInfo.betline;	
sceneObjects['lines'].text=gameInfo.lines;	

for(var i=1; i<=9; i++){

sceneObjects['btext_r'][i].text=gameInfo.betline;
sceneObjects['btext_l'][i].text=gameInfo.betline;
	
}

gameUI.UpdateCounters();
	
};



/////////////Обновление игры
function UpdateGame(ev) {

if(isLock){

stage.update();
	
return;	
}

if(GameEvent=="book"){
gameInfo.bookCnt++;

if(gameInfo.bookCnt>35){


GameEvent="betting"	;


setTimeout(ShowExpSym,300);

/////////////////////////////

	
}	

	
}

if(GameEvent=="loading_sound"){

if(gameInfo.sndProgress.length<50){
gameInfo.sndProgress+=".";
}

sceneObjects['snd_text'].text="Loading sounds. \n "+gameInfo.sndProgress;



if(!isWA){

if(audioTracks["wheel"].buffered.length>0){
	
var bfLength=audioTracks["wheel"].buffered.end(0);	
}else{
var bfLength=0;		
}

if(bfLength>=audioTracks["wheel"].duration  || gameInfo.sndProgress.length>15 ){
	   gameInfo.waitSound=false;
	   
	audioTracks['intr']=setInterval(SpriteSoundStop,100);	
	
//////////////////////////////////////
	 
	 stage.removeChild(sceneObjects['snd_bg']);
	 stage.removeChild(sceneObjects['snd_text']);
	 GameEvent="betting";
	 sceneObjects['btn_info'].gotoAndStop("enabled");
sceneObjects['btn_bet'].gotoAndStop("enabled");
sceneObjects['btn_gamble'].gotoAndStop("enabled");
sceneObjects['btn_spin'].gotoAndStop("enabled");
sceneObjects['btn_auto'].gotoAndStop("enabled");
UpdateButtons();
createjs.Ticker.setFPS(60);
////////////////////////////

  }	
	
}
	
	
}



if(GameEvent=="loading"){
	

var loaderWidth=(200/resCnt)*showProgress;

progressBar.graphics.clear();
progressBar.graphics.beginLinearGradientFill(["#990000","#FF0000"], [0.1, 0], 0, 20, 0, 200);
progressBar.graphics.drawRect(20, 20,loaderWidth , 20);

stage.update();

if(showProgress>=resCnt){
GameEvent="betting";
InitGame();	
	
}
if(showProgress<loadProgress){
showProgress++;	
	
}	

return;
	
}


/////////////Info Open/Close
if(GameEvent=="info_open"){

sceneObjects['game_info'].y=gameInfo.infAnim[gameInfo.infCnt];

gameInfo.infCnt++;

if(gameInfo.infCnt>11){
	gameInfo.infCnt=0;
gameInfo.infAnim=new Array(-1253,-1140,-1027,-914,-688,-575,-462,-349,-236,-123,-10,0);
gameInfo.infAnim.reverse();
GameEvent="info_is_open";
UpdateButtons();
}
	
}else if(GameEvent=="info_close"){

sceneObjects['game_info'].y=gameInfo.infAnim[gameInfo.infCnt];

gameInfo.infCnt++;

if(gameInfo.infCnt>11){
delete	gameInfo.infCnt;
delete gameInfo.infAnim;	
stage.removeChild(sceneObjects['game_info']);
GameEvent="betting";
UpdateButtons();
UpdateCounters();
}
	
}
///////////Double Open/Close
if(GameEvent=="double_open"){
createjs.Ticker.setFPS(60);
doubleGame.y=gameInfo.infAnim[gameInfo.infCnt];

gameInfo.infCnt++;

if(gameInfo.infCnt>11){
gameInfo.infCnt=0;
gameInfo.infAnim=new Array(-622,-567,-467,-350,-230,-100,0,30,50,70,90,160);
gameInfo.infAnim.reverse();
GameEvent="double_is_open";

StartDouble();
}
	
}else if(GameEvent=="double_close"){

doubleGame.y=gameInfo.infAnim[gameInfo.infCnt];

gameInfo.infCnt++;

if(gameInfo.infCnt>5){
delete	gameInfo.infCnt;
delete  gameInfo.infAnim;	
stage.removeChild(sceneObjects['btn_takewin']);
stage.removeChild(doubleGame);
GameEvent="betting";
sceneObjects['text_lw'].text="";
stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);
stage.addChild(sceneObjects['info']);

sceneObjects['info'].text="GAME OVER - GAMBLE COMPLETE, \n PLACE YOUR BET ";
UpdateButtons();
UpdateCounters();
}
	
}
if(GameEvent=="spin"){

Roll();
	

}

if(GameEvent=="addwin" || GameEvent=="addwin_double"){


if(gameInfo.adwFps<30){
gameInfo.adwFps+=0.5;	
createjs.Ticker.setFPS(gameInfo.adwFps);
}

if(gameInfo.adwFps>20){
gameInfo.adw+=11;	
}

if(gameInfo.adw<gameInfo.win){
PlaySound("addwin");
gameInfo.credit+=gameInfo.adw;	
gameInfo.win-=gameInfo.adw;
sceneObjects['cnt_win'].text=gameInfo.win;
stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);


		

gameInfo.adw=Math.round(gameInfo.adw);	
}else{
	
gameInfo.credit+=gameInfo.win;	
gameInfo.win=0;

sceneObjects['cnt_win'].text=gameInfo.paid;
sceneObjects['text_win'].text="WINNER PAID";
stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);


StopSound("");		

if(GameEvent=="addwin_double"){
	
GameEvent="double_close";	
stage.removeChild(sceneObjects['btn_takewin']);
createjs.Ticker.setFPS(60);
}else{

GameEvent="betting";
stage.removeChild(sceneObjects['btn_takewin']);
createjs.Ticker.setFPS(60);
if(gameInfo.serverExpWin>0){

sceneObjects['reel1'].alpha=1;
sceneObjects['reel2'].alpha=1;
sceneObjects['reel3'].alpha=1;
sceneObjects['reel4'].alpha=1;
sceneObjects['reel5'].alpha=1;


for(var i=0;i<=4;i++){

for(var j=1;j<=3;j++){	

if(sceneAnimSym['e'+i+'h'+j]!=undefined){
stage.removeChild(sceneAnimSym['e'+i+'h'+j]);	
delete sceneAnimSym['e'+i+'h'+j];
}

}
	
}
	
}
StopSound("");
createjs.Ticker.setFPS(60);
if(gameInfo.freegames==1){
StopSound("");	
EndBonusGame();
return;	
}

if(gameInfo.freegames>0){
StopSound("");	
ActionButtons("btn_spin");
return;	
}

UpdateButtons();
PlaySound("winstop");
if(gameInfo.autoStart){
UpdateButtons();
UpdateCounters();
ActionButtons("btn_spin");
return;	
}


}

createjs.Ticker.setFPS(60);
sceneObjects['info'].text="GAME OVER, \n PLACE YOUR BET ";

}		
UpdateCounters();
	
	
}


stage.update();


};

function RandomInt(min, max)
{

  return Math.floor(Math.random() * (max - min + 1)) + min;

};

////////////////////////////////

 (function () {
        function GradientText(text, font, color) {
            this.Text_constructor(text, font, color);
        }

        var p = createjs.extend(GradientText, createjs.Text);

        p._drawTextLine = function (ctx, text, y) {
            if (this.gradient) {
                var height = this.getMeasuredLineHeight();
                var my_gradient = ctx.createLinearGradient(0, y, 0, y + height+2);
                my_gradient.addColorStop(0, "#FF9900");
                my_gradient.addColorStop(1, "#FFFF66");

                ctx.fillStyle = my_gradient;
                ctx.fillText(text, 0, y, this.maxWidth || 0xFFFF);
            } else {
                this.Text__drawTextLine(ctx, text, y);
            }
        };

        window.GradientText = createjs.promote(GradientText, "Text");
    }());
    





///////////////////////////////////
//move reels

function StartRoll(){

stage.removeChild(sceneObjects['wild5']);	
stage.removeChild(sceneObjects['wild4']);	
stage.removeChild(sceneObjects['wild3']);	
stage.removeChild(sceneObjects['wild2']);	
stage.removeChild(sceneObjects['wild1']);	



sceneObjects['info'].text="";
createjs.Ticker.setFPS(60);
if(gameInfo.freegames>0){

stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);
stage.addChild(sceneObjects['info2']);
sceneObjects['info2'].text="FREE GAME "+(gameInfo.allfreegames-gameInfo.freegames+1)+" OF "+(gameInfo.allfreegames);	
	
}

gameInfo.reelsCnt=new Array(9999,9999,9999,9999,9999);

gameInfo.reelSym=new Array(1,5,3,8,2,5,7,4,1,3,2,6,8,4,2,3,5,7,1,6,8,2,3,1,7,4,5,2,8,3,1,4,7,8,2,5,6,3,1,6,8,2,5,7,3,4,2,5);
//gameInfo.reelSym=new Array(9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9);

gameInfo.reelSymCnt= new Array(RandomInt(0,gameInfo.reelSym.length-1),RandomInt(0,gameInfo.reelSym.length-1),
RandomInt(0,gameInfo.reelSym.length-1),RandomInt(0,gameInfo.reelSym.length-1),RandomInt(0,gameInfo.reelSym.length-1));

gameInfo.movingPos=new Array(-212,-159,-106,-53,0,53,106,159,212,265,318,371,424,477,530,583,636,689,742,795,848);

gameInfo.reelMov=new Array();
gameInfo.reelMov[0]=new Array(0,4,8,12);

gameInfo.reelMov[1]=new Array(0,4,8,12);
gameInfo.reelMov[2]=new Array(0,4,8,12);
gameInfo.reelMov[3]=new Array(0,4,8,12);
gameInfo.reelMov[4]=new Array(0,4,8,12);

gameInfo.stopedReel=0;
	

gameInfo.expReels=new Array(false,false,false,false,false);
gameInfo.expReelsCnt=0;
	
	
GameEvent="spin";


PlaySound("reelset_moving");	

gameInfo.scatterCnt=0;

gameUI.cObjects['ui_btnSkip'].cButton.visible=true;	
gameUI.cObjects['ui_btnSkip'].Enable();		
	
};

function Roll(){
	
for(var i=gameInfo.stopedReel; i<5; i++){
	

	
	
for(var j=0; j<4; j++){

reelsInfo[i][j].y=gameInfo.movingPos[gameInfo.reelMov[i][j]];
gameInfo.reelMov[i][j]++;

//////////
if(gameInfo.reelMov[i][j]>16){
	
gameInfo.reelMov[i][j]=1;	
gameInfo.reelsCnt[i]--;



	

if(gameInfo.reelsCnt[i]==1 ){
	
if(gameInfo.scatterArr[i]){
	
gameInfo.scatterCnt++;	

if(gameInfo.scatterCnt>3){gameInfo.scatterCnt=3;}

PlaySound("4_scatter");		
		
}else{


PlaySound("reelset_reel_stop");	
	
}	
	


		
	
}




if(gameInfo.reelsCnt[i]<3 && gameInfo.reelsCnt[i]>=0){


ChangeSymbol(i,j,serverSym[i][gameInfo.reelsCnt[i]],gameInfo.reelsCnt[i]);	




}else if(gameInfo.reelsCnt[i]==-1){

ChangeSymbol(i,j,serverSym[i][0],-1);	
}else {
	
ChangeSymbol(i,j,gameInfo.reelSym[gameInfo.reelSymCnt[i]],-1);	
}


gameInfo.reelSymCnt[i]++;
if(gameInfo.reelSymCnt[i]>gameInfo.reelSym.length-1){gameInfo.reelSymCnt[i]=0;}

}
//////////

}
//row
	
if(gameInfo.reelsCnt[i]<0){
gameInfo.stopedReel++;	


}
	
}


//stoped
for(var i=0; i<gameInfo.stopedReel; i++){

if(gameInfo.reelsCnt[i]<-13 || gameInfo.reelsCnt[i]>0){
continue;	
}	
	
for(var j=0; j<4; j++){

if(gameInfo.reelsCnt[i]==-1){
reelsInfo[i][j].y+=28;	


reelsInfo[i][j].gotoAndStop("normal");	



}else if(gameInfo.reelsCnt[i]<-1 && gameInfo.reelsCnt[i]>=-12){
reelsInfo[i][j].y-=3;	
}else if(gameInfo.reelsCnt[i]<-12 && gameInfo.reelsCnt[i]>=-13){
reelsInfo[i][j].y+=5;	

}

	
}
gameInfo.reelsCnt[i]--;	

}



if(gameInfo.reelsCnt[4]<-13){
	
GameEvent="";	
AfterSpin();

}

	
};


///////////////

function ShowExpLines(){
HideCover();


if(gameInfo.cLine>gameInfo.lines){
GameEvent="takewin";
ActionButtons("btn_spin");	
return;	
}

stage.addChild(sceneObjects['l'+gameInfo.cLine]);
PlaySound("exp");
if(Sounds["exp"].currentTime>0){
	
PlaySound("exp1");
if(Sounds["exp1"].currentTime>0){
PlaySound("exp2");	
if(Sounds["exp2"].currentTime>0){
PlaySound("exp3");	
}
}

}
/////////
gameInfo.win+=gameInfo.serverExpWin;

stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);
stage.addChild(sceneObjects['info']);

stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);
stage.addChild(sceneObjects['info2']);

sceneObjects['info2'].text=""+gameInfo.win+" CREDITS WON";
////////
cLine=linesId[gameInfo.cLine-1];
for(var j=1; j<=5;j++){
var cSym=cLine[j-1]-1;

if(gameInfo.expReels[j-1]){

stage.removeChild(sceneAnimSym['e'+(j-1)+'h'+(cSym+1)]);
stage.addChild(sceneAnimSym['e'+(j-1)+'h'+(cSym+1)]);



sceneObjects['scover'+(j-1)].x=sceneObjects['reel'+j].x-1;
sceneObjects['scover'+(j-1)].y=sceneObjects['reel'+j].y+(cSym*196);

sceneObjects['scover'+(j-1)].gotoAndStop("l"+gameInfo.cLine);

stage.addChild(sceneObjects['scover'+(j-1)]);

}

}
	

gameInfo.cLine++;
setTimeout(ShowExpLines,500);	
};
//////////////////////
function ShowExpReels(){
	

	
if(gameInfo.eReelCnt>5){
gameInfo.cLine=1;	
setTimeout(ShowExpLines,500);	
return;	
}	
	
if(!gameInfo.expReels[gameInfo.eReelCnt] || gameInfo.eRowCnt>3){
gameInfo.eReelCnt++;	
gameInfo.eRowCnt=1;	
ShowExpReels();
return;	
}else{
PlaySound("bookSym");
if(Sounds["bookSym"].currentTime>0){
	
PlaySound("bookSym1");
if(Sounds["bookSym1"].currentTime>0){
PlaySound("bookSym2");	
if(Sounds["bookSym2"].currentTime>0){
PlaySound("bookSym3");	
}
}

}
	


sceneAnimSym['e'+gameInfo.eReelCnt+'h'+gameInfo.eRowCnt]=sceneObjects['s'+gameInfo.expSym].clone();	

sceneAnimSym['e'+gameInfo.eReelCnt+'h'+gameInfo.eRowCnt].x=sceneObjects['reel'+(gameInfo.eReelCnt+1)].x;
sceneAnimSym['e'+gameInfo.eReelCnt+'h'+gameInfo.eRowCnt].y=sceneObjects['reel'+(gameInfo.eReelCnt+1)].y+((gameInfo.eRowCnt-1)*196);
sceneAnimSym['e'+gameInfo.eReelCnt+'h'+gameInfo.eRowCnt].gotoAndStop("normal_b");
stage.addChild(sceneAnimSym['e'+gameInfo.eReelCnt+'h'+gameInfo.eRowCnt]);


gameInfo.eRowCnt++;
setTimeout(ShowExpReels,400);	
}	



	
};


function ShowWilds(){

PlaySound("wild_snd");

if(gameInfo.wild_pos[1]>0){

stage.addChild(sceneObjects['wild1']);	
sceneObjects['wild1'].gotoAndPlay("anim");	

}
if(gameInfo.wild_pos[2]>0){

stage.addChild(sceneObjects['wild2']);
sceneObjects['wild2'].gotoAndPlay("anim");		
	
}
if(gameInfo.wild_pos[3]>0){

stage.addChild(sceneObjects['wild3']);	
sceneObjects['wild3'].gotoAndPlay("anim");	
	
}
if(gameInfo.wild_pos[4]>0){

stage.addChild(sceneObjects['wild4']);	
sceneObjects['wild4'].gotoAndPlay("anim");	
	
}
if(gameInfo.wild_pos[5]>0){

stage.addChild(sceneObjects['wild5']);	
sceneObjects['wild5'].gotoAndPlay("anim");	
	
}	

	
}

//////AfterSpin

function AfterSpin(){

sceneObjects['btn_spin'].gotoAndStop("disabled");
StopSound("wheel_move");	
if(gameInfo.freegames<=0){
gameInfo.win=0;
}

if((gameInfo.serverWin>0 && gameInfo.freegames<=0) || (serverWin.length>0 || gameInfo.scatterWin>0)){



	
setTimeout(ShowWin,300);	


	
	
}else{
stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);
stage.addChild(sceneObjects['info']);
sceneObjects['info'].text="GAME OVER, \n PLACE YOUR BET ";


GameEvent="betting";

gameInfo.serverExpWin=0;

if(gameInfo.freegames>0){

if(gameInfo.serverExpWin>0){
	
gameInfo.eReelCnt=0;	
gameInfo.eRowCnt=1;	

sceneObjects['reel1'].alpha=0.4;
sceneObjects['reel2'].alpha=0.4;
sceneObjects['reel3'].alpha=0.4;
sceneObjects['reel4'].alpha=0.4;
sceneObjects['reel5'].alpha=0.4;

ShowExpReels();
	
}else{	
if(gameInfo.freegames==1){
EndBonusGame();
return;	
}	
ActionButtons("btn_spin");

}
if(gameInfo.freegames==1){
EndBonusGame();
return;	
}
return;	
}

setTimeout(UpdateButtons,300);
UpdateCounters();





if(gameInfo.autoStart){
UpdateButtons();
UpdateCounters();
ActionButtons("btn_spin");
return;	
}
	
}


	
};

function OpenDouble(){
	
doubleGame.y=-333;
clearTimeout(lcInter);
stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);
stage.addChild(sceneObjects['info']);
sceneObjects['info'].text="CHOOSE RED OR BLACK , \nOR TAKE WIN.";
isKeyPress=false;
StopSound("");

SetButton(sceneObjects['btn_black']);
SetButton(sceneObjects['btn_red']);

sceneObjects['btn_black'].gotoAndStop("enabled");
sceneObjects['btn_red'].gotoAndStop("enabled");


PlaySound("gamble_start");	
sceneObjects['double_bet'].text=gameInfo.win;
sceneObjects['double_win'].text=gameInfo.win*2;
stage.addChild(doubleGame);	

gameInfo.infAnim=new Array(-622,-567,-467,-350,-230,-100,0,30,50,70,90,170);
gameInfo.infCnt=0;
LockButtons();

RemoveAnimSym();
HideCover();


GameEvent="double_open";	
};

function StartDouble(){

sceneObjects['cards'].gotoAndPlay("slide");	
	


PlaySound("gamble_card");	
sceneObjects['btn_takewin'].gotoAndStop("enabled");
stage.addChild(sceneObjects['btn_takewin']);
UpdateButtons();	
};

function SelectBlack(){
isKeyPress=true;
StopSound("");
UnsetButton(sceneObjects['btn_black']);
UnsetButton(sceneObjects['btn_red']);
sceneObjects['btn_black'].gotoAndStop("donover");
sceneObjects['btn_red'].gotoAndStop("disabled");
ServerConnect("double_black");	
LockButtons();	
};

function SelectRed(){
StopSound("");
isKeyPress=true;
UnsetButton(sceneObjects['btn_black']);
UnsetButton(sceneObjects['btn_red']);
sceneObjects['btn_black'].gotoAndStop("disabled");	
sceneObjects['btn_red'].gotoAndStop("onover");	

ServerConnect("double_red");	
LockButtons();	
};

function AddLastCard(inf){

for(var i=6; i>=2; i--){
	
sceneObjects['cards_m'+i].gotoAndStop(sceneObjects['cards_m'+(i-1)].currentFrame);
	
	
}	
sceneObjects['cards_m1'].gotoAndStop("c"+inf);	
};

function DoubleResult(inf){

AddLastCard(inf);

if(gameInfo.action=="double_red" && (inf==1 || inf==0) ){
	
PlaySound("gamble_win");	
gameInfo.win=gameInfo.win*2;

sceneObjects['cards'].gotoAndStop("c"+inf);

lcInter=setInterval(DoubleWin,2000);
	
}else if(gameInfo.action=="double_red" ){

gameInfo.win=0;

sceneObjects['cards'].gotoAndStop("c"+inf);

lcInter=setInterval(DoubleLose,2000);
	
}	

///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

if(gameInfo.action=="double_black" && (inf==2 || inf==3) ){
		
PlaySound("gamble_win");	
gameInfo.win=gameInfo.win*2;

sceneObjects['cards'].gotoAndStop("c"+inf);

lcInter=setInterval(DoubleWin,2000);

}else if(gameInfo.action=="double_black" ){

gameInfo.win=0;

sceneObjects['cards'].gotoAndStop("c"+inf);

lcInter=setInterval(DoubleLose,2000);
	
}	
	
};

function DoubleWin(){
isKeyPress=false;
clearInterval(lcInter);
sceneObjects['btn_takewin'].gotoAndStop("enabled");
stage.addChild(sceneObjects['btn_takewin']);

stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);
stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);
stage.addChild(sceneObjects['info']);
sceneObjects['info'].text="CHOOSE RED OR BLACK , \nOR TAKE WIN.";

SetButton(sceneObjects['btn_black']);
SetButton(sceneObjects['btn_red']);
sceneObjects['btn_red'].gotoAndStop("enabled");
sceneObjects['btn_black'].gotoAndStop("enabled");
sceneObjects['double_bet'].text=gameInfo.win;
sceneObjects['double_win'].text=gameInfo.win*2;

sceneObjects['cnt_win'].text=gameInfo.win;
sceneObjects['text_win'].text="WIN";

sceneObjects['cards'].gotoAndPlay("slide");
PlaySound("gamble_card");		
UpdateButtons();		
};

function DoubleLose(){


clearInterval(lcInter);	
GameEvent="double_close";	
isKeyPress=false;	
};

function ShowWin(){

gameInfo.winCnt=0;

//PlaySound("winup");

for(var i=0; i<serverWin.length;i++){

var tmpWin=serverWin[i].split("_");
var cLine=linesId[tmpWin[0]];
var startPos=tmpWin[3]-1;

/////////
for(var j=startPos; j<tmpWin[2];j++){

var cSym=cLine[j]-1;

if(sceneAnimSym['v'+j+'h'+cSym]==undefined){
sceneAnimSym['v'+j+'h'+cSym]=sceneObjects['sa'+serverSym[j][cSym]].clone();	

sceneAnimSym['v'+j+'h'+cSym].x=sceneObjects['reel'+(j+1)].x;
sceneAnimSym['v'+j+'h'+cSym].y=sceneObjects['reel'+(j+1)].y+(cSym*212);

sceneAnimSym['v'+j+'h'+cSym].gotoAndPlay("anim");
stage.addChild(sceneAnimSym['v'+j+'h'+cSym]);

}
	

////////	
	
}



}
ShowWinAnim();	
	
};

function ShowWinAnim(){

var tmTime=0;	

if(gameInfo.winCnt==serverWin.length-1 && GameEvent!="takewin"){

	

}

if(gameInfo.winCnt>serverWin.length-1 && GameEvent!="takewin"){

if(gameInfo.scatterWin>0){
StopSound("");
ShowScatters();	

return;	
	
}else{


gameInfo.winCnt=0;
GameEvent="takewin";



if(gameInfo.freegames>0){
	
if(gameInfo.serverExpWin>0){
	
gameInfo.eReelCnt=0;	
gameInfo.eRowCnt=1;	
sceneObjects['reel1'].alpha=0.4;
sceneObjects['reel2'].alpha=0.4;
sceneObjects['reel3'].alpha=0.4;
sceneObjects['reel4'].alpha=0.4;
sceneObjects['reel5'].alpha=0.4;
HideCover();
RemoveAnimSym();


ShowExpReels();
	
}else{	
	
ActionButtons("btn_spin");

}

return;	
}

if(gameInfo.autoStart){
UpdateButtons();
UpdateCounters();
ActionButtons("btn_spin");
return;	
}

PlaySound("gamble_decide");	

stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);
stage.addChild(sceneObjects['info']);

sceneObjects['info'].text="GAMBLE UP TO 5X, \n OR TAKE WIN ";
sceneObjects['cnt_win'].visible=true;	
sceneObjects['cnt_win'].text=gameInfo.win;	
sceneObjects['text_win'].text="WIN";	
sceneObjects['text_win'].visible=true;
UpdateButtons();
lcInter=setTimeout(ShowWinAnim,250);		
return;	

}

	
}

if(serverWin[gameInfo.winCnt]!=undefined){
var tmpWin=serverWin[gameInfo.winCnt].split("_");
}

if(GameEvent!="takewin"){
	
StopSound("");	
	
tmTime=700;	
if((tmpWin[1]-0)/gameInfo.betline<=5){
tmTime=1200;
PlaySound("win_combination1");	
	
}else if((tmpWin[1]-0)/gameInfo.betline<=10){
tmTime=2500;
PlaySound("win_combination2");	
	
}else if((tmpWin[1]-0)/gameInfo.betline<=20){
tmTime=1500;
PlaySound("win_combination3");	
	
}else if((tmpWin[1]-0)/gameInfo.betline<=50){
tmTime=1300;
PlaySound("win_combination4");	
	
}else if((tmpWin[1]-0)/gameInfo.betline<=100){
tmTime=1300;
PlaySound("win_combination5");	
	
}else if((tmpWin[1]-0)/gameInfo.betline<=200){
tmTime=1300;
PlaySound("win_combination6");	
	
}else{
tmTime=1000;
PlaySound("win_combination1");	
	
}


if(gameInfo.winCnt>serverWin.length-1 && GameEvent!="takewin"){






tmTime=100;

}
	
	
	
lcInter=setTimeout(ShowWinAnim,tmTime);

}else{
	
if(gameInfo.winCnt>serverWin.length-1){
gameInfo.winCnt=0;	

if(gameInfo.scatterWin>0){

ShowScatters();	

return;	
	
}else{

lcInter=setTimeout(ShowWinAnim,100);
return;	

}

}	
	
lcInter=setTimeout(ShowWinAnim,1000);	

}
////////////////////



HideCover();
ShowCover();

if(GameEvent!="takewin"){
gameInfo.win=gameInfo.serverWin;

stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);
stage.addChild(sceneObjects['info2']);
sceneObjects['info2'].text=""+(tmpWin[1]-0)+" CREDITS WON";

sceneObjects['text_lw'].text="LINE PAYS \n "+(parseInt(tmpWin[0])+1);

sceneObjects['cnt_win'].visible=true;	
sceneObjects['cnt_win'].text=gameInfo.win;	
sceneObjects['text_win'].text="WIN";	
sceneObjects['text_win'].visible=true;
}else{
	
}

gameInfo.winCnt++;





};

function GetRowScatter(j){
	
if(serverSym[j][0]==12){
return 0;	

}else if(serverSym[j][1]==12){
return 1;	

}else if(serverSym[j][2]==12){
return 2;

}else{

return -1;	
	
}
	
};

function ShowScatters(){

HideCover();
	
for(var j=0; j<5;j++){

var cSym=GetRowScatter(j);

if(cSym!=-1){
gameInfo.scatters++;
if(sceneAnimSym['v'+j+'h'+cSym]==undefined ){
sceneAnimSym['v'+j+'h'+cSym]=sceneObjects['sa'+serverSym[j][cSym]].clone();	

sceneAnimSym['v'+j+'h'+cSym].x=sceneObjects['reel'+(j+1)].x;
sceneAnimSym['v'+j+'h'+cSym].y=sceneObjects['reel'+(j+1)].y+(cSym*212);

sceneAnimSym['v'+j+'h'+cSym].gotoAndPlay("anim");
stage.addChild(sceneAnimSym['v'+j+'h'+cSym]);

}

sceneObjects['scattercover'+j].x=sceneAnimSym['v'+j+'h'+cSym].x;
sceneObjects['scattercover'+j].y=sceneAnimSym['v'+j+'h'+cSym].y;

stage.addChild(sceneObjects['scattercover'+j]);

}
	
}

if(GameEvent!="takewin"){

gameInfo.win=gameInfo.serverWin;
stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);
stage.addChild(sceneObjects['info2']);
sceneObjects['info2'].text=""+gameInfo.scatterWin+" CREDITS WON";
PlaySound("win_combination12");	
sceneObjects['cnt_win'].text=gameInfo.win;
sceneObjects['text_win'].text="WIN";

sceneObjects['text_lw'].text="SCATTERS PAYS \n "+gameInfo.scatterWin;

lcInter=setTimeout(AfterScatter,2000);		
return;	
}else{

lcInter=setTimeout(ShowWinAnim,1000);	

}
	
};


function AfterEndBonus(){

stage.removeChild(sceneObjects['wnd_bonus_end']);		
stage.removeChild(sceneObjects['bonus_feature'] );

stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);
stage.addChild(sceneObjects['info']);

sceneObjects['info'].text="GAME OVER, \n PLACE YOUR BET ";
sceneObjects['info'].visible=true;
GameEvent="betting";
UpdateButtons();

if(gameInfo.autoStart){
UpdateButtons();
UpdateCounters();
ActionButtons("btn_spin");

return;	
}
	
};


function EndBonusGame(){



UpdateCounters();	
	
gameInfo.freegames=0;	

HideCover();
RemoveAnimSym();

sceneObjects['wnd_bonus_back2'].visible=true;
sceneObjects['wnd_bonus_back'].visible=false;

stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);
stage.addChild(sceneObjects['info']);

sceneObjects['info'].text="";

stage.addChild(sceneObjects['wnd_bonus_end']);	

sceneObjects['game_bg2'].visible=false;	
sceneObjects['game_bg'].visible=true;	
//setTimeout(AfterEndBonus,3800);



stage.addChild(sceneObjects['wnd_bonus'] );
sceneObjects['wnd_bonus_txt'].text="\n \n"+gameInfo.bonusWin+"\n \n";

GameEvent="takewin";	
	
sceneObjects['info'].text="GAME OVER, \n PLACE YOUR BET ";
sceneObjects['info'].visible=true;

UpdateButtons();	

StopSound("");
PlaySound("3_endbonus");	
if(gameInfo.autoStart){
UpdateButtons();
UpdateCounters();
ActionButtons("btn_spin");

}
	
};

function ShowExpSym(){

	

setTimeout(StartRollBonusGame,2000);	
GameEvent="takewin";
};

function StartBonus(){

HideCover();
RemoveAnimSym();
gameInfo.bonusWin=0;
LockButtons();	
PlaySound("2_startbonus");
sceneObjects['info'].text="FREE GAMES WON";
sceneObjects['game_bg'].visible=false;
sceneObjects['game_bg2'].visible=true;
stage.addChild(sceneObjects['wnd_bonus']);
sceneObjects['wnd_bonus_back2'].visible=false;
sceneObjects['wnd_bonus_back'].visible=true;
sceneObjects['wnd_bonus_txt'].text="";
//sceneObjects['book'].gotoAndStop((gameInfo.expSym-1));	
AfterStartBonus();
//stage.addChild(sceneObjects['book']);




};

function StartBookShow(){
	
stage.addChild(sceneObjects['book']);		
sceneObjects['book'].gotoAndPlay("open");	
setTimeout(StartChangePage,1200);	
PlaySound("page");
};


function StartChangePage(){
	
gameInfo.pageCnt=0;	
gameInfo.pageTotalCnt=0;	

stage.addChild(sceneObjects['page_'+gameInfo.expSym]);	
sceneObjects['page_'+gameInfo.expSym].visible=true;
stage.addChild(sceneObjects['page_11']);	

//sceneObjects['page_'+gameInfo.expSym].gotoAndPlay("open");
PlaySound("page");

sceneObjects['page_11'].gotoAndPlay("open");
setTimeout(AfterBook,1200);	
}

function AfterBook(){


/*
sceneObjects['page_'+gameInfo.expSym].gotoAndStop("open");

stage.removeChild(sceneObjects['page_11']);		
stage.removeChild(sceneObjects['page_'+gameInfo.expSym]);		
stage.removeChild(sceneObjects['book']);	
*/	
PlaySound("showbsym");

setTimeout(AfterStartBonus,1000);	
	

}


function AfterStartBonus(){

gameInfo.freegames=16;
gameInfo.allfreegames=15;
sceneObjects['info2'].text="PRESS TO START BONUS  ";

stage.removeChild(sceneObjects['info']);
stage.removeChild(sceneObjects['info2']);
stage.addChild(sceneObjects['info2']);


gameInfo.blinkIntr=setInterval(BlinkInfoText,500);
GameEvent="bonus";
sceneObjects['btn_spin'].gotoAndStop("enabled");	
stage.addChild(sceneObjects['btn_spin']);	


	
};

function BlinkInfoText(){
sceneObjects['info2'].visible=!sceneObjects['info2'].visible;	

};

function StartRollBonusGame(){

LockButtons();

stage.removeChild(sceneObjects['book']);
stage.removeChild(sceneObjects['wnd_bonus_more']);	
sceneObjects['info2'].visible=true;
clearInterval(gameInfo.blinkIntr);
stage.removeChild(sceneObjects['wnd_bonus_start']);

ActionButtons("btn_spin");

};

function MoreBonusGames(){

HideCover();
RemoveAnimSym();
//gameInfo.bonusWin=0;
PlaySound("2_startbonus");	
stage.addChild(sceneObjects['wnd_bonus']);
sceneObjects['wnd_bonus_back2'].visible=false;
sceneObjects['wnd_bonus_back'].visible=true;
sceneObjects['wnd_bonus_txt'].text="";

gameInfo.freegames+=15;
gameInfo.allfreegames+=15;
setTimeout(StartRollBonusGame,2000);		
	
};

function AfterScatter(){



gameInfo.winCnt=0;
GameEvent="takewin";	



if(gameInfo.freegames>0){

if(gameInfo.scatters>=3){
MoreBonusGames();	
return;	
}else{	
	
if(gameInfo.freegames==1){
EndBonusGame();
return;
}	
	
ActionButtons("btn_spin");
return;	
}

}

sceneObjects['info'].text="Credits won "+gameInfo.win+"";



if(gameInfo.scatters>=3){
StartBonus();	
return;	
}

if(gameInfo.autoStart){
UpdateButtons();
UpdateCounters();
ActionButtons("btn_spin");
return;	
}

PlaySound("gamble_decide");
UpdateButtons();
ShowWinAnim();	
};

function ShowCover(){
	

	
var tmpWin=serverWin[gameInfo.winCnt].split("_");
var cLine=linesId[tmpWin[0]];
var startPos=tmpWin[3]-1;
tmpWin[0]=tmpWin[0]-0;

stage.addChild(sceneObjects['l'+(tmpWin[0]+1)]);

/////////
for(var j=startPos; j<tmpWin[2];j++){

var cSym=cLine[j]-1;

stage.removeChild(sceneAnimSym['v'+j+'h'+cSym]);



//sceneAnimSym['v'+j+'h'+cSym].gotoAndPlay("anim");


////////////////////////////////
if(gameInfo.wild_pos[(j+1)]>0){

stage.removeChild(sceneObjects['wild'+(j+1)]);	
stage.addChild(sceneObjects['wild'+(j+1)]);	
	
}else{
	
stage.addChild(sceneAnimSym['v'+j+'h'+cSym]);	
	
}

/////////////////////////////////


sceneObjects['scover'+j].x=sceneObjects['reel'+(j+1)].x;
sceneObjects['scover'+j].y=sceneObjects['reel'+(j+1)].y+(cSym*212);	
	




sceneObjects['scover'+j].gotoAndStop("l"+(tmpWin[0]+1));
//sceneObjects['scover'+j].scaleX=1.14;
//sceneObjects['scover'+j].scaleY=1.15;

stage.addChild(sceneObjects['scover'+j]);

	
}


};

function HideCover(){



/////////
for(var j=0; j<20;j++){

stage.removeChild(sceneObjects['l'+(j+1)]);
stage.removeChild(sceneObjects['scover'+j]);
stage.removeChild(sceneObjects['scattercover'+j]);

stage.removeChild(sceneObjects['wline_txt']);	
}	
	
};

function ChangeSymbol(i,j,s,pp){

sceneObjects['reel'+(i+1)].removeChild(reelsInfo[i][j]);
delete reelsInfo[i][j];
var tmpSym=	sceneObjects['s'+s].clone();
reelsInfo[i][j]=tmpSym;

if(gameInfo.expSym==s && gameInfo.freegames>0){
reelsInfo[i][j].gotoAndStop("blur_b");	

}else{
reelsInfo[i][j].gotoAndStop("blur");
}

if(gameInfo.freegames>0 && s==12 && pp>=0){

if(pp==2){
reelsInfo[i][j].gotoAndStop(6);

}	
if(pp==1){
reelsInfo[i][j].gotoAndStop(4);
}		

if(pp==0){
reelsInfo[i][j].gotoAndStop(2);
}	

}

reelsInfo[i][j].y=-212;
//reelsInfo[i][j].scaleY=1.005;
reelsInfo[i][j].name=s;
sceneObjects['reel'+(i+1)].addChild(reelsInfo[i][j]);
};

//кнопки
function SetButton(btnLink){
		
btnLink.addEventListener("mouseover",MouseOver);
btnLink.addEventListener("mouseout",MouseOut);
btnLink.addEventListener("mousedown",MouseDown);
btnLink.addEventListener("pressup",MouseUp);


	
	
};

function UnsetButton(btnLink){
	
btnLink.removeEventListener("mouseover",MouseOver);
btnLink.removeEventListener("mouseout",MouseOut);
btnLink.removeEventListener("mousedown",MouseDown);
btnLink.removeEventListener("pressup",MouseUp);
	
};
MouseOver=function(ev){

if(ev.currentTarget.currentAnimation!="disabled"){
ev.currentTarget.gotoAndStop("onover");
}

	
};
MouseOut=function(ev){

if(ev.currentTarget.currentAnimation!="disabled"){
ev.currentTarget.gotoAndStop("enabled");
}

	
};
MouseDown=function(ev){

if(ev.currentTarget.currentAnimation!="disabled"){
ev.currentTarget.gotoAndStop("pressed");
}

	
};	
MouseUp=function(ev){
if(ev.currentTarget.currentAnimation=="pressed"){	
ev.currentTarget.gotoAndStop("enabled");	
ActionButtons(ev.currentTarget.name);
}

};	

function UpdateButtons(){


	
	
if(GameEvent=="betting" || GameEvent=="info_is_open"){
	

sceneObjects['btn_spin'].gotoAndStop("enabled");	
sceneObjects['btn_lines_plus'].gotoAndStop("enabled");	
sceneObjects['btn_lines_minus'].gotoAndStop("enabled");	
sceneObjects['btn_bet_plus'].gotoAndStop("enabled");	
sceneObjects['btn_bet_minus'].gotoAndStop("enabled");	

sceneObjects['btn_gamble'].gotoAndStop("disabled");	
sceneObjects['btn_takewin'].gotoAndStop("disabled");	
sceneObjects['btn_info'].gotoAndStop("enabled");	
if(GameEvent=="betting"){
sceneObjects["btn_auto"].gotoAndStop("enabled");	
}

	
}else if(GameEvent=="takewin"){
	

sceneObjects['btn_spin'].gotoAndStop("disabled");	
sceneObjects['btn_takewin'].gotoAndStop("enabled");	
sceneObjects['btn_takewin'].visible=true;
stage.addChild(sceneObjects['btn_takewin']);
sceneObjects['btn_gamble'].gotoAndStop("enabled");	
sceneObjects['btn_info'].gotoAndStop("disabled");	
sceneObjects['btn_lines_minus'].gotoAndStop("disabled");	
sceneObjects['btn_lines_minus'].gotoAndStop("disabled");	
sceneObjects['btn_bet_minus'].gotoAndStop("disabled");	
sceneObjects['btn_bet_minus'].gotoAndStop("disabled");
if(!gameInfo.autoStart){
sceneObjects['btn_auto'].gotoAndStop("disabled");	
}

	
}		

sceneObjects['btn_spin'].visible=false;	
sceneObjects['btn_takewin'].visible=false;	


sceneObjects['btn_gamble'].visible=false;		
sceneObjects['btn_info'].visible=false;	
sceneObjects['btn_lines_minus'].visible=false;	
sceneObjects['btn_lines_plus'].visible=false;	
sceneObjects['btn_bet_minus'].visible=false;	
sceneObjects['btn_bet_plus'].visible=false;	

sceneObjects['btn_auto'].visible=false;	

gameUI.UpdateButtons();
	
};

function RemoveAnimSym(){

for(var i=0; i<=4;i++){
	
for(var j=0; j<=2;j++){
	
if(sceneAnimSym['v'+i+'h'+j]!=undefined){	
	
stage.removeChild(sceneAnimSym['v'+i+'h'+j]);	
delete sceneAnimSym['v'+i+'h'+j];
}

}
}	
	
};

function AddWin(){
HideCover();
clearTimeout(lcInter);
StopSound("");

RemoveAnimSym();

if(gameInfo.freegames>0){
gameInfo.bonusWin+=gameInfo.win;	
}

setTimeout(function(){
if(GameEvent=="double_is_open"){
GameEvent="addwin_double";		
}else{

GameEvent="addwin";		
	
}},300);

sceneObjects['cnt_win'].visible=true;
sceneObjects['text_win'].visible=true;
sceneObjects['cnt_win'].text=gameInfo.win;
gameInfo.paid=gameInfo.win;	
gameInfo.adw=1;	
gameInfo.adw2=1;	
gameInfo.adwFps=7;	
createjs.Ticker.setFPS(gameInfo.adwFps);
};

function LockButtons(){
	

sceneObjects['btn_spin'].gotoAndStop("disabled");	

sceneObjects['btn_gamble'].gotoAndStop("disabled");	
sceneObjects['btn_lines_minus'].gotoAndStop("disabled");	
sceneObjects['btn_lines_plus'].gotoAndStop("disabled");	
sceneObjects['btn_bet_minus'].gotoAndStop("disabled");	
sceneObjects['btn_bet_plus'].gotoAndStop("disabled");	
sceneObjects['btn_info'].gotoAndStop("disabled");	
sceneObjects['btn_takewin'].gotoAndStop("disabled");	
if(!gameInfo.autoStart){
sceneObjects['btn_auto'].gotoAndStop("disabled");	
}

gameUI.LockButtons();
	
};


function ReBet(){


	
for(var i=0; i<=bets.length-1; i++){

if(gameInfo.bet<=gameInfo.credit){
break;	
}

if(betCnt>0 ){
betCnt--;
gameInfo.betline=bets[betCnt];	
}	
gameInfo.bet=gameInfo.betline*gameInfo.lines;


	
}	


for(var i=1; i<=20; i++){

if(gameInfo.bet<=gameInfo.credit){
break;	
}

if(gameInfo.lines>1 ){
gameInfo.lines--;

}	
gameInfo.bet=gameInfo.betline*gameInfo.lines;


	
}

UpdateCounters();
SelectLines();
	
};

function SelectLines(){

clearTimeout(gameInfo.hlI);

for(var i=1; i<=9; i++){
	
stage.removeChild(sceneObjects['l'+i]);
stage.removeChild(sceneObjects['btext_r'][i]);
stage.removeChild(sceneObjects['btext_l'][i]);
	
if(i<=gameInfo.lines){
sceneObjects['bl'+i+'l'].visible=true;	
sceneObjects['bl'+i+'r'].visible=true;	
stage.addChild(sceneObjects['l'+i]);	
stage.addChild(sceneObjects['btext_r'][i]);
stage.addChild(sceneObjects['btext_l'][i]);

}else{
sceneObjects['bl'+i+'l'].visible=false;	
sceneObjects['bl'+i+'r'].visible=false;		
	
}	

	
}	

gameInfo.hlI=setTimeout(HideLines,1000);
	
};

function HideLines(){
clearTimeout(gameInfo.hlI);	
for(var i=1; i<=9; i++){
	
stage.removeChild(sceneObjects['l'+i]);
}	
	
}

function ActionButtons(bname){
	

	
HideLines();
if(!gameInfo.autoStart){	
isKeyPress=true;
}
stage.removeChild(sceneObjects['wnd_bonus']);

if(typeof(bname)!="string"){

if(bname.currentTarget.name=="btn_fullscreen"){

SetFullscreen();
sceneObjects['btn_fullscreen'].visible=false;	
sceneObjects['btn_fullscreen1'].visible=true;	
	
}
if(bname.currentTarget.name=="btn_fullscreen1"){

ExitFullscreen();

sceneObjects['btn_fullscreen'].visible=true;	
sceneObjects['btn_fullscreen1'].visible=false;	
	
}

if(bname.currentTarget.name=="btn_snd"){

StopSound("");
enableSound=false;
sceneObjects['btn_snd'].visible=false;	
sceneObjects['btn_snd1'].visible=true;	
	
}
if(bname.currentTarget.name=="btn_snd1"){

enableSound=true;

sceneObjects['btn_snd'].visible=true;	
sceneObjects['btn_snd1'].visible=false;	
	
}

}

if(GameEvent=="spin" && bname=="btn_spin"){


	
for(var i=0; i<5; i++){
	
if(gameInfo.reelsCnt[i]>4){
gameInfo.reelsCnt[i]=3+i;	
}	

}
gameUI.cObjects['ui_btnSkip'].Disable();
return;	
}


if(GameEvent=="bonus"){
	
GameEvent="takewin";





StartRollBonusGame();
return;	
}

if(GameEvent=="info_is_open"){
GameEvent="info_close";	
PlaySound("ui_overlay_open");
return;	
}


if(bname=="btn_auto"){

if(!gameInfo.autoStart){
gameInfo.autoStart=true;
ActionButtons("btn_spin");
sceneObjects['text_auto'].visible=true;	
}else{
sceneObjects["btn_auto"].gotoAndStop("disabled");		
gameInfo.autoStart=false;
sceneObjects['text_auto'].visible=false;	
LockButtons();
}


if(gameInfo.autoStart){
PlaySound("ui_autoplay");	
	
}else{
PlaySound("ui_autoplay_stop");		
}

return;	
}




if(bname=="btn_spin"){

sceneObjects['text_win'].visible=false;	
sceneObjects['cnt_win'].visible=false;	
sceneObjects['text_lw'].text="";
	
if(GameEvent=="betting" && (gameInfo.credit>=gameInfo.bet || gameInfo.freegames>0)){
	

	
if(gameInfo.freegames>0){
sceneObjects['cnt_win'].visible=true;
sceneObjects['text_win'].visible=true;	
gameInfo.freegames--;		
ServerConnect("freegame");	
StartRoll();
return;	
}	
	
	
	
gameInfo.credit-=gameInfo.bet;	
UpdateCounters();
LockButtons();
ServerConnect("spin");	
StartRoll();
}

if(GameEvent=="takewin" || GameEvent=="double_is_open"){

if(GameEvent=="double_is_open"){
	
	
}else{

	
}
if(gameInfo.freegames>0){
GameEvent="betting";

HideCover();
clearTimeout(lcInter);
StopSound("");

RemoveAnimSym();

if(gameInfo.freegames>0){
gameInfo.bonusWin=gameInfo.win;	
}

if(gameInfo.freegames==1){
StopSound("");	
EndBonusGame();
return;	
}

if(gameInfo.freegames>0){
StopSound("");	
ActionButtons("btn_spin");
return;	
}

return;	
}		
AddWin();



LockButtons();	
}	
	

	

	
}else if(bname=="btn_red"){

SelectRed();
	
}else if(bname=="btn_black"){

SelectBlack();
	
}else if(bname=="btn_gamble"){

setTimeout(OpenDouble,200);

	
}else if(bname=="btn_bet_plus"){
betCnt++;
	
PlaySound("ui_changebet");


if(betCnt>bets.length-1){
betCnt=0;	
}

gameInfo.betline=bets[betCnt];	
gameInfo.bet=gameInfo.betline*gameInfo.lines;
LockButtons();
UpdateButtons();
UpdateCounters();	
}else if(bname=="btn_bet_minus"){
betCnt--;


PlaySound("ui_changebet");



if(betCnt<0){
betCnt=0;	
}

gameInfo.betline=bets[betCnt];	
gameInfo.bet=gameInfo.betline*gameInfo.lines;
LockButtons();
UpdateButtons();
UpdateCounters();	
}else if(bname=="btn_lines_plus"){
gameInfo.lines++;


PlaySound("ui_changebet");




	

if(gameInfo.lines>9){

gameInfo.lines=1;

}	

	




	
gameInfo.bet=gameInfo.betline*gameInfo.lines;
LockButtons();
UpdateButtons();
UpdateCounters();
SelectLines();	
}else if(bname=="btn_lines_minus"){
gameInfo.lines--;


PlaySound("ui_changebet");



if(gameInfo.lines<1){
gameInfo.lines=1;
}

if(gameInfo.lines!=20 && gameInfo.extraBet){

SelectExtrabet();	
}
	
gameInfo.bet=gameInfo.betline*gameInfo.lines;
LockButtons();
UpdateButtons();
UpdateCounters();
SelectLines();	
}else if(bname=="btn_info"){
UpdateRules();
PlaySound("ui_overlay_open");
stage.addChild(sceneObjects['game_info']);
sceneObjects['game_info'].scaleX=1;
sceneObjects['game_info'].x=0;
sceneObjects['game_info'].y=-1366;
gameInfo.infAnim=new Array(-1253,-1140,-1027,-914,-688,-575,-462,-349,-236,-123,-10,0);
gameInfo.infCnt=0;
LockButtons();
GameEvent="info_open";	

};

if(gameInfo.credit<gameInfo.bet && bname=="btn_spin" && GameEvent=="betting"){
	
ReBet();
	
}
	
};

