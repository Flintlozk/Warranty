<?
$host="kenprocctv.com"; //ชื่อโฮส
$db_username="register"; //ชื่อผู้ใช้
$db_password="Sgd@1234"; //รหัสผ่าน
$dbname="reg"; //ชื่อฐานข้อมูล
$connect = mysql_connect($host,$db_username,$db_password);
mysql_query("SET NAMES UTF8");
date_default_timezone_set("Asia/Bangkok");
if(!$connect){
echo "ไม่สามารถติดต่อฐานข้อมูลได้"; exit();
}
?>
