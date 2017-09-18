<?
require("connect.php");
include("myDB.php");
include_once('_header.php');
include_once('sidebar.php');

?>
<style>
.keyInChk{
  transform:scale(1.4);
}
</style>
<script type="text/javascript">
	function orderSelect(){
		var brand  = document.getElementById('s_brand').value
		var group  = document.getElementById('s_group').value
		var type  = document.getElementById('s_type').value
		//-------check function ------------'
			if(brand !='') {var brand = '&brand='+ brand}
			if(group !='') {var group = '&group='+ group}
			if(type !='') {var type = '&type='+ type}
		window.location="index.php?" + brand + group + type;
		}
</script>


      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
      
        <!-- Content Header (Page xheader) -->
        <section class="content-header">
          <h1>
            Checking Warranty
          </h1>
        </section>

        <!-- Main content -->
        <section class="content">
          <div class="row">
              <div class="col-lg-10">
                  <div class="box box-primary">
                      <div class="box-body">
                      <form name="checkwarranty" method="GET" action="checking_warranty.php">
                      <label>S/N Tracking</label>
                        <div class="input-group">
                          <input type="text" name="trackno" id="trackno" class="form-control" onkeydown="uppercase(this)"  style="text-transform: uppercase" required="required">
                          <span class="input-group-btn">
                          <button class="btn btn-success" type="submit">Go!</button>
                          </span>
                      </form>
                        </div><!-- /input-group -->
                        <br />
                       <? if($_GET["trackno"]){ ?>
                       IF EXIST<br />
                       <font color="Green"><?=$_GET["trackno"]?></font><br />
                        Start Date: ../../..<br />
                        Entry Date: ../../..<br />
                        Warranty : x....
                                                IF Still <br />
                        	Description หมดประกัน / เหลือประกัน (Start - Entry)<br />
                            
					   <? }else {?>
                        ไม่พบรายการสินค้า S/N ดังกล่าว<br />
                        <a href="#">กลับสู่รายการค้นหาอีกครั้ง</a>
					   <? }?>
                    </div>
                </div>
              </div><!-- /.col-lg-10 -->
       	 </div><!-- /.row -->
          
        </section><!-- /.content -->
      </div><!-- /.content-wrapper -->

    </div><!-- ./wrapper -->
<button onclick="orderselect()">Try it</button>

<? include_once('_js.php');?>
<script>
	function uppercase(a){
    setTimeout(function(){
        a.value = a.value.toUpperCase();
    }, 0);
}
</script>


  </body>
</html>


