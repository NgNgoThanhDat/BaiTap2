$(document).ready(function() {


			$("#dangnhap").click( function () {
				 window.location.href='/login';
			});

			$("#dangky").click( function () {
				window.location.href='/signup';
			});

			$('#dangxuat').click(function () {
				window.location.href='/logout';
			});

			$("#taotinnhan").click( function () {
				window.location.href='/createEmail';
			});


		$('.col-md-8 .list-group .list-group-item #Block').click( function () {
			var id = $(this).attr("values");
			console.log(id);
			var ThongBao = "BlockFriend";
			$(this).text("UnBlock");
			var request = $.ajax({
					url: "http://localhost:3000/showFriends",
					type: "POST",
					data: {
							ThongBao: ThongBao,
							id: id
					},
					contentType: "application/x-www-form-urlencoded",
					dataType: "json",

					});
		});

		$('.col-md-8 .list-group .list-group-item #UnBlock').click( function () {
			var id = $(this).attr("values");
			var ThongBao = "UnBlockFriend";
			$(this).text("Block");
			var request = $.ajax({
					url: "http://localhost:3000/showFriends",
					type: "POST",
					data: {
							ThongBao: ThongBao,
							id: id
					},
					contentType: "application/x-www-form-urlencoded",
					dataType: "json",
					});
		});

		$('.col-md-8 .list-group .list-group-item #Delete').click( function () {
			var id = $(this).attr("values");
			var ThongBao = "DeleteFriend";
			var request = $.ajax({
					url: "http://localhost:3000/showFriends",
					type: "POST",
					data: {
							ThongBao: ThongBao,
							id: id
					},
					contentType: "application/x-www-form-urlencoded",
					dataType: "json",
					});
					request.success(function(result) {
							var newM = $('<div class="alert alert-success" role="alert"><strong> Xóa thành công </strong></div>');
							$(this).parent().fadeOut();
							$('#container-M').append(newM);
					});
					request.fail(function(jqXHR, textStatus) {
										var newM = $('<div class="alert alert-danger" role="alert"><strong>Xóa thất bại</strong></div>');
										$('#container-M').append(newM);
					});

		});


		$('.col-md-4 .list-group .list-group-item #AddFriend').click( function () {
			var id = $(this).attr("values");
			var ThongBao = "AddFriend";
			var label = $(this).parent().attr('values');
			var newA = $('<a style="background-color: aliceblue;height: 56px;" class="list-group-item">'+ label +'</a>')
			$('.col-md-8 .AddFriend ').append(newA);
			$(this).parent().fadeOut();
			var newM = $('<div class="alert alert-success" role="alert"><strong>Well done!</strong> You successfully read this important alert message.</div>');
			$('#container-M').append(newM);
			var request = $.ajax({
					url: "http://localhost:3000/showFriends",
					type: "POST",
					data: {
							ThongBao: ThongBao,
							id: id
					},
					contentType: "application/x-www-form-urlencoded",
					dataType: "json",
					});
		});
			var tempFriend = [];
			var n = 0;
			$('.col-sm-2 .dropdown #AddFriend button').click(function () {
				var id = $(this).attr("values");
				var name = $(this).parent().attr("values");
				var newLi = $('<li><p>'+name+'</p>' + '</li>')
				$('.col-sm-10 ul').prepend(newLi);
				tempFriend[n] = id;
				n++;
				$(this).fadeOut();
			});

			$('.clear').click(function() {
				$('.col-sm-10 .ListSentEmail').children().remove();
				$('.col-sm-2 .dropdown #AddFriend button').fadeIn();
				tempFriend = [];
				n=0;
			});

			$('.col-sm-10 .ListSentEmail').bind("DOMSubtreeModified",function(){
					$('.ListSentEmail li').css("float","left");
					$('.ListSentEmail li').css("display","flex");
					$('.ListSentEmail li').css("margin","10px");
					//
					$('.ListSentEmail li button').css("border","none");
					$('.ListSentEmail li button').css("height","44px");
					$('.ListSentEmail li button').css("background-color","#C9302C");
					$('.ListSentEmail li button').css("color","#fff");
					//
					$('.ListSentEmail li p').css("display","block");
					$('.ListSentEmail li p').css("padding","8px");
					$('.ListSentEmail li p').css("color","#fff");
					$('.ListSentEmail li p').css("font-weight","boid");
					$('.ListSentEmail li p').css("font-size","1.2em");
					$('.ListSentEmail li p').css("background-color","#C9302C");

					$('.ListSentEmail').css("display","inline-block");

			});

			$('.modal-footer .modal-footer-SendEmail #Cancel').click(function () {
				window.location.href='/';
			});


			$('.modal-footer .modal-footer-SendEmail #send').click (function () {
				var NoiDung = $('.form-group .form-group-content #message-text').val();
				console.log(tempFriend);
				var request = $.ajax({
						url: "http://localhost:3000/sendEmail",
						type: "POST",
						data: {
								tempFriend: tempFriend,
								NoiDung: NoiDung
						},
						contentType: "application/x-www-form-urlencoded",
						dataType: "json",
					});

				request.success(function(result) {
					$('.col-sm-10 .ListSentEmail').children().remove();
					$('.container-M').css("visibility","visible")
					$('.form-group .form-group-content #message-text').val("");
				});
				request.fail(function(jqXHR, textStatus) {
								alert("Request failed: " + textStatus);
				});

				tempFriend = [];
				n=0;
			});


		
		$('.row .HomeEmailCSS').hover(function() {
				$(this).delay(500).css("font-size", "1.4em");
				$('.row .HomeEmailCSS p').css("word-wrap", "break-word");
				$('.row .HomeEmailCSS p').css("white-space","");
				//alert(1);
		});
		$('.row .HomeEmailCSS').mouseleave(function() {
				$(this).delay(500).css("font-size", "1em");
				$('.row .HomeEmailCSS div p').css("white-space","nowrap");


		});


		$('.row .HomeEmailCSS').click(function() {
				$(this).css("background-color", "#fff");
				var id = $(this).attr("id");
				var ThongBao = "update";
				var d = new Date();
				var date = d.toLocaleString();
				var request = $.ajax({
						url: "http://localhost:3000/",
						type: "POST",
						data: {
								ThongBao: ThongBao,
								id: id,
								date: date
						},
						contentType: "application/x-www-form-urlencoded",
						dataType: "json",
					});
		 });














})
