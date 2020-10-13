<?php
	 include_once '../../../engine/cfg.php';
	include_once '../../../engine/ini.php';
	include_once 'reels.php';
	if(!in_array ($status, $can_game,1))
    die();
	
	function winlimit($type)
	{
	global $user_id;
	   $bank=get_bank($user_id,'mystic_secret',$type);
	    return $bank;
	}
	
	$userId=$user_id;
   

    $winall2=0;
	

	$action = isset($_POST['action']) ? $_POST['action'] : 'error';
	$action = str_replace("-","", $action);
	$action = str_replace("`","", $action);
	$action = str_replace("'","", $action);
	
	
	
	
	
	

	$user_balance = floor( get_balance($userId) );

	if ($action != 'error')
	{
		$bet = isset($_POST['betline']) ? $_POST['betline'] : 0;
		$line = isset($_POST['lines']) ? $_POST['lines'] : 0;
		$allbet = $bet * $line;
	
		if ( $user_balance < 0 )
		{
		    $errorMessage = "error|Ошибка! Ваш баланс ($user_balance) недостаточен для игры";
		    $action = 'error';
		}
		elseif ( $action !='state' && ($bet < 0.01 || 10000 < $bet) )
		{
		    $action = "error";
			$errorMessage = "error|Ошибка! Ваша ставка ($bet) должна быть от 0.01 до 10000";
		}
		elseif ( ($action != 'state') && ($action != 'double') && !in_array($line, array(1,2,3,4,5,6,7,8,9)) )
		{
		    $action = "error";
			$errorMessage = "error|Ошибка! Выбранное вами количество линий игры ($line) должно быть от 1 до 9";
		}
		elseif ( ($action == 'spin') && ($user_balance < $allbet ) )
		{
		    $action = "error";
			$errorMessage = "error|Ошибка! Ваш баланс ($user_balance) недостаточен для игры по сделанной ставке ($allbet)";
		}
		elseif (($action == 'freegame') && !isset($_SESSION['moneygame_freeGameCount']))
		{
			$_SESSION['moneygame_FullBWin']=0;
			$_SESSION['moneygame_freeGameCount']=10;
			$tm = date('h-i-s, j-m-y');
			file_put_contents("game_report.log","moneygame|$action|session not set|$tm|win:".$_SESSION['moneygame_win']);
		}
		elseif (($action == 'finish') && !isset($_SESSION['moneygame_win']))
		{
			$action = 'error';
			$errorMessage = 'error|Ошибка - finish! Попытка повлиять на игру. Ваш аккаунт блокирован';
			block_user($userId);
		}
		elseif (!in_array($action, array('error', 'state', 'spin', 'double', 'freegame', 'finish')))
		{
			$action = 'error';
			$errorMessage = 'error|Ошибка! Попытка повлиять на игру. Ваш аккаунт блокирован';
			block_user($userId);
		}
	}
	
	/*    Error   */
	if ( $action == "error" )
	{
	    $msg= isset($errorMessage) ? $errorMessage : 'error|Ошибка! Неверное действие';
	    ge_serv_show_str($msg);
	}
	
	/*    Init    */
	if ( $action == "state" )
	{
	    ge_serv_show_str( "result=ok&state=0&min=1&id=$user_array[login]&balance=$user_balance");
		if (isset($_SESSION['moneygame_win']))
			unset($_SESSION['moneygame_win']);
		if (isset($_SESSION['moneygame_freeGameCount']))
			unset($_SESSION['moneygame_freeGameCount']);
		if (isset($_SESSION['moneygame_d']))
			unset($_SESSION['moneygame_d']);
			
			if (isset($_SESSION['microbank']))
			unset($_SESSION['microbank']);
			
			$_SESSION['microbank']=0;
	}

	
	/*    Spin   */
	if ( $action == "spin" )
	{
	    $stat_txt = "moneygame";
		unset($_SESSION[$stat_txt.'_d']);
	    $win1 = 0;
	    $win2 = 0;
	    $win3 = 0;
	    $win4 = 0;
	    $win5 = 0;
	    $win6 = 0;
	    $win7 = 0;
	    $win8 = 0;
	    $win9 = 0;
	    $winall = 0;

	    cange_balance($userId, $allbet*-1);
	    $rowb9 = get_game_settings('moneygame');
	    $proc4 = $rowb9['g_proc'];
	    $allbet23 = $allbet / 100 * $proc4;
	   change_bank($user_id,'moneygame',$allbet23,"spin");
	$pr30_shans=rand(1,3);
	$_SESSION['microbank']+=$allbet23;
	    $g_rezim = 5;

	    
		
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
		
	    $m_line = array( 1, 4, 7, 10, 13, 0, 3, 6, 9, 12, 2, 5, 8, 11, 14, 0, 4, 8, 10, 12, 2, 4, 6, 10, 14, 1, 5, 8, 11, 13, 1, 3, 6, 9, 13, 2, 5, 7, 9, 12, 0, 3, 7, 11, 14 );
	    $km2 = 0;
	    for ($m_ln = 0; $m_ln <= 8; ++$m_ln )
	    {
	        for ($km = 0; $km <= 4; ++$km )
	        {
	            $lin[$m_ln][$km] = $m_line[$km2];
	            ++$km2;
	        }
	    }
		
	    $shs = explode( "|", $rowb9['g_shanswin'] );
	    if ( $line == 1 )
	    {
	        $ooo2 = $shs[0];
	    }
	    if ( $line == 3 )
	    {
	        $ooo2 = $shs[1];
	    }
	    if ( $line == 5 )
	    {
	        $ooo2 = $shs[2];
	    }
	    if ( $line == 7 )
	    {
	        $ooo2 = $shs[3];
	    }
	    if ( $line == 9 )
	    {
	        $ooo2 = $shs[4];
	    }
		     /////////////////////////////////////game_setting
		$rnd_bonus=0;
	    $rnd_result =0;
		$gset=spin("spin",$bet,$line);
		if($gset['type']=="bon"){
	    $rnd_bonus =1;
		}
		if($gset['type']=="win"){
		$rnd_result =1;
		} 
		$casbank = $gset['sum']; 
		////////////////////////////////////game_setting
		
		
		
	    if ($rnd_result == 1)
	        $mas_win = 1; // Если должен выиграть
	    else
	        $mas_win = 0;

		if ( ($mas_win == 1) && ($rnd_bonus == 1) && ($casbank < $bet * 2 + $bet * $psym[12][3]) )
	        $rnd_bonus = 0;
		if ( ($mas_win == 1) && ($casbank < $bet*2) )
			$mas_win = 0;
		if ( ($rnd_bonus == 1) && ($casbank < $allbet * 5) )
			$rnd_bonus = 0;

	    $am = 0;
		$lc = 0;
	

    if($conf['garant_win_on']){///////////////////// GARANT		
	
$is_minwin=1;
	
	
	
	$minwin=round(($casbank/100)*50);
	
	}else{	///////////////////// !GARANT		
			
			/////////////////////////minwin 
	$is_minwin=rand(1,6);
	
	if($is_minwin==1){
	
	
	$wimtype=rand(1,3);
	
	if($wimtype==1){
	$minwin=$bet* $psym[rand(8,11)][rand(4,5)]*3;
	}
	if($wimtype==2){
	$minwin=$bet* $psym[rand(5,8)][rand(4,5)]*3;
	}
	if($wimtype==3){
	$minwin=$bet* $psym[rand(3,5)][rand(4,5)]*3;
	}
	if($minwin>$casbank){
	$minwin=0;
	}
	
	}
	
	}
	///////////////////////////
	    while ( $am < 100000 )
	    {
	        $map_win = array( 0, 0, 0, 0, 0, 0, 0, 0, 0 );
			$win10 = 0;
			
	        $mx2=GetRows(false);

	        for ( $k = 0; $k <= 14; ++$k )
	            $map[$k] = $mx2[$k];
			$scatterCnt=0;
			for ($k = 0; $k <= 14; $k++){
					if ($map[$k] == 12){
						$scatterCnt += 1;
					}
					}
			/*---------------2scatter--------------------*/		
			$scatterwin=rand(1,10);		
					
			if($scatterwin==1 && $scatterCnt<1 && $mas_win==1){
            $scatterCnt+=2;
			$rnd_row=array(0,1,2,3,4);
			
			shuffle($rnd_row);
			
			for($i=0; $i<2;$i++){
			
			if($map[($rnd_row[$i]*3)]!=12 && $map[($rnd_row[$i]*3)+1]!=12 && $map[($rnd_row[$i]*3)+2]!=12){
			$map[($rnd_row[$i]*3)+rand(0,2)]=12;
			}
			
			}
			
            }			
			/*-----------------------------------*/		
			if ($rnd_bonus == 1)
			{
				$tttb1 = array( 0, 1, 2 );
				shuffle($tttb1);
				$tttb2 = array( 3, 4, 5 );
				shuffle($tttb2);
		        $tttb3 = array( 6, 7, 8 );
				shuffle($tttb3);
		        $tttb4 = array( 9, 10, 11 );
				shuffle($tttb4);
				$tttb5 = array( 12, 13, 14 );
				shuffle($tttb5);
				$tempArray = array(1, 2, 3, 4, 5);
				shuffle($tempArray);
				
				if ($mas_win == 1)
				{
					do
					{
						switch ($g_rezim)
						{
							case 1:
							case 2:
								$bonusSymCount = rand(3, 4);
								break;
							default:
								$bonusSymCount = rand(3, 5);
						}
					}while ($casbank < $allbet * $psym[12][$bonusSymCount]);
				}
				else
				{
					do
					{
						switch ($g_rezim)
						{
							case 1:
							case 2:
								$bonusSymCount = rand(3, 4);
								break;
							default:
								$bonusSymCount = rand(3, 5);
						}
					}while ($casbank < $allbet * $psym[12][$bonusSymCount]);
				}
				
				$symBon = 0;
				for ($k = 0; $k < 15; $k++)
					if ($map[$k] == 12)
						$symBon += 1;
				
				for ($k = 1, $i = 0; $k <= $bonusSymCount - $symBon; $k++, $i++)
				{
					$tttbX = 'tttb'.$tempArray[$i];
					if ( ($map[${$tttbX}[0]] == 12) || ($map[${$tttbX}[1]] == 12) || ($map[${$tttbX}[2]] == 12) )
						$k -= 1;
					else
						$map[${$tttbX}[0]] = 12;
				}
				
					$_SESSION['moneygame_freeGameCount'] = 15;
					$_SESSION['moneygame_FullBWin']=$gset['sum'];
       
			$_SESSION['moneygame_CurBWin']=0;
				$win10 = $allbet * $psym[12][$bonusSymCount];
			}
			/*----------------------------*/
		$symBon=0;
		for ($k = 0; $k < 15; $k++){
			
		if ($map[$k] == 12){
		$symBon ++;
		}
		
		}
		$win10 = $allbet * $psym[12][$symBon];
		/*-----------------------------*/
			 $wpos=array(0,0,0,0,0,0,0,0,0,0,0,0,0);
				$wpos_side=array("","","","","","","","","","","","","");
	        for ( $ln = 0; $ln <= $line-1; ++$ln )
	        {
	            $s1 = $map[$lin[$ln][0]];
	            $s2 = $map[$lin[$ln][1]];
	            $s3 = $map[$lin[$ln][2]];
	            $s4 = $map[$lin[$ln][3]];
	            $s5 = $map[$lin[$ln][4]];
				$gg = 1;
				


if ($s1 == 13 && $s2 == 13 ){
					   $map_win[$ln] = $psym[13][2];
}


if ($s1 == 13 && $s2 == 13 && $s3 == 13){
					   $map_win[$ln] = $psym[13][3];
}

if ($s1 == 13 && $s2 == 13 && $s3 == 13 && $s4 == 13){
					   $map_win[$ln] = $psym[13][4];
}
if ($s1 == 13 && $s2 == 13 && $s3 == 13 && $s4 == 13 && $s5 == 13){
					   $map_win[$ln] = $psym[13][5];
}

	             if ($s1 == 13 && $s2 != 12 && $s2!=13)
				{
					$s1 = $s2;
					$gg = 2;
				}
				if ($s2 == 13 && $s1 != 12 && $s1!=13)
				{
					$s2 = $s1;
					$gg = 2;
				}
				if ( $s1 == 13 && $s2 == $s3 && $s2 != 12)
	            {
	                $s1 = $s2;
	                $gg = 2;
	            }
	            if ( $s2 == 13 && $s1 == $s3 && $s1 != 12)
	            {
	                $s2 = $s3;
	                $gg = 2;
	            }
	            if ( $s3 == 13 && $s1 == $s2 && $s1 != 12)
	            {
	                $s3 = $s2;
	                $gg = 2;
	            }
	            if ( $s1 == 13 && $s2 == 13 && $s3 != 12)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	                $gg = 2;
	            }
	            if ( $s2 == 13 && $s3 == 13 && $s1 != 12)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	                $gg = 2;
	            }
	            if ( $s1 == 13 && $s3 == 13 && $s2 != 12)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	                $gg = 2;
	            }
	            if ( $s1 == 13 && $s2 == $s3 && $s3 == $s4 && $s2 != 12)
	            {
	                $s1 = $s2;
	                $gg = 2;
	            }
	            if ( $s2 == 13 && $s1 == $s3 && $s3 == $s4 && $s1 != 12)
	            {
	                $s2 = $s3;
	                $gg = 2;
	            }
	            if ( $s3 == 13 && $s1 == $s2 && $s2 == $s4 && $s1 != 12)
	            {
	                $s3 = $s2;
	                $gg = 2;
	            }
	            if ( $s4 == 13 && $s1 == $s2 && $s2 == $s3 && $s1 != 12)
	            {
	                $s4 = $s2;
	                $gg = 2;
	            }
	            if ( $s1 == 13 && $s2 == 13 && $s3 == $s4 && $s3 != 12)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
	                $gg = 2;
	            }
	            if ( $s1 == 13 && $s3 == 13 && $s2 == $s4 && $s2 != 12)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
	                $gg = 2;
	            }
	            if ( $s1 == 13 && $s4 == 13 && $s2 == $s3 && $s2 != 12)
	            {
	                $s1 = $s2;
	                $s4 = $s2;
	                $gg = 2;
	            }
	            if ( $s2 == 13 && $s3 == 13 && $s1 == $s4 && $s1 != 12)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
	                $gg = 2;
	            }
	            if ( $s2 == 13 && $s4 == 13 && $s1 == $s3 && $s1 != 12)
	            {
	                $s2 = $s1;
	                $s4 = $s1;
	                $gg = 2;
	            }
	            if ( $s3 == 13 && $s4 == 13 && $s1 == $s2 && $s1 != 12)
	            {
	                $s3 = $s1;
	                $s4 = $s1;
	                $gg = 2;
	            }
				if ($s1 == 13 && $s2 == 13 && $s3 == 13 && $s4 != 12)
				{
					$s1 = $s4;
					$s2 = $s4;
					$s3 = $s4;
					$gg = 2;
				}
				if ($s1 == 13 && $s2 == 13 && $s3 == 13 && $s4 == 13 && $s5 != 12)
				{
					$s1 = $s5;
					$s2 = $s5;
					$s3 = $s5;
					$s4 = $s5;
					$gg = 2;
				}
				if ($s5 == 13 && $s4 == $s3 && $s3 == $s2 && $s2 == $s1 && $s4 != 12)
				{
					$s5 = $s2;
					$gg = 2;
				}
				



				if ($s1 == $s2 && $s1 != 12 && $s1 != 13){
					   $map_win[$ln] = ($map_win[$ln] < $psym[$s2][2]*$gg) ? $psym[$s2][2] * $gg : $map_win[$ln];
					     $wpos[$ln]=2;	
					$wpos_side[$ln]=1;
				}
	            if ( $s1 == $s2 && $s2 == $s3 && $s1 != 12 && $s1 != 13)
	            {
	                $map_win[$ln] = ($map_win[$ln] < $psym[$s2][3]*$gg) ? $psym[$s2][3] * $gg : $map_win[$ln];
					  $wpos[$ln]=3;	
					$wpos_side[$ln]=1;
	            }
	            if ( $s1 == $s2 && $s2 == $s3 && $s3 == $s4 && $s1 != 12 && $s1 != 13)
	            {
	                $map_win[$ln] = ($map_win[$ln] < $psym[$s2][4]*$gg) ? $psym[$s2][4] * $gg : $map_win[$ln];
					  $wpos[$ln]=4;	
					$wpos_side[$ln]=1;
	            }
	            if ( $s1 == $s2 && $s2 == $s3 && $s3 == $s4 && $s4 == $s5 && $s1 != 12 && $s1 != 13)
	            {
	              $map_win[$ln] = ($map_win[$ln] < $psym[$s2][5]*$gg) ? $psym[$s2][5] * $gg : $map_win[$ln];
				    $wpos[$ln]=5;	
					$wpos_side[$ln]=1;
	            }
				if ( $s1 == $s2 && $s2 == $s3 && $s3 == $s4 && $s4 == $s5 && $s1 == 13)
	            {
	                $map_win[$ln] = $psym[$s2][5];
					  $wpos[$ln]=5;	
					$wpos_side[$ln]=1;
	            }
	        }
			
	        $winArr=array();
	        for ( $k = 1; $k <= 15; ++$k )
	        {
	            ${ "sym".$k } = $map[$k - 1];
	        }

	        for ( $k = 1; $k <= 9; ++$k )
	        {
	            ${ "win".$k } = $bet * $map_win[$k - 1];
				if(${ "win".$k }>0){
				$tmp_str=($k-1)."_".${ "win".$k }."_".$wpos[$k-1]."_".$wpos_side[$k-1];	
				array_push($winArr,$tmp_str);	
				}
	        }
			
	        if ( $line == 1 )
	        {
	            $win2 = 0;
	            $win3 = 0;
	            $win4 = 0;
	            $win5 = 0;
	            $win6 = 0;
	            $win7 = 0;
	            $win8 = 0;
	            $win9 = 0;
	        }
	        if ( $line == 2 )
	        {
	            $win3 = 0;
	            $win4 = 0;
	            $win5 = 0;
	            $win6 = 0;
	            $win7 = 0;
	            $win8 = 0;
	            $win9 = 0;
	        }
	        if ( $line == 3 )
	        {
	            $win4 = 0;
	            $win5 = 0;
	            $win6 = 0;
	            $win7 = 0;
	            $win8 = 0;
	            $win9 = 0;
	        }
	        if ( $line == 4 )
	        {
	            $win5 = 0;
	            $win6 = 0;
	            $win7 = 0;
	            $win8 = 0;
	            $win9 = 0;
	        }
	        if ( $line == 5 )
	        {
	            $win6 = 0;
	            $win7 = 0;
	            $win8 = 0;
	            $win9 = 0;
	        }
	        if ( $line == 6 )
	        {
	            $win7 = 0;
	            $win8 = 0;
	            $win9 = 0;
	        }
	        if ( $line == 7 )
	        {
	            $win8 = 0;
	            $win9 = 0;
	        }
	        if ( $line == 8 )
	        {
	            $win9 = 0;
	        }
			
	        if ($rnd_bonus != 1)
	        	$winall = $win1 + $win2 + $win3 + $win4 + $win5 + $win6 + $win7 + $win8 + $win9 + $win10;
			else
				$winall = $win1 + $win2 + $win3 + $win4 + $win5 + $win6 + $win7 + $win8 + $win9;
	        ++$am;
	
			
			if ( $mas_win == 1 && $winall == 0 )
	        {
	            $am = 10;
	        }
			if ( $mas_win == 1 && 0 < $winall )
	        {
	            $am = 120000;
	        }
	        if ( $mas_win == 0 && $winall == 0 )
	        {
	            $am = 120000;
	        }
	        if ( $rnd_bonus == 1 && $casbank < ($winall = $winall + $win10) )
	        {
	            $am = 10;
	        }
			if($is_minwin==1 && $mas_win==1 && $winall<$minwin ){//////////////minwin
			$am = 10;
			
			}
	$mbank=$_SESSION['microbank'];
	$pr30=round(($mbank/100)*30);
	
	$pr30=round(($pr30/9)*$line);
	if($pr30<2 or $mbank<=0 or $casbank<=$pr30){$pr30_shans=0;}
	
	
		if ($user_balance<=27 && $pr30_shans == 1 && $winall==0 && $pr30<$casbank )
	        {
	            $am = 10;
	        }
	
	if ( $user_balance<=27 && $pr30_shans == 1 && $winall>($pr30-(4*$bet)) && $winall<=$pr30 )
	        {
	            $am = 120000;
	        }
	if ( $rnd_bonus != 1 && $casbank < $winall)
	        {
	            $am = 10;
	        }

			if ( $rnd_bonus != 1 && $scatterCnt>=3)
	        {
	            $am = 10;
				
	        }
		
		   
			
			
			
			
	if($lc>=800){
	$mas_win=0;
        $rnd_bonus=0;
       $pr30_shans=0;   
	}
	$lc++;
	////////////////////////////////////////////////////
	if($am>=120000 && $winall>0){
	
	  if($rnd_bonus==1){
	        $bank_result=change_bank($user_id,'moneygame',$winall*-1,"bonus");
			}else{
			$bank_result=change_bank($user_id,'moneygame',$winall*-1,"spin");
			}
			
			if($bank_result===false || $bank_result<0){
			
			$mas_win=0;
        $rnd_bonus=0;
        $pr30_shans=0;
		$am=10;
			}
	
	}
	//////////////////////////////////////////////////
	    }
		
		$winall44 = sprintf( "%01.2f", $winall );
		if ( 0 < $winall )
		{
			cange_balance($userId, $winall44);
	      
	$_SESSION['microbank']-=$winall44;
			$_SESSION['moneygame_win'] = $winall;
		}
		
		$user_balance = floor( get_balance($userId) );
 for ( $k = 1; $k <= 10; ++$k )
	        {
	            ${ "win".$k } = ${ "win".$k }*1;
	        }
		$wl=implode(":",$winArr);
		$winString="$win1|$win2|$win3|$win4|$win5|$win6|$win7|$win8|$win9|$win10";
		ge_serv_show_str( "result=ok&wl=$wl&scatter_win=$win10&winString=$winString&info=|$sym1|$sym2|$sym3|$sym4|$sym5|$sym6|$sym7|$sym8|$sym9|$sym10|$sym11|$sym12|$sym13|$sym14|$sym15|". 
    "$bet|$line|$allbet|$winall|0|$allbet|$winall|0|1|0&id=$user_array[login]&balance=$user_balance");

   	set_stat_game($userId, $user_balance, $allbet,$winall44,$stat_txt);
	}
	
	/*   Free game   */
	if ($action == 'freegame')
	{
		$stat_txt = "moneygame_free";
		
	    $win1 = 0;
	    $win2 = 0;
	    $win3 = 0;
	    $win4 = 0;
	    $win5 = 0;
	    $win6 = 0;
	    $win7 = 0;
	    $win8 = 0;
	    $win9 = 0;
	    $winall = 0;

	    $rowb9 = get_game_settings('moneygame');
	    $g_rezim = 5;

	    
		
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
		
	    $m_line = array( 1, 4, 7, 10, 13, 0, 3, 6, 9, 12, 2, 5, 8, 11, 14, 0, 4, 8, 10, 12, 2, 4, 6, 10, 14, 1, 5, 8, 11, 13, 1, 3, 6, 9, 13, 2, 5, 7, 9, 12, 0, 3, 7, 11, 14 );
	    $km2 = 0;
	    for ($m_ln = 0; $m_ln <= 8; ++$m_ln )
	    {
	        for ($km = 0; $km <= 4; ++$km )
	        {
	            $lin[$m_ln][$km] = $m_line[$km2];
	            ++$km2;
	        }
	    }
		
	    $shs = explode( "|", $rowb9['g_shanswin'] );
	    if ( $line == 1 )
	    {
	        $ooo2 = $shs[0];
	    }
	    if ( $line == 3 )
	    {
	        $ooo2 = $shs[1];
	    }
	    if ( $line == 5 )
	    {
	        $ooo2 = $shs[2];
	    }
	    if ( $line == 7 )
	    {
	        $ooo2 = $shs[3];
	    }
	    if ( $line == 9 )
	    {
	        $ooo2 = $shs[4];
	    }
		
	    
			
		////////////////////////////////////////////////////////////
	    $rnd_bonus=0;
	    $rnd_result =0;
		$gset=spin("spin",$bet,$line);
		if($gset['type']=="bon"){
	    $rnd_bonus =1;
		}
	
		$rnd_bonus=rand(1,30);	
	
		  
		///////////////////////////////////////////////////////////	
		$casbank=$_SESSION['moneygame_FullBWin']-$_SESSION['moneygame_CurBWin'];	
		$casbank_full=winlimit("bonus");
		if( $casbank<0){ $casbank=0;}	
		if($casbank_full<$casbank){$casbank=$casbank_full;}
		

		//////////////////////////////////////////////////////
		$winCnt=$_SESSION['moneygame_freeGameCount']-1;
	    $rnd_result = rand(1,2); // Шанс выиграть
		
		$maxwin=$casbank/($_SESSION['moneygame_freeGameCount']/2);
		$maxwinLimitDisabled=rand(1,2);
		if( $rnd_result == 1 && $_SESSION['moneygame_freeGameCount']<8){
		$maxwin=$casbank;
		}
		
		$minwin=round(($maxwin/100)*20);
		
		if($minwin>$psym[7][5]*$bet){
		
        $minwin	=$psym[7][5]*$bet;	
			
		}
		
		
		
		if($minwin>=$maxwin){
         $minwin=0;
        }	

        if($maxwin<$bet * $psym[1][2]){
		$maxwin=$casbank;	
		$minwin=0;
		}		
		///////////////////////////////////////////////////////////	
		  
	    if ($rnd_result == 1)
	        $mas_win = 1; // Если должен выиграть
	    else
	        $mas_win = 0;

				
			
			
		if ( ($mas_win == 1) && ($rnd_bonus == 1) && ($casbank < $bet * 2*3 + $allbet * $psym[12][3]*3) )
	        $rnd_bonus = 0;
		if ( ($mas_win == 1) && ($casbank < $bet*2*3) )
			$mas_win = 0;
		if ( ($mas_win == 1) && ($casbank < $minwin) )
			$mas_win = 0;	
		if ( ($rnd_bonus == 1) && ($casbank < $allbet * 5*3) )
			$rnd_bonus = 0;

	    $am = 0;
		$lc = 0;
		
	    while ( $am < 100000 )
	    {
	        $map_win = array( 0, 0, 0, 0, 0, 0, 0, 0, 0 );
			$win10 = 0;
			
	       $mx2=GetRows(true);
	        for ( $k = 0; $k <= 14; ++$k )
	            $map[$k] = $mx2[$k];
			$scatterCnt=0;
			for ($k = 0; $k <= 14; $k++){
					if ($map[$k] == 12){
						$scatterCnt += 1;
					}
					}
			/*---------------2scatter--------------------*/		
			$scatterwin=rand(1,10);		
					
			if($scatterwin==1 && $scatterCnt<1 && $mas_win==1){
            $scatterCnt+=2;
			$rnd_row=array(0,1,2,3,4);
			
			shuffle($rnd_row);
			
			for($i=0; $i<2;$i++){
			
			if($map[($rnd_row[$i]*3)]!=12 && $map[($rnd_row[$i]*3)+1]!=12 && $map[($rnd_row[$i]*3)+2]!=12){
			$map[($rnd_row[$i]*3)+rand(0,2)]=12;
			}
			
			}
			
            }			
			/*-----------------------------------*/			
			if ($rnd_bonus == 1)
			{
				$tttb1 = array( 0, 1, 2 );
				shuffle($tttb1);
				$tttb2 = array( 3, 4, 5 );
				shuffle($tttb2);
		        $tttb3 = array( 6, 7, 8 );
				shuffle($tttb3);
		        $tttb4 = array( 9, 10, 11 );
				shuffle($tttb4);
				$tttb5 = array( 12, 13, 14 );
				shuffle($tttb5);
				$tempArray = array(1, 2, 3, 4, 5);
				shuffle($tempArray);
				
				if ($mas_win == 1)
				{
					do
					{
						switch ($g_rezim)
						{
							case 1:
							case 2:
								$bonusSymCount = rand(3, 4);
								break;
							default:
								$bonusSymCount = rand(3, 5);
						}
					}while ($casbank < $allbet * $psym[12][$bonusSymCount]);
				}
				else
				{
					do
					{
						switch ($g_rezim)
						{
							case 1:
							case 2:
								$bonusSymCount = rand(3, 4);
								break;
							default:
								$bonusSymCount = rand(3, 5);
						}
					}while ($casbank < $allbet * $psym[12][$bonusSymCount]);
				}
				
				$symBon = 0;
				for ($k = 0; $k < 15; $k++)
					if ($map[$k] == 12)
						$symBon += 1;
				
				for ($k = 1, $i = 0; $k <= $bonusSymCount - $symBon; $k++, $i++)
				{
					$tttbX = 'tttb'.$tempArray[$i];
					if ( ($map[${$tttbX}[0]] == 12) || ($map[${$tttbX}[1]] == 12) || ($map[${$tttbX}[2]] == 12) )
						$k -= 1;
					else
						$map[${$tttbX}[0]] = 12;
				}
				
					$_SESSION['moneygame_freeGameCount'] += 15;
				$win10 = $allbet * $psym[12][$bonusSymCount];
			}
			/*----------------------------*/
		$symBon=0;
		for ($k = 0; $k < 15; $k++){
			
		if ($map[$k] == 12){
		$symBon ++;
		}
		
		}
		$win10 = $allbet * $psym[12][$symBon];
		/*-----------------------------*/
			$wpos=array(0,0,0,0,0,0,0,0,0,0,0,0,0);
				$wpos_side=array("","","","","","","","","","","","","");	
	        for ( $ln = 0; $ln <= $line-1; ++$ln )
	        {
	            $s1 = $map[$lin[$ln][0]];
	            $s2 = $map[$lin[$ln][1]];
	            $s3 = $map[$lin[$ln][2]];
	            $s4 = $map[$lin[$ln][3]];
	            $s5 = $map[$lin[$ln][4]];
				$gg = 1;
			

if ($s1 == 13 && $s2 == 13 ){
					   $map_win[$ln] = $psym[13][2];
}


if ($s1 == 13 && $s2 == 13 && $s3 == 13){
					   $map_win[$ln] = $psym[13][3];
}

if ($s1 == 13 && $s2 == 13 && $s3 == 13 && $s4 == 13){
					   $map_win[$ln] = $psym[13][4];
}
if ($s1 == 13 && $s2 == 13 && $s3 == 13 && $s4 == 13 && $s5 == 13){
					   $map_win[$ln] = $psym[13][5];
}
	
	              if ($s1 == 13 && $s2 != 12 && $s2!=13)
				{
					$s1 = $s2;
					$gg = 2;
				}
				if ($s2 == 13 && $s1 != 12 && $s1!=13)
				{
					$s2 = $s1;
					$gg = 2;
				}
				if ( $s1 == 13 && $s2 == $s3 && $s2 != 12)
	            {
	                $s1 = $s2;
					$gg = 2;
	            }
	            if ( $s2 == 13 && $s1 == $s3 && $s1 != 12)
	            {
	                $s2 = $s3;
					$gg = 2;
	            }
	            if ( $s3 == 13 && $s1 == $s2 && $s1 != 12)
	            {
	                $s3 = $s2;
					$gg = 2;
	            }
	            if ( $s1 == 13 && $s2 == 13 && $s3 != 12)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
					$gg = 2;
	            }
	            if ( $s2 == 13 && $s3 == 13 && $s1 != 12)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
					$gg = 2;
	            }
	            if ( $s1 == 13 && $s3 == 13 && $s2 != 12)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
					$gg = 2;
	            }
	            if ( $s1 == 13 && $s2 == $s3 && $s3 == $s4 && $s2 != 12)
	            {
	                $s1 = $s2;
					$gg = 2;
	            }
	            if ( $s2 == 13 && $s1 == $s3 && $s3 == $s4 && $s1 != 12)
	            {
	                $s2 = $s3;
					$gg = 2;
	            }
	            if ( $s3 == 13 && $s1 == $s2 && $s2 == $s4 && $s1 != 12)
	            {
	                $s3 = $s2;
					$gg = 2;
	            }
	            if ( $s4 == 13 && $s1 == $s2 && $s2 == $s3 && $s1 != 12)
	            {
	                $s4 = $s2;
					$gg = 2;
	            }
	            if ( $s1 == 13 && $s2 == 13 && $s3 == $s4 && $s3 != 12)
	            {
	                $s1 = $s3;
	                $s2 = $s3;
					$gg = 2;
	            }
	            if ( $s1 == 13 && $s3 == 13 && $s2 == $s4 && $s2 != 12)
	            {
	                $s1 = $s2;
	                $s3 = $s2;
					$gg = 2;
	            }
	            if ( $s1 == 13 && $s4 == 13 && $s2 == $s3 && $s2 != 12)
	            {
	                $s1 = $s2;
	                $s4 = $s2;
					$gg = 2;
	            }
	            if ( $s2 == 13 && $s3 == 13 && $s1 == $s4 && $s1 != 12)
	            {
	                $s2 = $s1;
	                $s3 = $s1;
					$gg = 2;
	            }
	            if ( $s2 == 13 && $s4 == 13 && $s1 == $s3 && $s1 != 12)
	            {
	                $s2 = $s1;
	                $s4 = $s1;
					$gg = 2;
	            }
	            if ( $s3 == 13 && $s4 == 13 && $s1 == $s2 && $s1 != 12)
	            {
	                $s3 = $s1;
	                $s4 = $s1;
					$gg = 2;
	            }
				if ($s1 == 13 && $s2 == 13 && $s3 == 13 && $s4 != 12)
				{
					$s1 = $s4;
					$s2 = $s4;
					$s3 = $s4;
					$gg = 2;
				}
				if ($s1 == 13 && $s2 == 13 && $s3 == 13 && $s4 == 13 && $s5 != 12)
				{
					$s1 = $s5;
					$s2 = $s5;
					$s3 = $s5;
					$s4 = $s5;
					$gg = 2;
				}
				if ($s5 == 13 && $s4 == $s3 && $s3 == $s2 && $s2 == $s1 && $s4 != 12)
				{
					$s5 = $s2;
					$gg = 2;
				}
				
				
				if ($s1 == $s2 && $s1 != 12 && $s1 != 13){
					   $map_win[$ln] = ($map_win[$ln] < $psym[$s2][2]*$gg) ? $psym[$s2][2] * $gg : $map_win[$ln];
					     $wpos[$ln]=2;	
					$wpos_side[$ln]=1;
				}
	            if ( $s1 == $s2 && $s2 == $s3 && $s1 != 12 && $s1 != 13)
	            {
	                $map_win[$ln] = ($map_win[$ln] < $psym[$s2][3]*$gg) ? $psym[$s2][3] * $gg : $map_win[$ln];
					  $wpos[$ln]=3;	
					$wpos_side[$ln]=1;
	            }
	            if ( $s1 == $s2 && $s2 == $s3 && $s3 == $s4 && $s1 != 12 && $s1 != 13)
	            {
	                $map_win[$ln] = ($map_win[$ln] < $psym[$s2][4]*$gg) ? $psym[$s2][4] * $gg : $map_win[$ln];
					  $wpos[$ln]=4;	
					$wpos_side[$ln]=1;
	            }
	            if ( $s1 == $s2 && $s2 == $s3 && $s3 == $s4 && $s4 == $s5 && $s1 != 12 && $s1 != 13)
	            {
	              $map_win[$ln] = ($map_win[$ln] < $psym[$s2][5]*$gg) ? $psym[$s2][5] * $gg : $map_win[$ln];
				    $wpos[$ln]=5;	
					$wpos_side[$ln]=1;
	            }
				if ( $s1 == $s2 && $s2 == $s3 && $s3 == $s4 && $s4 == $s5 && $s1 == 13)
	            {
	                $map_win[$ln] = $psym[$s2][5];
					  $wpos[$ln]=5;	
					$wpos_side[$ln]=1;
	            }
	        }
			
	          $winArr=array();
	        for ( $k = 1; $k <= 15; ++$k )
	        {
	            ${ "sym".$k } = $map[$k - 1];
	        }

	        for ( $k = 1; $k <= 9; ++$k )
	        {
	            ${ "win".$k } = $bet * $map_win[$k - 1];
				
				if(${ "win".$k }>0){
				$tmp_str=($k-1)."_".(${ "win".$k }*3)."_".$wpos[$k-1]."_".$wpos_side[$k-1];	
				array_push($winArr,$tmp_str);	
				}
				
	        }
			
	        if ( $line == 1 )
	        {
	            $win2 = 0;
	            $win3 = 0;
	            $win4 = 0;
	            $win5 = 0;
	            $win6 = 0;
	            $win7 = 0;
	            $win8 = 0;
	            $win9 = 0;
	        }
	        if ( $line == 2 )
	        {
	            $win3 = 0;
	            $win4 = 0;
	            $win5 = 0;
	            $win6 = 0;
	            $win7 = 0;
	            $win8 = 0;
	            $win9 = 0;
	        }
	        if ( $line == 3 )
	        {
	            $win4 = 0;
	            $win5 = 0;
	            $win6 = 0;
	            $win7 = 0;
	            $win8 = 0;
	            $win9 = 0;
	        }
	        if ( $line == 4 )
	        {
	            $win5 = 0;
	            $win6 = 0;
	            $win7 = 0;
	            $win8 = 0;
	            $win9 = 0;
	        }
	        if ( $line == 5 )
	        {
	            $win6 = 0;
	            $win7 = 0;
	            $win8 = 0;
	            $win9 = 0;
	        }
	        if ( $line == 6 )
	        {
	            $win7 = 0;
	            $win8 = 0;
	            $win9 = 0;
	        }
	        if ( $line == 7 )
	        {
	            $win8 = 0;
	            $win9 = 0;
	        }
	        if ( $line == 8 )
	        {
	            $win9 = 0;
	        }
			
	        $winall = ($win1 + $win2 + $win3 + $win4 + $win5 + $win6 + $win7 + $win8 + $win9 + $win10) * 3;
	        ++$am;
			
			if ( $mas_win == 1 && $winall == 0 )
	        {
	            $am = 10;
	        }
			if ( $mas_win == 1 && 0 < $winall )
	        {
	            $am = 120000;
	        }
	        if ( $mas_win == 0 && $winall == 0 )
	        {
	            $am = 120000;
	        }
			if ( $rnd_bonus == 1 && $win10>0 )
	        {
	            $am = 120000;
	        }
			 if ( ($maxwin< $winall  || $minwin>$winall) && $mas_win == 1)
	        {
	            $am = 10;
	        }
	        if ( $casbank < $winall )
	        {
	            $am = 10;
	        }
			 
			if ( $rnd_bonus != 1 && $scatterCnt>=3)
	        {
	            $am = 10;
				
	        }
			
		
		    /////////////////////////////////////////
			if($am >= 120000){
            $casbank_full=winlimit("bonus");
            if($casbank_full<$casbank){$casbank=$casbank_full;}
	
	        if($casbank<$winall){
	        $am=10;
	        }
	
            }
			////////////////////////////////////////	
			
			
			
	if($lc>=800){
	$mas_win=0;
        $rnd_bonus=0;
        
	}
	$lc++;
	////////////////////////////////////////////////////
	if($am>=120000 && $winall>0){
	
	
	        $bank_result=change_bank($user_id,'moneygame',$winall*-1,"bonus");
			
			
			if($bank_result===false || $bank_result<0){
			
			$mas_win=0;
        $rnd_bonus=0;
        $pr30_shans=0;
		$am=10;
			}
	
	}
	//////////////////////////////////////////////////
	    }
		
		$winall44 = sprintf( "%01.2f", $winall );
		if ($winall > 0)
		{
			cange_balance($userId, $winall44);
	
	$_SESSION['microbank']-=$winall44;
			$_SESSION['moneygame_win'] = $_SESSION['moneygame_win'] + $winall;
			$_SESSION['moneygame_CurBWin']+=$winall44;
		}
		$winall = $_SESSION['moneygame_win'];
		
	if($rnd_bonus==1){
		$_SESSION['moneygame_FullBWin']+=$_SESSION['moneygame_FullBWin'];
		}
		 for ( $k = 1; $k <= 10; ++$k )
	        {
	            ${ "win".$k } = ${ "win".$k }*3;
	        }
		$wl=implode(":",$winArr);
		$winString="$win1|$win2|$win3|$win4|$win5|$win6|$win7|$win8|$win9|$win10";
		ge_serv_show_str( "result=ok&wl=$wl&scatter_win=$win10&winString=$winString&info=|$sym1|$sym2|$sym3|$sym4|$sym5|$sym6|$sym7|$sym8|$sym9|$sym10|$sym11|$sym12|$sym13|$sym14|$sym15|". 
    "$bet|$line|$allbet|$winall|0|$allbet|$winall|0|1|0&id=$user_array[login]&balance=$user_balance");

			set_stat_game($userId, $user_balance, $allbet,$winall44,$stat_txt);
		$_SESSION['moneygame_freeGameCount'] -= 1;
			if ($_SESSION['moneygame_freeGameCount'] == 0){
			unset($_SESSION['moneygame_freeGameCount']);
		    unset($_SESSION['moneygame_FullBWin']);
	        unset($_SESSION['moneygame_CurBWin']);
       
		}	
	}
	
	/*   Конец игры  */
	if ($action == "finish")
	{
		/*$stat_txt = "moneygame_finish";
        $winall = $_SESSION['moneygame_win'];
		$casbank = winlimit();
		if ($winall > $casbank)
			$winall = $casbank;
		$winall44 = sprintf( "%01.2f", $winall );
        mysql_query( "update users set cash=cash+$winall44 where id=$userId" );
        mysql_query( "update game_settings set g_bank=g_bank-$winall44 where g_name='moneygame'" );*/

		$user_balance = floor( get_balance($userId) );
		//mysql_query( "INSERT INTO stat_game VALUES(NULL,NULL,$userId,'$user_balance','$allbet','$winall44','$stat_txt')" );
		unset($_SESSION['moneygame_win'], $_SESSION['moneygame_d']);

		ge_serv_show_str( "result=ok&state=0&min=1&id=$user_array[login]&balance=$user_balance");
	}
	
	/*   Риск-игра  */
	if ( $action == "double" )
	{
		if (!isset($_SESSION['moneygame_win']))
		{
			ge_serv_show_str( 'error|Ошибка! Попытка повлиять на игру. Ваш аккаунт блокирован');
			block_user($userId);
		}
		else
		{
		    $d = isset($_SESSION['moneygame_d']) ? $_SESSION['moneygame_d'] + 1 : 1;
			$_SESSION['moneygame_d'] = $d;
			$winall = $_SESSION['moneygame_win'];
			$betBegin = $winall; cange_balance($userId, $winall*-1);
			
			$bet = isset($_POST['bet']) ? $_POST['bet'] : 0;
			$winall44 = sprintf( "%01.2f", $winall );
		 
		$double_bank_sum=$winall; 
		 
		$_SESSION['microbank']+=$winall44;

			$row_bon=get_game_settings('moneygame');
			$g_shansdouble=$row_bon['g_rezerv'];
			$shans = rand( 1, $g_shansdouble );
			if ( $shans == 1 )
				$winall2 = $winall * 2;
				
			$casbank = winlimit("double");
			
		    if ( $casbank < $winall2 || $shans != 1 || $d > 5 )
		    {
				$winall2 = 0;
				
			}

			if ( $winall2 > 0 )
			{
				if ( $bet == 0 )
					$deler = rand(2,3);
				if ( $bet == 1 )
					$deler = rand(0,1);
			}

			if ( $winall2 == 0 )
			{
				if ( $bet == 0 )
					$deler = rand(0,1);
				if ( $bet == 1 )
					$deler = rand(2,3);
			}

			$stat_txt = "moneygame_double";
			$winall44 = sprintf( "%01.2f", $winall2 );

			ge_serv_show_str( "result=ok&info=$deler&id=$user_array[login]&balance=$user_balance");
			//mysql_query( "INSERT INTO stat_game VALUES(NULL,NULL,$userId,'$user_balance','$betBegin','$winall44','$stat_txt')" );
			   	set_stat_game($userId, $user_balance, $betBegin,$winall44,$stat_txt);
			if ($winall2 > 0)
			{
			
			$double_bank_sum-=$winall2; 
			
				cange_balance($userId, $winall44);
			   
			$_SESSION['microbank']-=$winall44;
				$_SESSION['moneygame_win'] = $winall2;
			}
			
			if($double_bank_sum!=0){
			change_bank($user_id,'moneygame',$double_bank_sum,"double");
			}
			
			
		}
	}
?>

