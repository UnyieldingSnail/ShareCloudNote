/********************************
 * login.js封装了登录和注册处理
 * @returns
 ********************************/
$(function() {
	//给登陆按钮绑定单击处理
	$("#login").click(checkLogin);
	//给注册按钮绑定单击处理
	$("#regist_button").click(register);
	$("body").keydown(enterLogin);
});
function enterLogin(e) {
	if(e.keyCode == "13") {
		checkLogin();
	}
}
function checkLogin() {
	//获取请求参数
	var count = $("#count").val();
	var password = $("#password").val();
	//清空错误提示
	$(".error").html("");
	//检测数据格式
	var ok = true;
	if (count == "") {
		$("#count_error").html("用户名为空！");
		ok = false;
	}
	if (password == "") {
		$("#password_error").html("密码为空！");
		ok = false;
	}
	//发送ajax请求
	if (ok) {
		$.ajax({
			url:base_path+"/user/login.do",
			type:"post",
			data:{
				"cn_user_name":count,
				"cn_user_password":password
			},
			dataType:"json",
			success:function(result) {
				if (result.status == 1) {
					//显示错误提示
					$("#count_error").html(result.msg);
				} else if (result.status == 2){
					//显示错误提示
					$("#password_error").html(result.msg);
				} else {
					var user = result.data;//获取返回的用户信息
					addCookie('uid', user.cn_user_id, 2);
					addCookie('uname', user.cn_user_name, 2);
					window.location.href = "edit.html";
				}
			},
			error:function() {
				alert("登陆异常");
			}
		});
	}
};
//注册处理
function register() {
	//获取请求参数
	var username = $("#regist_username").val().trim();
	var nickname = $("#nickname").val().trim();
	var password = $("#regist_password").val().trim();
	var f_password = $("#final_password").val().trim();
	//格式检查
	$(".warning").hide();
	var ok = true;
	if (username == "") {
		$("#warning_1").show();
		$("#warning_1 span").html("用户名为空");
		ok = false;
	}
	if (password == "") {
		$("#warning_2").show();
		$("#warning_2 span").html("密码为空");
		ok = false;
	} else if(password.length < 6) {
		$("#warning_2").show();
		$("#warning_2 span").html("密码长度过短");
		ok = false;
	}
	if (f_password == "") {
		$("#warning_3").show();
		$("#warning_3 span").html("确认密码为空");
		ok = false;
	} else if (f_password != password) {
		$("#warning_3").show();
		$("#warning_3 span").html("两次输入密码不一致");
		ok = false;
	}
	//发送ajax请求
	if (ok) {
		$.ajax({
			url: base_path + "/user/add.do",
			type: "post",
			data: {
				"cn_user_name": username,
				"cn_user_nick": nickname,
				"cn_user_password":password
			},
			dataType: "json",
			success: function(result) {
				if (result.status == 1) {
					//显示用户名占用提示
					$("#warning_1").show();
					$("#warning_1 span").html(result.msg);
				} else {
					alert(result.msg);
					//转到登陆界面
					//window.location.href = "edit.html";
					$("#back").click();//触发返回键单击事件
				}
			},
			error: function() {
				alert("注册异常");
			}
		});
	}
};