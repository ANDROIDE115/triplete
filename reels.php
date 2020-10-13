<?php

function GetRows($isBonus){

global $minwin;
global $bet;

if($minwin>=2500*$bet){
$minwin=2500*$bet;
$row[0]=array(9,10,11,13);
$row[1]=array(9,10,11,13);
$row[2]=array(9,10,11,13);
$row[3]=array(9,10,11,13);
$row[4]=array(9,10,11,13);	
}else if($minwin>=1200*$bet){
$minwin=1200*$bet;	
$row[0]=array(6,7,8,9,10,12,13);
$row[1]=array(6,7,8,9,10,13);
$row[2]=array(6,7,8,9,10,13);
$row[3]=array(6,7,8,9,10,13);
$row[4]=array(6,7,8,9,10,12,13);	
}else{
$row[0]=array(1,2,3,4,5,6,7,8,9,10,11,12,13);
$row[1]=array(1,2,3,4,5,6,7,8,9,10,11,13);
$row[2]=array(1,2,3,4,5,6,7,8,9,10,11,13);
$row[3]=array(1,2,3,4,5,6,7,8,9,10,11,13);
$row[4]=array(1,2,3,4,5,6,7,8,9,10,11,12,13);	
}

shuffle($row[0]);
shuffle($row[1]);
shuffle($row[2]);
shuffle($row[3]);
shuffle($row[4]);
  
  return array($row[0][0],$row[0][1],$row[0][2],$row[1][0],$row[1][1],$row[1][2],$row[2][0],$row[2][1],$row[2][2],$row[3][0],$row[3][1],$row[3][2],$row[4][0],$row[4][1],$row[4][2]);
 }
  
  
 
  
  
?>