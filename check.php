<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link rel="shortcut icon" href="image/icon.ico" type="image/x-icon">
<link rel="icon" href="images/itsuppp.ico" type="image/x-icon">
</head>

<body>
<?
$servername = 'server-navision';
$databasename = 'SGD_PROD';
$user = 'sa'; 
$pass = 'avision'; 
$connection_string = "DRIVER={SQL Server};SERVER=$servername;DATABASE=$databasename;AutoTranslate=no"; 
$Conn = odbc_connect($connection_string,$user, $pass);
date_default_timezone_set("Asia/Bangkok");		
			if($_GET["trackno"] !=""){
			$che="$";
			$sql="SELECT [SGD Inter Trading Co_,Ltd". $che . "Service Item].[Warranty Starting Date (Labor)] AS warranty_start,
				[SGD Inter Trading Co_,Ltd". $che . "Service Item].[Warranty Ending Date (Labor)] AS warranty_finish,
				[SGD Inter Trading Co_,Ltd". $che . "Service Item].[Service Item Group Code] AS warranty,
				[SGD Inter Trading Co_,Ltd". $che . "Service Item].[Item No_] AS items,
				[SGD Inter Trading Co_,Ltd". $che . "Service Item].Description AS description,
				[SGD Inter Trading Co_,Ltd". $che . "Service Item].[Serial No_] AS sn
				FROM [SGD Inter Trading Co_,Ltd". $che . "Service Item]
				WHERE ((([SGD Inter Trading Co_,Ltd". $che . "Service Item].[Serial No_])='".$_GET["trackno"]."'));";
			
			$rs = odbc_exec($Conn,$sql);
			}
?>
</body>
</html>
