


$(window).resize(function() {
onOrientationChange();
});




$(window).ready(function() {
//$(window).click(SetFullscreen);
$("#rotate").hide();

$("#mainCanvas").show();

window.addEventListener("orientationchange", onOrientationChange );

if($(window).width()>=$(window).height()){
Game();	
}else{
onOrientationChange();		
}
sizeHandler();

});


function LockGame2(){

	
isLock=true;

$("#mainCanvas").hide();	


$("#rotate").show();

//////////////////////////////////



    var rw = 230;
	var rh = 200;
	var w = $(window).width()-220;
	var h = $(window).height()-220;
    multiplier = Math.min((h / rh), (w / rw));
	var destW = rw * multiplier;
	var destH = rh * multiplier;
	$("#rotate-img").css("width",destW+"px");
	$("#rotate-img").css("height",destH+"px");	
	$("#rotate").css("padding-top",(h-destH-(rh/2))+"px");	
	$("#rotate").css("padding-left",(($(window).width()/2)-destW/2)+"px");	
	
///////////////////////////////////




	
};
function UnlockGame2(){
isLock=false;
$("#rotate").hide();

if(GameEvent!="loading"){

   

	$("#mainCanvas").show();
	
	SetFullscreen();
    sizeHandler();	
}else{
$("#mainCanvas").show();	
Game();
sizeHandler();


}

};
function onOrientationChange(){
   
      if(window.innerWidth<window.innerHeight){
LockGame2();		
 sizeHandler();		
		  
	  } else{
		  
		 if(isLock){
		 UnlockGame2();   
		 
	   }
	 sizeHandler();
		
		  
	  } 
	
	
  SetFullscreen(); 
   
};

function fullScreenCancel() {

  if(document.requestFullScreen) {

    document.requestFullScreen();

  } else if(document .webkitRequestFullScreen ) {

    document.webkitRequestFullScreen();

  } else if(document .mozRequestFullScreen) {

    document.mozRequestFullScreen();

  }

};


function sizeHandler() {

	

	if (!$("#mainCanvas")){
		return;
	}

	var rw = $(window).width();
	var rh =$(window).height();
	
	$("#mainCanvas").css("width",rw+"px");
	$("#mainCanvas").css("height",rh+"px");	


	
	
	
};



function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
