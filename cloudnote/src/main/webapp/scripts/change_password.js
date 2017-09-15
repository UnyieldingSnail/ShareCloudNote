/************************
 * 封装了修改密码相关操作
 ***********************/
$(function() {
	var flag = false;
	//给关闭按钮绑定单击事件
	$('#back').click(back);
	//验证原始密码
	$('#last_password').blur(validOldPwd);
	//检查两次密码输入是否相同
	$('#final_password').blur(checkRepeat);
	//检查新密码的格式
	$('#new_password').blur(checkPwdFormat);
	//隐藏警告
	$('#new_password').focus(function(){
		$('#warning_2').hide();
	});
	//隐藏警告
	$('#final_password').focus(function(){
		$('#warning_3').hide();
	});
	//给"确定"修改密码按钮添加单击事件
	$("#changePassword").click(changePassword);
	
});
function back(){
	$('#zc').addClass('sig sig_out');
	window.history.back();
}
function validOldPwd(){
	//获取请求参数
	var lpassword=$('#last_password').val();
	var userName = getCookie("uname");
	//格式检查
	if (userName) {
		//发送ajax请求
		$.ajax({
			url:base_path + "/user/login.do",
			type:"post",
			dataType:"json",
			data:{
				"cn_user_name":userName,
				"cn_user_password":lpassword
			},
			success:function(result) {
				if (result.status == 0) {
					$('#warning_1').hide();
					flag = true;
				} else {
					$('#warning_1').show();
					flag = false;
				}
			},
			error:function() {
				alert("修改密码异常");
			}
		});
	} else {
		window.location.href = "log_in.html";
	}
}
function checkRepeat(){
	var npassword=$('#new_password').val();
	var fpassword=$('#final_password').val();
	if(npassword!=fpassword){
		$('#warning_3').show();
		flag = false;
	}else{
		flag = true;
	}
}
function checkPwdFormat(){
	var npassword=$('#new_password').val().length;
	if(npassword<6){
		$('#warning_2').show();
		flag = false;
	}else{
		flag = true;
	}
}
function changePassword(){
	//获取请求参数
	var fpassword=$('#final_password').val();
	var userName = getCookie("uname");
	//如果用户输入符合格式要求，则发送ajax请求
	if(flag && fpassword){
		$.ajax({
			url:base_path + "/user/changepassword.do",
			type:"post",
			dataType:"json",
			data:{
				"cn_user_name":userName,
				"cn_user_password":fpassword
			},
			success:function(result) {
				if (result.status == 0) {
					alert(result.msg);
					window.location.href = "log_in.html";
				} else {
					alert(result.msg);
				}
			},
			error:function() {
				alert("修改密码异常");
			}
		});
	}
}