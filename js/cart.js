var cartWrapper,cartWrapper,cdProductId,cartBody,cartList,cartTotal,cartTrigger,cartCount,addToCartBtn,undo,undoTimeoutId;
//var usrCat=4;
/*
var cartItem=new Array();
cartItem.push([1,4]);
cartItem.push([3,2]);
*/
$(function(){
  $(window).on("blur focus", function(e) {
    var prevType = $(this).data("prevType");

    if (prevType != e.type) {   //  reduce double fire issues
        switch (e.type) {
            case "blur":
                // do work
                updateCartCookie();
                break;
            case "focus":
                // do work
                initCart();
                break;
        }
    }

    $(this).data("prevType", e.type);
})
	 cartWrapper = $('.cd-cart-container');
	 cdProductId = 0;
   cartBody = cartWrapper.find('.body');
   cartList = cartBody.find('ul').eq(0);
   cartTotal = cartWrapper.find('.checkout').find('span');
   cartTrigger = cartWrapper.children('.cd-cart-trigger');
   cartCount = cartTrigger.children('.count')
   addToCartBtn = $('.cd-add-to-cart');
   undo = cartWrapper.find('.undo');
   undoTimeoutId;
    
		//open/close cart
		cartTrigger.on('click', function(event){
			event.preventDefault();
			toggleCart();
		});

		//close cart when clicking on the .cd-cart-container::before (bg layer)
		cartWrapper.on('click', function(event){
			if( $(event.target).is($(this)) ) toggleCart(true);
		});

		//delete an item from the cart
		cartList.on('click', '.delete-item', function(event){
			event.preventDefault();
			removeProduct($(event.target).parents('.product'));
		});

		//update item quantity
		cartList.on('change', 'select', function(event){
			quickUpdateCart();
		});

		//reinsert item deleted from the cart
		undo.on('click', 'a', function(event){
			clearInterval(undoTimeoutId);
			event.preventDefault();
			cartList.find('.deleted').addClass('undo-deleted').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
				$(this).off('webkitAnimationEnd oanimationend msAnimationEnd animationend').removeClass('deleted undo-deleted').removeAttr('style');
				quickUpdateCart();
			});
			undo.removeClass('visible');
		});
    initCart();
    try{
      afterCartCallBack();
    }catch(e){}
});
  function updateCartCookie(){
    var pId,val;
    cartItem=new Object();
    cartList.children('li:not(.deleted)').each(function(){
      val=$(this).find('input').val()*1;
      pId=$(this).find('input').attr('id').replace('cdProduct','')*1;
      console.log('updateCartCookie ',pId,val);
      val=Math.min(val,prodAmount[pId]);
      cartItem[pId]=val;
      if(cartItem[pId]==0)delete cartItem[pId];
    });
    Cookies.set('cart',JSON.stringify(cartItem));
    try{genCheckoutTbl()}catch(e){}
  }
  function initCart(){
    var i,tmp,totalItem=0,totalCost=0;
    cartWrapper.addClass('empty');
    cartList.children().remove();
    cartItem=new Object();
    tmp=Cookies.get('cart');
    if(tmp!=undefined){
      cartItem=JSON.parse(tmp);
      for(i in cartItem){
        cartItem[i]=Math.min(cartItem[i],prodAmount[i]);
        if(cartItem[i]==0){
          delete cartItem[i];
        }else{
          addProduct(i,cartItem[i]);
          totalItem+=cartItem[i];
          totalCost+=cartItem[i]*prods[i].price[usrCat];
          cartWrapper.removeClass('empty');
        }
      }
      //cartCount.find('li').eq(0).text(totalItem);
      //cartCount.find('li').eq(1).text(totalItem+1);
      updateCartCount2();
      cartTotal.html(totalCost.toLocaleString());
    }
    try{genCheckoutTbl()}catch(e){}
  }
	function addToCart(pId) {
    var curr=0;
    var canAdd=false;
    var cartIsEmpty = cartWrapper.hasClass('empty');
		//update cart product list
    if(!cartItem)cartItem=new Object();
    if(cartItem[pId]!=undefined){
      curr=cartItem[pId];
      cartItem[pId]++;
    }else{
      cartItem[pId]=1;
    }
    cartItem[pId]=Math.min(cartItem[pId],prodAmount[pId]);
    console.log(curr,cartItem[pId]);
    if(cartItem[pId]!=curr){
      if($('#cdProduct'+pId).length==0){
        addProduct(pId,1);
      }else{
        console.log('here');
        var nextVal=$('#cdProduct'+pId).val()*1+1;
        nextVal=Math.min(nextVal,prodAmount[pId]);
        if($('#cdProduct'+pId+' option[value="'+nextVal+'"]').length==0){
          $('#cdProduct'+pId).append('<option value="'+nextVal+'">'+nextVal+'</option>');
        }
        $('#cdProduct'+pId).val(nextVal);
      }
      //update number of items 
      ////updateCartCount(cartIsEmpty);
      updateCartCount2();
      //update total price
      updateCartTotal();
      //show cart
      cartWrapper.removeClass('empty');
    }
    if(cartItem[pId]==0){delete cartItem[pId];}
    Cookies.set('cart',JSON.stringify(cartItem));
	}
	function addProduct(pId,amount) {
		//this is just a product placeholder
		//you should insert an item with the selected product info
		//replace productId, productName, price and url with your real product info
    var i;
		var productAdded = '<li class="product"><div class="product-image"><a href="'+prods[pId].url+'"><img src="'+prods[pId].img+'" alt="placeholder"></a></div><div class="product-details"><h3><a href="'+prods[pId].url+'">'+prods[pId].title+'</a></h3><span class="price">'+(prods[pId].price[usrCat]*1).toLocaleString()+' ฿</span><div class="actions"><a href="'+prods[pId].url+'" class="delete-item">ลบ</a><div class="quantity"><button class="minus" onclick="minusProd('+pId+')">-</button><input type="text" id="cdProduct'+ pId +'" value="'+ amount +'" onKeyUp="prodValChange('+pId+')" onChange="prodValChangeFinal('+pId+')"/><button class="plus" onclick="plusProd('+pId+')">+</button></div></div></div></li>';
    productAdded=$(productAdded);
		cartList.prepend(productAdded);
    $('#cdProduct'+pId).keypress(function (e) {
      var regex = new RegExp("^[0-9]+$");
      var charCode=!e.charCode ? e.which : e.charCode;
      var str = String.fromCharCode(charCode);
      if (regex.test(str)) {
          return true;
      }
      if (e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 46
       || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 116 || charCode == 118) {
          return true;
      }
      e.preventDefault();
      return false;
    });
	}
  function prodValChange2(pId){
    console.log('prodValChange ');
    if($('#cd2Product'+pId).val()*1>0){
      prodValChangeFinal2(pId);
    }
  }
  function prodValChangeFinal2(pId){
    cartItem[pId]=Math.min($('#cd2Product'+pId).val()*1,prodAmount[pId]);
    $('#cdProduct'+pId).val(cartItem[pId]);
    updateCartCount2();
    updateCartTotal();
    updateCartCookie();
  }
  function prodValChange(pId){
    console.log('prodValChange ');
    if($('#cdProduct'+pId).val()*1>0){
      prodValChangeFinal(pId);
    }
  }
  function prodValChangeFinal(pId){
    cartItem[pId]=Math.min($('#cdProduct'+pId).val()*1,prodAmount[pId]);
    $('#cdProduct'+pId).val(cartItem[pId]);
    updateCartCount2();
    updateCartTotal();
    updateCartCookie();
  }
  function plusProd(pId){
    console.log('plusProd ');
    cartItem[pId]=Math.min(cartItem[pId]+1,prodAmount[pId]);
    $('#cdProduct'+pId).val(cartItem[pId]);
    updateCartCount2();
    updateCartTotal();
    updateCartCookie();
  }
  function minusProd(pId){
    console.log('minusProd');
    cartItem[pId]=Math.min(cartItem[pId]-1,prodAmount[pId]);
    if(cartItem[pId]<=0||isNaN(cartItem[pId])){
      delete cartItem[pId];
      $('#cdProduct'+pId).closest('.product').remove();
    }
    $('#cdProduct'+pId).val(cartItem[pId]);
    updateCartCount2();
    updateCartTotal();
    updateCartCookie();
  }
	function toggleCart(bool) {
		var cartIsOpen = ( typeof bool === 'undefined' ) ? cartWrapper.hasClass('cart-open') : bool;
		
		if( cartIsOpen ) {
			cartWrapper.removeClass('cart-open');
			//reset undo
			clearInterval(undoTimeoutId);
			undo.removeClass('visible');
			cartList.find('.deleted').remove();

			setTimeout(function(){
				cartBody.scrollTop(0);
				//check if cart empty to hide it
				if( Number(cartCount.find('li').eq(0).text()) == 0) cartWrapper.addClass('empty');
			}, 500);
		} else {
			cartWrapper.addClass('cart-open');
		}
	}
	function updateCartCount2() {
    var emptyCart=cartWrapper.hasClass('empty');
    var actual=0;
    var has2ani=false;
    var curr=Number(cartCount.find('li').eq(0).text())*1;
    for(var i in cartItem){
      actual+=cartItem[i];
    }
    console.log('updateCartCount2',emptyCart,actual,curr);
    var next=actual+1;
    
    if( emptyCart ) {
      has2ani=true;
      cartCount.find('li').eq(0).text(0);
      cartCount.find('li').eq(1).text(actual);
    } 
    if(actual!=curr) {
      has2ani=true;
      cartCount.find('li').eq(1).text(actual);
    }
    if(has2ani){
      cartCount.addClass('update-count');
      setTimeout(function() {
        cartCount.find('li').eq(0).text(actual);
      }, 150);

      setTimeout(function() {
        cartCount.removeClass('update-count');
      }, 200);

      setTimeout(function() {
      cartCount.find('li').eq(0).text(actual);
      cartCount.find('li').eq(1).text(actual);
      }, 230);
    }
    $('.cd-cart-trigger .count').removeClass('twoDigit');
    $('.cd-cart-trigger .count').removeClass('threeDigit');
    if(actual>=100){
    $('.cd-cart-trigger .count').addClass('threeDigit');
    }else if(actual>=10){
    $('.cd-cart-trigger .count').addClass('twoDigit');
    }
	}
	function updateCartCount(emptyCart, quantity) {
    return;
		if( typeof quantity === 'undefined' ) {
			var actual = Number(cartCount.find('li').eq(0).text()) + 1;
			var next = actual + 1;
			
			if( emptyCart ) {
				cartCount.find('li').eq(0).text(actual);
				cartCount.find('li').eq(1).text(next);
			} else {
				cartCount.addClass('update-count');

				setTimeout(function() {
					cartCount.find('li').eq(0).text(actual);
				}, 150);

				setTimeout(function() {
					cartCount.removeClass('update-count');
				}, 200);

				setTimeout(function() {
					cartCount.find('li').eq(1).text(next);
				}, 230);
			}
		} else {
			var actual = Number(cartCount.find('li').eq(0).text()) + quantity;
			var next = actual + 1;
			
			cartCount.find('li').eq(0).text(actual);
			cartCount.find('li').eq(1).text(next);
		}
	}
	function updateCartTotal() {
    var total=0;
    for(var i in cartItem){
      total+=cartItem[i]*prods[i].price[usrCat];
    }
    cartTotal.text(total.toLocaleString());
    if(total==0&&cartList.find('.deleted').length==0){
      $('.cd-cart-container').removeClass('cart-open').addClass('empty');
    }
	}

	function removeProduct(product) {
    var pId=$(product).find('input').attr('id').replace('cdProduct','')*1;
		clearInterval(undoTimeoutId);
		cartList.find('.deleted').remove();
		
		var topPosition = product.offset().top - cartBody.children('ul').offset().top ,
			productQuantity = cartItem[pId],
			productTotPrice = Number(product.find('.price').text().replace(' ฿', '').replace(',', '')) * productQuantity;
		
		product.css('top', topPosition+'px').addClass('deleted');

    delete cartItem[pId];
		//update items count + total price
    console.log('cartotal',productTotPrice);
		updateCartTotal();
		////updateCartCount(true, -productQuantity);
    updateCartCount2();
		undo.addClass('visible');

		//wait 8sec before completely remove the item
		undoTimeoutId = setTimeout(function(){
			undo.removeClass('visible');
			cartList.find('.deleted').remove();
		}, 8000);
    updateCartCookie();
	}

	function quickUpdateCart() {
		var quantity = 0;
		var price = 0;
		cartList.children('li:not(.deleted)').each(function(){
			var singleQuantity = Number($(this).find('input').val());
      var nextVal=singleQuantity+1;
      var pId=$(this).find('input').attr('id').replace('cdProduct','')*1;
      nextVal=Math.min(nextVal,prodAmount[pId]);
      if($(this).find('select option[value="'+nextVal+'"]').length==0){
        $(this).find('input').append('<option value="'+nextVal+'">'+nextVal+'</option>');
      }
			quantity = quantity + singleQuantity;
			price = price + singleQuantity*Number($(this).find('.price').text().replace(' ฿', '').replace(',', ''));
		});

		cartTotal.text(price.toLocaleString());
    updateCartTotal();
    /*
		cartCount.find('li').eq(0).text(quantity);
		cartCount.find('li').eq(1).text(quantity+1);
    */
    updateCartCount2();
    updateCartCookie();
	}

  /*
jQuery(document).ready(function($){
	var cartWrapper = $('.cd-cart-container');
	//product id - you don't need a counter in your real project but you can use your real product id
	var cdProductId = 0;

	if( cartWrapper.length > 0 ) {
		//store jQuery objects
		var cartBody = cartWrapper.find('.body')
		var cartList = cartBody.find('ul').eq(0);
		var cartTotal = cartWrapper.find('.checkout').find('span');
		var cartTrigger = cartWrapper.children('.cd-cart-trigger');
		var cartCount = cartTrigger.children('.count')
		var addToCartBtn = $('.cd-add-to-cart');
		var undo = cartWrapper.find('.undo');
		var undoTimeoutId;
    
		//add product to cart
		addToCartBtn.on('click', function(event){
			event.preventDefault();
			addToCart($(this).attr('pId'));
		});
	}



});
  */