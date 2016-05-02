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


			// Block friend.
			$('.col-md-8 .list-group .list-group-item #Block').click( function () {
			var id = $(this).attr("values");
			console.log(id);
			var ThongBao = "BlockFriend";
			$(this).text("UnBlock");
			var request = $.ajax({
					url: "http://localhost:3000/showFriends",
					type: "PUT",
					data: {
							ThongBao: ThongBao,
							id: id
					},
					contentType: "application/x-www-form-urlencoded",
					dataType: "json",

					});
		});


		// UnBlock friend
		$('.col-md-8 .list-group .list-group-item #UnBlock').click( function () {
			var id = $(this).attr("values");
			var ThongBao = "UnBlockFriend";
			$(this).text("Block");

			var request = $.ajax({
					url: "http://localhost:3000/showFriends",
					type: "PUT",
					data: {
							ThongBao: ThongBao,
							id: id
					},
					contentType: "application/x-www-form-urlencoded",
					dataType: "json",
					});
		});


		//Delete Friend
		$('.col-md-8 .list-group .list-group-item #Delete').click( function () {
			var id = $(this).attr("values");
			var ThongBao = "DeleteFriend";
			var that = this;
			var request = $.ajax({
					url: "http://localhost:3000/showFriends",
					type: "DELETE",
					data: {
							ThongBao: ThongBao,
							id: id
					},
					contentType: "application/x-www-form-urlencoded",
					dataType: "json",
					});

					request.success(function(result) {
							console.log('delete friend');
							var newM = $('<div class="alert alert-success" role="alert" style="text-align: -webkit-center;"><strong> Xóa bạn thành công </strong></div>');
							$(that).parent().fadeOut();
							$('#container-M').fadeIn();
							$('#container-M').append(newM);
							$(newM).fadeOut(1500);
					});

					request.fail(function(jqXHR, textStatus) {
										var newM = $('<div class="alert alert-danger" role="alert" style="text-align: -webkit-center;"><strong>Xóa bạn thất bại</strong></div>');
										$('#container-M').append(newM);
										$(newM).fadeOut(1500);
					});

		});



		// Add friend
		$('.col-md-4 .list-group .list-group-item #AddFriend').click( function () {
			var id = $(this).attr("values");
			var ThongBao = "AddFriend";
			var label = $(this).parent().attr('values');
			var newA = $('<a style="background-color: aliceblue;height: 56px;" class="list-group-item">'+ label +'</a>')
			$('.col-md-8 .AddFriend ').append(newA);
			$(this).parent().fadeOut();
			var newM = $('<div class="alert alert-success" role="alert" style="text-align: -webkit-center;"> Thêm bạn thành công.</div>');
			$('#container-M').append(newM);
			$(newM).fadeOut(1500);
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
			$('.col-sm-3 .dropdown #AddFriend button').click(function () {
				var id = $(this).attr("values");
				var name = $(this).parent().attr("values");
				var newLi = $('<li><p>'+name+'</p>' + '</li>')
				$('#UlSentEmail ul').prepend(newLi);
				tempFriend[n] = id;
				n++;
				$(this).fadeOut();
			});

			$('.clear').click(function() {
				$('#UlSentEmail .ListSentEmail').children().remove();
				$('.col-sm-3 .dropdown #AddFriend button').fadeIn();
				tempFriend = [];
				n=0;
			});

			// chinh thanh li khi nhan them ban
			$('#UlSentEmail.ListSentEmail').bind("DOMSubtreeModified",function(){
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
				console.log(NoiDung);

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
					$('.container .ListSentEmail').children().remove();
					$('.form-group .form-group-content #message-text').val("");
					var newM = $('<div class="alert alert-success" role="alert"><strong> Thư gửi thành công </strong></div>');
					$('.container-E').append(newM);
					$(newM).fadeOut(1500);
				});
				request.fail(function(jqXHR, textStatus) {
								alert("Request failed: " + textStatus);
				});

				tempFriend = [];
				n=0;
			});


		$('.row .HomeEmailCSS').mouseleave(function() {
				$(this).delay(500).css("font-size", "1em");
				$('.row .HomeEmailCSS div p').css("white-space","nowrap");


		});


		$('.row .HomeEmailCSS').click(function() {
				$(this).css("background-color", "#EAECEC");
				var id = $(this).attr("id");
				var ThongBao = "update";
				var d = new Date();
				var date = d.toLocaleString();
				var request = $.ajax({
						url: "http://localhost:3000/",
						type: "PUT",
						data: {
								ThongBao: ThongBao,
								id: id,
								date: date
						},
						contentType: "application/x-www-form-urlencoded",
						dataType: "json",
					});
		 });




});
