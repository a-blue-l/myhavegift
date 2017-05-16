$(function(){
	var islogin = true;
	// if( $('#teleone').text().length !== 11 ){
	// 	islogin = false;
	// 	alert('请登录聚能充App后再参加活动');
	// }else{
	// 	islogin = true;
	// }
	var isBegin = false;
	var u = 4.536;
	var gift_num,gift_falg = false;
	var gift_arr = ['2元充电优惠券','200元汽车保养代金券','30元礼品卡','汪正亲子摄影','服务礼包','198元车载礼包','智能地锁'];
	var gift_jump = ['.twoycoupon','.y200coupon','.jpycoupon','.soncoupon','.watercoupon','.carcoupon','.discoupon'];
	var gift_img = [
		'http://share.i-ev.com/Public/home/game/luckdraw/images/gifttwobg.png',
		'http://share.i-ev.com/Public/home/game/luckdraw/images/giftfivebg.png',
		'http://share.i-ev.com/Public/home/game/luckdraw/images/giftjpbg.png',
		'http://share.i-ev.com/Public/home/game/luckdraw/images/gift200bg.png',
		'http://share.i-ev.com/Public/home/game/luckdraw/images/gifttwobg.png'
	];
	var giftover_img = [
		'http://share.i-ev.com/Public/home/game/luckdraw/images/gifttwobgno.png',
		'http://share.i-ev.com/Public/home/game/luckdraw/images/giftfivebgno.png',
		'http://share.i-ev.com/Public/home/game/luckdraw/images/giftjpbgno.png',
		'http://share.i-ev.com/Public/home/game/luckdraw/images/gift200bgno.png',
		'http://share.i-ev.com/Public/home/game/luckdraw/images/gifttwobg.png'
	];
	var jpx = 0.75;
	var balancenum = 10000;
	var lighttime;
	var lightfalg = true;
	var name = '';
	var type;
	function probability(a,b,c,d,e,f,g){
		var random = Math.random();
		if( random < a ){
			return 0;
		} else if( random >= a && random < b ) {
			return 1;
		} else if( random >= b && random < c ) {
			return 2;
		} else if( random >= c && random < d ) {
			return 3;
		} else if( random >= d && random < e ) {
			return 4;
		}else if( random >= e && random < f ) {
			return 5;
		}else if( random >= f && random < g ) {
			return 6;
		}else{
			return 7;
		}
	}
	function numRand() {
		var num_1 = probability(0.5, 0.65, jpx, 0.95, 0.9, 0.89, 0.88);
		var num_2;
		var num_3;
		if( num_1 == 0 ){
			num_2 = num_3 = probability(0.5, 0.8, 0.9, 0.95, 0.98, 0.98, 0.98);
		}else if( num_1 == 1 ){
			num_2 = num_3 = probability(0.3, 0.5, 0.6, 0.9, 0.97, 0.98, 0.98);
		}else if( num_1 == 2 ){
			num_2 = num_3 = probability(0.1, 0.2, 0.45, 0.55, 0.5, 0.98, 0.98);
		}else if( num_1 == 3 ){
			num_2 = num_3 = probability(0.1, 0.2, 0.3, 0.6, 0.5, 0.98, 0.98);
		}else if( num_1 == 4 ){
			num_2 = num_3 = probability(0.1, 0.2, 0.3, 0.4, 0.39, 0.98, 0.98);
		}else if( num_1 == 5 ){
			num_2 = num_3 = probability(0.1, 0.2, 0.3, 0.4, 0.39, 0.98, 0.98);
		}else if( num_1 == 6 ){
			num_2 = num_3 = probability(0.1, 0.2, 0.3, 0.4, 0.39, 0.98, 0.98);
		}else{
			num_2 = num_3 = probability(0.1, 0.2, 0.3, 0.4, 0.39, 0.98, 0.98);
		}
		if(num_1 == num_2 && num_1 == num_3 && num_1 !== 6){
			gift_falg = true;
			gift_num = num_1;
			name = gift_arr[num_1];
			type = num_1 + 1;
		}else{
			gift_falg = false;
			type = '';
		}
		// $.post('http://share.i-ev.com/home/game/luckdraw',{"code":101},function(date){
		// 	if( date.status == 1 ){}
		// });
		return rand = [num_1,num_2,num_3];
	}
	//灯光闪烁
	function light(){
		lighttime = setInterval(function(){
			if(lightfalg){
				$('.flipdiv').removeClass('dark').addClass('light');
				lightfalg = false;
			}else{
				$('.flipdiv').removeClass('light').addClass('dark');
				lightfalg = true;
			}
		},600)
	}
	// 开始抽奖
	function start(){
		if( ( balancenum - 30 ) < 0 ){
			$('.somall,.maskbg').css({display:'block'});
			isBegin = false;
			return;
		}else{
			balancenum -= 30;
		}
		light();
		$('.balancenum').text(balancenum);
		
		var result = numRand();
		var num_arr = result;
		$(".flnum").css('backgroundPositionY','4.535rem');
		$(".flnum").each(function(index){
			var _num = $(this);
			setTimeout(function(){
				_num.animate({ 
					backgroundPositionY: (u*80) - (u*num_arr[index])+'rem'
				},{
					duration: 6000+index*3000,
					easing: "easeInOutCirc",
					complete: function(){
						if(index==2){
							// $('.ajax').show();
							clearInterval(lighttime);
							// $.post('http://share.i-ev.com/home/game/luckdraw',{"name":name,"type":type},function(date){
							// 	if( date.status == 1 ){
							// 		if( date.info == 3 ){
							// 			$('.jpnumber').text(date.jp.code_sn);
							// 			$('.jppassword').text(date.jp.code_pwd);
							// 		}
							// 	}
							// },'json')
							isBegin = false;
							$('.maskbg').css({display:'block'});
							if(gift_falg){
								$(gift_jump[gift_num]).css({display:'block'});
							}else{
								$('.nogift').css({display:'block'});
							}
						}
					}
				});
			}, index * 10);
		});
	}
	// 获取积分
	// (function(){
	// 	$.post('http://share.i-ev.com/home/game/luckdraw',{"code":1},function(date){
	// 		if( date.status == 1 ){
	// 			balancenum = date.info;
	// 			$('.balancenum').text(balancenum);
	// 		} else if( date.status == 2 ) {
	// 			jpx = 0.6;
	// 			balancenum = date.info;
	// 			$('.balancenum').text(balancenum);
	// 		}
	// 	},'json')
	// })()
	// 获取获奖记录
	function giftrecord(){
		$('.recordlist').empty();
		$('.ajax').show();
		$.post('http://share.i-ev.com/home/game/luckdraw',{"code":2},function(date){
			if( date.status == 1 ){
				for( var i = 0; i < date.info.length; i ++ ){
					var img_this;
					if( date.info[i].is_over == 1 ){
						img_this = gift_img[date.info[i].type - 1];
					}else{
						img_this = giftover_img[date.info[i].type - 1];
					}
					$('.recordlist').append('<li date-type=' + date.info[i].type + ' date-id=' + date.info[i].jp_id + ' date-over=' + date.info[i].is_over + '><p class="recordtime">' + date.info[i].create_time + '</p><div class="recordimg"><img src="' + img_this + '" ></div></li>');
				}
				$('.record').css({display:'block'});
			}else{
				$('.maskbg').css({display:'block'});
				$('.norecord').css({display:'block'});
			}
		},'json')
	}
	$('.recordlist').delegate('li','click',function(){
		var this_jpid = $(this).attr('date-id');
		var this_id = $(this).attr('date-type');
		var this_over = $(this).attr('date-over');
		if ( this_id == 3 && this_over == 1){
			$.post('http://share.i-ev.com/home/game/luckdraw',{"jp_id":this_jpid,"code":102},function(date){
				if( date.status == 1 ){
					$('.maskbg').css({display:'block'});
					$('.jpnumber').text(date.info.code_sn);
					$('.jppassword').text(date.info.code_pwd);
					$('.jpycoupon').css({display:'block'});
				}
			},'json')
		} else if( this_id == 4 && this_over == 1) {
			$('.maskbg').css({display:'block'});
			$('.y200coupon').css({display:'block'});
		}
	})
	$(document).ajaxComplete(function(){
		$('.ajax').hide()
	})
	$(document).ajaxError(function(){
		$('.ajax').hide()
		if(islogin){
			alert('网络状况不佳，请稍后再试');
		}
	})
	$('.startbtn').click(function(){
		if( !islogin ){
			alert('请登录聚能充App后再参加活动');
			return;
		}
		if(isBegin) return false;
		isBegin = true;
		start();
	});	
	$('.oncemore').click(function(){
		$('.record').css({display:'none'});
		$('.maskbg,.jump').css({display:'none'});
		isBegin = true;
		start();
	});
	// 详情打开
	$('.seedetails').click(function(){
		if($(this).attr('data-id') == '1'){
			// 200元代金券
		}else if($(this).attr('data-id') == '2'){
			// 30元代金券
		}else if($(this).attr('data-id') == '3'){
			// 亲子摄影
		}else if($(this).attr('data-id') == '4'){
			// 玻璃水服务
		}
		$('.bonusdetails').css({display:'block'});
	})
	$('.closejump,.closesomall').click(function(){
		$('.maskbg').css({display:'none'});
		$(this).parents('.jump').css({display:'none'});
	})
	$('.winning').click(function(){
		// giftrecord();
	})
	$('.closerecord').click(function(){
		$('.maskbg').css({display:'none'});
		$('.record').css({display:'none'});
	})
	// 礼品滑动

})