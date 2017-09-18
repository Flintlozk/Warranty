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
<div class="container">
    <div class="row">
  <div class="col-md-6">        
    </div>
      <div class="col-md-12">     
<? 
date_default_timezone_set("Asia/Bangkok");
if ($check=1) {?>


<div style="background:#DEECFA; border-radius:0.25em; border:1px solid #000">
  <div style=" background-color:rgb(9, 114, 159); padding:10px 10px 10px 10px; font-size:16px; font-weight:bold; color:#FFF;"><span class="glyphicon glyphicon-ok"></span> Checking Warranty</div>
  <div style="padding:10px 0px 10px 0px;">
	<div style=" margin:10px 20px 10px 20px">
     <form name="checkwarranty" method="GET" action="index.php">
       <label>S/N Tracking</label>
         <div class="input-group">
          <input type="text" name="trackno" id="trackno" class="form-control" onkeydown="uppercase(this)"  style="text-transform: uppercase" required="required">
           <span class="input-group-btn"><button class="btn btn-info" type="submit">Go!</button></span>
         </div><!-- /input-group -->
            XVR504A1608250010 อยู่ในประกัน<br />
            AHD916V2160108021 หมดประกัน
         </form>
         <div>asdsasad
        
         	<?
            function dateDifference($currentdate , $end , $differenceFormat = '%d' ,$timeZone = 'GMT')
						{
							$datetime1 = date_create($currentdate);
							$datetime2 = date_create($end);
							$interval = date_diff($datetime1, $datetime2);
							return $interval->format($differenceFormat);
						}
						$datediff = dateDifference($currentdate , $w_end , $differenceFormat = '%d',$timeZone = 'GMT' );
			
				$start = Date('04-01-2560 00:00:00');
				$end = Date('19-07-2560 13:09:35');

				

				function DateThai($strDate) //แปลง Date/Time = Thai Date/Time
					{
						$strYear = date("Y",strtotime($strDate))+543;
						$strMonth= date("m",strtotime($strDate));
						$strDay= date("d",strtotime($strDate));
						$strHour= date("H",strtotime($strDate));
						$strMinute= date("i",strtotime($strDate));
						$strSeconds= date("s",strtotime($strDate));
						
						return "$strDay-$strMonth-$strYear $strHour:$strMinute:$strSeconds";
					}
				$strDate = date("Y-m-d"); //เวลาปัจจุบัน อิงจากเวลา Server	
				$currentdate = DateThai($strDate);
				
				echo $start,"<br>";
				echo $end,"<br>";
				echo $currentdate,"<br><br>";
				
				
					 	
			echo dateDifference($currentdate , $end , $differenceFormat = '%a' );
			
			
			/*if($w_end <= $currentdate){
					echo "<b>Warranty Start : </b>" . $w_start . "<br>" ;
					echo "<b>Warranty Finish : </b>" .  $w_end . " <font color='red'> หมดประกัน </font><br>" ;
					echo "<b>Warranty : </b>" .  $warranty . "<br>" ;
					echo "<b>Items : </b>" . $items . "<br>" ;
					echo "<b>Descriprion : </b>" .  $description . " <br>" ;
					echo "<b>S/N : </b>" .  $sn . "<br><br>" ;
					 } else {
					 	function dateDifference($currentdate , $w_end , $differenceFormat = '%a' )
							{
								$datetime1 = date_create($currentdate);
								$datetime2 = date_create($w_end);
								$interval = date_diff($datetime1, $datetime2);
								return $interval->format($differenceFormat);
							}
						$datediff = dateDifference($currentdate , $w_end , $differenceFormat = '%a' );
						
						echo "<b>Warranty Start : </b>" . $w_start . "<br>" ;
						echo "<b>Warranty Finish : </b>" .  $w_end . "<font color='green'> คงเหลือ ". $datediff ." วัน</font><br>" ;
						echo "<b>Warranty : </b>" .  $warranty . "<br>" ;
						echo "<b>Items : </b>" . $items . "<br>" ;
						echo "<b>Descriprion : </b>" .  $description . " <br>" ;
						echo "<b>S/N : </b>" .  $sn . "<br><br>" ;
					}*/
            ?>
         </div>
		</div><!--margin -->
</div> <!-- padding -->
<? }?>
</div><!-- end row -->
</div> <!-- container-->



<script src="js/jquery.js"></script>
<script src="js/bootstrap.js"></script>

<script src="js/owl.js"></script>
<script src="js/wow.js"></script>
<script src="js/custom.js"></script>



<script src="js/responsiveslides.js"></script>

<script>
function intervaltime(){
	var startdate = new Date();
	var enddate = new Date();
	var interval = (enddate - startdate);
}
</script>
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

