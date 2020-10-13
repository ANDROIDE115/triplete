var sndArr=new Array(
"gamble_card",
"gamble_click",
"gamble_decide",
"gamble_start",
"gamble_win",
"reelset_moving",
"reelset_reel_stop",
"ui_autoplay",
"ui_autoplay_stop",
"ui_changebet",
"ui_click",
"ui_overlay_open",
"win_combination1",
"win_combination2",
"win_combination3",
"win_combination4",
"win_combination5",
"win_combination6",
"win_combination7",
"win_combination8",
"win_combination9",
"win_combination10",
"win_combination11",
"win_combination12",
"1_bonusback",
"2_startbonus",
"3_endbonus",
"4_scatter",
"addwin"

);


 createjs.Sound.registerPlugins([createjs.WebAudioPlugin]);
 createjs.Sound.alternateExtensions = ["mp3"];





function SoundsLoad(){
	
for(var i=0;i<sndArr.length;i++){	
 createjs.Sound.registerSound("sounds/"+sndArr[i]+".ogg", sndArr[i]);	
}


}


function PlaySound(sid){
	
createjs.Sound.play(sid);

	
}


function StopSound(sid){
	
createjs.Sound.stop(sid);

	
}


SoundsLoad();