<? session_start();
		  $_SESSION['id_no'] = "";
		  $_SESSION['sn'] = "";
		  error_reporting( error_reporting() & ~E_NOTICE );
		  require("check.php");	  
?>
<html>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/style.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/responsiveslides.css">
<link href="css/sp-main.css" media="all" rel="stylesheet" type="text/css">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Checking Warranty</title>

<style type="text/css">
body {
	background-color: #222a32;
}
</style>
<br />
<body>
<div class="container">
    <div class="row">
      <div class="col-md-12">     
        <div style="background:#DEECFA; border-radius:0.25em; border:1px solid #000">
          <div style=" background-color:rgb(9, 114, 159); padding:10px 10px 10px 10px; font-size:16px; font-weight:bold; color:#FFF;">
                <span class="glyphicon glyphicon-ok"></span> Checking Warranty
            </div>
            <div class="box box-primary">
                <div class="box-body">
                 <form name="checkwarranty" method="GET" action="index.php">
                   <label>S/N Tracking</label>
                     <div class="input-group">
                      <input type="text" name="trackno" id="trackno" class="form-control" 
                      onkeydown="uppercase(this)" onfocus="cleartext()" required style="text-transform: uppercase" 
                      value="<? if($_GET["trackno"]){ echo $_GET["trackno"];}?>">
                       <span class="input-group-btn">
                            <button class="btn btn-info" type="submit">Go!</button>
                       </span>
                     </div><!-- /input-group -->
                    </form>
                        
        <form>
         	<?
				function DateThai($strDate) //แปลง Date/Time = Thai Date/Time
					{
						$strYear = date("Y",strtotime($strDate))+543;
						$strMonth= date("m",strtotime($strDate));
						$strDay= date("d",strtotime($strDate));
						$strHour= date("H",strtotime($strDate));
						$strMinute= date("i",strtotime($strDate));
						$strSeconds= date("s",strtotime($strDate));
						return "$strDay-$strMonth-$strYear";
					}
				$strDate = date("Y-m-d");
				$currentdate = DateThai($strDate);
				$today = date("Y-m-d H:i:s");		

			if($rs){
				while(odbc_fetch_row($rs)){
					$warranty_start =  odbc_result($rs,"warranty_start"); 
					$warranty_finish =  odbc_result($rs,"warranty_finish"); 
					$w_start = DateThai($warranty_start);
					$w_end = DateThai($warranty_finish);
					
					$warranty =  odbc_result($rs,"warranty");
					$items =  odbc_result($rs,"items");
					$description =  odbc_result($rs,"description");
					$sn =  odbc_result($rs,"sn");
					
						echo "<br><b>Warranty Start : </b>" . $w_start . "<br>" ;
						echo "<b>Warranty Finish : </b>" .  $w_end;
							if($today < $warranty_finish){	
								function dateDifference($currentdate , $w_end , $differenceFormat = '%a' )
								{
									$datetime1 = date_create($currentdate);
									$datetime2 = date_create($w_end);
									$interval = date_diff($datetime1, $datetime2);
									return $interval->format($differenceFormat);
								}
							$datediff = dateDifference($currentdate , $w_end , $differenceFormat = '%a' );		
						echo "<font color='green'> ระยะเวลาคงเหลือ ". $datediff ." วัน</font><br>";
							}else{
						echo "<font color='red'> หมดประกัน</font><br>";
							}
						echo "<b>Warranty : </b>" .  $warranty . "<br>" ;
						echo "<b>Items : </b>" . $items . "<br>" ;
						echo "<b>Descriprion : </b>" .  $description . " <br>" ;
						echo "<b>S/N : </b>" .  $sn . "<br>" ;

				}
			}
			?>
            <div align="center">
            <?
			if($_GET["trackno"] != "" && $sn == ""){
				echo "<br>ไม่พบรายการสินค้า S/N ดังกล่าว <br> ";
                echo "<a href='index.php'> (กลับสู่การค้นหาอีกครั้ง)</a>";
			}?>
        	</div>
         <?
		odbc_close($Conn);
		

?>
</form>
			</div>
		</div>
	</div>
</div>
	</div><!-- end row -->
</div> <!-- container-->



<script src="js/jquery.js"></script>
<script src="js/bootstrap.js"></script>

<script src="js/owl.js"></script>
<script src="js/wow.js"></script>
<script src="js/custom.js"></script>



<script src="js/responsiveslides.js"></script>

<script>
    // You can also use "$(window).load(function() {"
    $(function () {

      // Slideshow 4
      $("#slider4").responsiveSlides({
        auto: true,
        pager: false,
        nav: true,
        speed: 800,
		timeout: 8000, 
        namespace: "callbacks",
        before: function () {
          $('.events').append("<li>before event fired.</li>");
        },
        after: function () {
          $('.events').append("<li>after event fired.</li>");
        }
      });

    });
  </script>
  <script>
	function uppercase(a){
    setTimeout(function(){
        a.value = a.value.toUpperCase();
    }, 0);
}
</script>
<script>
  function cleartext()
   {  
   document.getElementById('trackno').value = "";
   }
</script>

</body>
</html>

