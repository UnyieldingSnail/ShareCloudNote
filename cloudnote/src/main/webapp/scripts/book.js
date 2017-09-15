//清空预览
function clearPreview() {
	$("#noput_note_title").html("");
	$("#noput_note_title").next().html("");
}
//显示用户笔记本列表
function showUserBooks(){
	//获取请求参数
	var userID = getCookie("uid");
	//格式检查
	if (userID == null) {
		window.location.href = "log_in.html";
	} else {
		//发送ajax请求
		$.ajax({
			url:base_path + "/book/showbooks.do",
			type:"post",
			dataType:"json",
			data:{
				"userID":userID,
			},
			success:function(result) {
				if (result.status == 0) {
					//查询到的笔记本 
					var books = result.data;
					for (var i = 0; i < books.length; i++) {
						var bookID = books[i].cn_notebook_id;
						var bookName = books[i].cn_notebook_name;
						//构建列表li元素
						createBookLi(bookID, bookName);
					}
				}
			},
			error:function() {
				alert("加载笔记本列表异常");
			}
		});
	}
}
//显示选中笔记本中的笔记列表
function showBookNotes() {
	//切换列表显示
	$("#pc_part_2").show();//全部笔记列表
	$("#pc_part_4").hide();//回收站
	$("#pc_part_6").hide();//搜索结果
	$("#pc_part_7").hide();//收藏列表
	$("#pc_part_8").hide();//活动列表
	//显示编辑笔记界面，隐藏预览界面
	$("#pc_part_3").show();
	$("#pc_part_5").hide();
	//清除原有选中样式
	$("#book_ul a").removeClass("checked");
	//给当前标签添加选中样式
	$(this).children("a").addClass("checked");
	//获取请求参数
	var bookID = $(this).data("bookID");
	//发送ajax请求
	$.ajax({
		url:base_path + "/note/shownotes.do",
		type:"post",
		dataType:"json",
		data:{
			"bookID":bookID
		},
		success:function(result) {
			//获取服务器返回的笔记信息
			var notes = result.data;
			//清空原有的笔记列表
			$("#note_ul").empty();
			for (var i = 0; i < notes.length; i++) {
				var noteID = notes[i].cn_note_id;
				var noteTitle = notes[i].cn_note_title;
				var noteStatus = notes[i].cn_note_status_id;
				createNoteLi(noteID,noteTitle,noteStatus);
			}
		},
		error:function() {
			alert("加载笔记列表异常");
		}
	});
}
//加载笔记内容
function loadNote() {
	//清空原有选中样式
	$("#note_ul a").removeClass("checked");
	//给当前选中笔记添加选中样式
	$(this).find("a").addClass("checked");
	//获取请求参数
	var noteID = $(this).data("noteID");
	//发送ajax请求
	$.ajax({
		url:base_path + "/note/load.do",
		type:"post",
		dataType:"json",
		data:{
			"noteID":noteID
		},
		success:function(result) {
			var data = result.data;
			var title = data.cn_note_title;
			var body = data.cn_note_body;
			//设置标题
			$("#input_note_title").val(title);
			//设置内容
			if (body == null) {
				um.setContent("");
			} else {
				um.setContent(body);
			}
		},
		error:function() {
			alert("加载笔记异常");
		}
	});
}
//保存笔记
function updateNote() {
	//获取请求参数
	var title = $("#input_note_title").val();
	var body = um.getContent();
	//获取选中的笔记li元素
	var $li = $("#note_ul a.checked").parent();
	var noteID = $li.data("noteID");
	//格式检查
	if ($li.length == 0) {
		alert("请选择要保存的笔记");
	} else if (title == "") {
		$("#note_title_warning").html("<font color='red'>标题不能为空</font>");
	} else {
		//发送ajax请求
		$("#note_title_warning").empty();
		$.ajax({
			url:base_path + "/note/update.do",
			type:"post",
			dataType:"json",
			data:{
				"noteID":noteID,
				"title":title,
				"body":body
			},
			success:function(result) {
				//更新笔记li元素
				$li.find("span").text(title);
				alert(result.msg);
			},
			error:function() {
				alert("保存笔记异常");
			}
		});
	}
}
//创建笔记本
function addBook() {
	//获取请求参数
	var bookName = $("#input_notebook").val().trim();
	var userID = getCookie("uid");
	//格式检查
	if (bookName == "") {
		$("#notebook_warning").html("笔记本名为空").css("color","red");
	} else if(userID == ""){
		window.location.href = "log_in.html";
	} else {
		//发送ajax请求
		$.ajax({
			url:base_path + "/book/add.do",
			type:"post",
			dataType:"json",
			data:{
				"userID":userID,
				"bookName":bookName,
				"typeID":"5"
			},
			success:function(result) {
				var bookID = result.data;
				createBookLi(bookID, bookName);
				alert(result.msg);
			},
			error:function() {
				alert("创建笔记本异常");
			}
		});
	}
}
//创建笔记本列表li元素
function createBookLi(bookID, bookName) {
	var li = '<li class="disable">'
		+	'<a>'
		+		'<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'
		+		'<span>'
		+		bookName
		+		'</span>'
		+		'<button type="button" class="btn btn-default btn-xs btn_position btn_book" title="删除"><i class="fa fa-times"></i></button>'
		+	'</a>'
		+'</li>';
	//将bookID绑定到li元素上
	var $li = $(li);
	$li.data("bookID", bookID);
	//将li元素添加到ul列表中
	$("#book_ul").append($li);
}
//创建笔记列表li元素
function createNoteLi(noteID,noteTitle,noteStatus) {
	var li = '<li class="online">'
		+	'<a>'
		+		'<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'
		+		'<span>' 
		+ 		noteTitle 
		+ 		'</span>'
		+		'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>'
		+	'</a>'
		+	'<div class="note_menu" tabindex="-1">'
		+		'<dl>'
		+			'<dt><button type="button" class="btn btn-default btn-xs btn_move" title="移动至...""><i class="fa fa-random"></i></button></dt>'
		+			'<dt><button type="button" class="btn btn-default btn-xs btn_share" title="分享"><i class="fa fa-sitemap"></i></button></dt>'
		+			'<dt><button type="button" class="btn btn-default btn-xs btn_delete" title="删除"><i class="fa fa-times"></i></button></dt>'
		+		'</dl>'
		+	'</div>'
		+'</li>';
	var $li = $(li);
	var ico = "&nbsp&nbsp<i class='fa fa-sitemap'></i>";
	if (noteStatus == push) {
		$li.find("span").after(ico);
	}
	$li.data("noteID",noteID);
	$("#note_ul").append($li);
}
//创建笔记
function addNote() {
	//获取请求参数
	var $book = $("#book_ul a.checked").parent();
	var bookID = $book.data("bookID");
	var userID = getCookie("uid");
	var noteTitle = $("#input_note").val().trim();
	//格式检查
	if (noteTitle == "") {
		$("#note_warning").html("笔记标题为空").css("color","red");
	} else if(userID == ""){
		window.location.href = "log_in.html";
	} else {
		//发送ajax请求
		$.ajax({
			url:base_path + "/note/add.do",
			type:"post",
			dataType:"json",
			data:{
				"userID":userID,
				"noteTitle":noteTitle,
				"bookID":bookID,
				"noteType":"1",
				"noteStatus":normal
			},
			success:function(result) {
				var noteID = result.data;
				createNoteLi(noteID,noteTitle,normal);
				alert(result.msg);
			},
			error:function() {
				alert("创建笔记本异常");
			}
		});
	}
}
//重命名笔记本
function renameBook() {
	//获取请求参数
	var newName = $("#input_notebook_rename").val().trim();
	var $book = $("#book_ul a.checked").parent();
	var bookID = $book.data("bookID");
	var userID = getCookie("uid");
	//格式检查
	if (newName == "") {
		$("#notebook_warning").html("笔记本名为空").css("color","red");
	} else if(userID == ""){
		window.location.href = "log_in.html";
	} else {
		//发送ajax请求
		$.ajax({
			url:base_path + "/book/rename.do",
			type:"post",
			dataType:"json",
			data:{
				"bookID":bookID,
				"bookName":newName,
			},
			success:function(result) {
				if (result.status == 0) {
					$book.find("span").html(newName);
				}
				alert(result.msg);
			},
			error:function() {
				alert("重命名笔记本异常");
			}
		});
	}
}
//弹出笔记菜单
function popNoteMenu() {
	//隐藏所有笔记菜单
	$("#note_ul div").hide();
	//显示点击的笔记菜单
	var $menu = $(this).parent().next();
	$menu.slideDown(500);
	//清空原有选中样式
	$("#note_ul a").removeClass("checked");
	//给当前选中笔记添加选中样式
	$(this).parent().addClass("checked");
	//阻止事件冒泡
	return false;
}
//隐藏笔记菜单
function hideNoteMenu() {
	//隐藏所有笔记菜单
	$("#note_ul div").hide();
}
//删除笔记
function deleteNote() {
	//获取请求参数
	var $li = $("#note_ul a.checked").parent();
	var noteID = $li.data("noteID");
	//发送ajax请求
	$.ajax({
		url:base_path + "/note/delete.do",
		type:"post",
		dataType:"json",
		data:{"cn_note_id":noteID},
		success:function(result) {
			if (result.status == 0) {
				$li.remove();
				//清空预览
				clearPreview();
			}
			alert(result.msg);
		},
		error:function() {
			alert("删除笔记异常");
		}
	});
}
//移动笔记
function moveNote() {
	//获取请求参数
	var targetBookID = $("#moveSelect").val();
	var checkedBookID = $("#book_ul a.checked").parent().data("bookID");
	var noteID = $("#note_ul a.checked").parent().data("noteID");
	//如果所移动到的笔记本不是当前所属笔记本则执行
	if (targetBookID != checkedBookID) {
		$.ajax({
			url:base_path + "/note/move.do",
			type:"post",
			dataType:"json",
			data:{
				"cn_notebook_id":targetBookID,
				"cn_note_id":noteID
			},
			success:function(result) {
				if (result.status == 0) {
					//将笔记从当前笔记本中删除
					$("#note_ul a.checked").parent().remove();
					//清空预览
					clearPreview();
				}
				alert(result.msg);
			},
			error:function() {
				alert("移动笔记异常");
			}
		});
	} else {
		closeAlertWindow();
	}
}
//分享笔记
function shareNote() {
	//获取请求参数
	var $li = $(this).parents("li");
	var noteID = $li.data("noteID");
	//发送ajax请求
	$.ajax({
		url:base_path + "/note/share.do",
		type:"post",
		dateType:"json",
		data:{"cn_note_id":noteID},
		success:function(result) {
			if (result.status == 0) {
				var ico = "&nbsp&nbsp<i class='fa fa-sitemap'></i>";
				$li.find("span").after(ico);
			}
			alert(result.msg);
		},
		error:function() {
			alert("分享笔记异常");
		}
	});
}
//分页搜索笔记
function searchSharePage(key, page) {
	$.ajax({
		url:base_path + "/note/search_share.do",
		type:"post",
		dataType:"json",
		data:{
			"key":key,
			"page":page
		},
		success:function(result){
			if (result.status == "0") {
				//获取分享笔记
				var data = result.data;
				var userID = getCookie("uid");
				//将分享笔记生成li追加到分享列表
				for (var i = 0; i < data.length; i++) {
					var shareID = data[i].cn_share_id;
					var shareTitle = data[i].cn_share_title;
					var tempUserID = data[i].cn_user_id;
					//生成li元素
					/*
					var li = '<li class="online">'
							+	'<a>'
							+		'<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'
							+		'<span>' 
							+ 		shareTitle 
							+ 		'</span>'                   
							+		'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down" title="收藏"><i class="fa fa-star"></i></button>'
							+	'</a>'
							+'</li>';
					*/
					var li = '<li class="disable">'
							+	'<a>'
							+		'<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'
							+		'<span>'
							+		shareTitle
							+		'</span>'
							+		'<button type="button" class="btn btn-default btn-xs btn_position btn_like" title="收藏"><i class="fa fa-star"></i></button>'
							+	'</a>'
							+'</li>';
					var $li = $(li);
					//绑定shareID
					$li.data("shareID",shareID);
					//如果本用户已经收藏则添加收藏图标
					if (tempUserID == userID) {
						$li.find("span").after('&nbsp&nbsp<i class="fa fa-star"></i>');
					}
					//追加到笔记列表
					$("#share_ul").append($li);
				}
			} else {
				alert(result.msg);
			}
		},
		error:function(){
			alert("搜索分享笔记异常");
		}
	});
}
//搜索分享笔记
function searchShareNotes(e) {
	var eventCode = e.keyCode;
	//如果不是回车键则结束函数
	if (eventCode != 13) return;
	//初始化查询页面
	page = 1;
	//获取请求参数
	var key = $(this).val().trim();
	//隐藏编辑笔记界面，显示预览界面
	$("#pc_part_3").hide();
	$("#pc_part_5").show();
	//显示搜索结果列表
	$("#pc_part_2").hide();//全部笔记列表
	$("#pc_part_4").hide();//回收站
	$("#pc_part_6").show();//搜索结果
	$("#pc_part_7").hide();//收藏列表
	$("#pc_part_8").hide();//活动列表
	//清除原有列表结果
	$("#share_ul").empty();
	//发送ajax请求
	searchSharePage(key, page++);
}
//更多分享笔记
function moreShareNotes() {
	//获取请求参数
	var key = $("#search_note").val().trim();
	//发送ajax请求
	searchSharePage(key, page++);
}
//加载分享笔记信息
function loadShareNote() {
	//清除原有选中样式
	$("#share_ul a").removeClass("checked");
	//给当前li添加选中样式
	$(this).find("a").addClass("checked");
	//获取shareID
	var shareID = $(this).data("shareID");
	//发送ajax请求
	$.ajax({
		url:base_path+"/note/load_share.do",
		type:"post",
		dataType:"json",
		data:{"shareID":shareID},
		success:function(result) {
			if (result.status == 0) {
				var data = result.data;
				var title = data.cn_share_title;
				var body = data.cn_share_body;
				$("#noput_note_title").html(title);
				if (body) {
					$("#noput_note_title").next().html(body);
				} else {
					$("#noput_note_title").next().html("");
				}
			} else {
				alert(result.msg);
			}
		},
		error:function() {
			alert("加载分享笔记异常");
		}
	});
}
//显示回收站列表
function recycleBin() {
	//获取请求参数
	var userID = getCookie("uid");
	if (userID == null) {
		window.location.href = "log_in.html";
		return;
	}
	//隐藏编辑笔记界面，显示预览界面
	$("#pc_part_3").hide();
	$("#pc_part_5").show();
	//显示搜索结果列表
	$("#pc_part_2").hide();//全部笔记列表
	$("#pc_part_4").show();//回收站
	$("#pc_part_6").hide();//搜索结果
	$("#pc_part_7").hide();//收藏列表
	$("#pc_part_8").hide();//活动列表
	//清空回收站列表
	$("#recycle_ul").empty();
	//发送ajax请求
	$.ajax({
		url:base_path+"/note/recyclebin.do",
		type:"post",
		dataType:"json",
		data:{"userID":userID},
		success:function(result) {
			if (result.status == 0) {
				var data = result.data;
				if (data != null) {
					for (var i = 0; i < data.length; i++) {
						//获取笔记ID
						var noteID = data[i].cn_note_id;
						//获取笔记标题
						var title = data[i].cn_note_title;
						var li = '<li class="disable">'
								+	'<a>'
								+		'<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'
								+		title
								+		'<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button>'
								+		'<button type="button" class="btn btn-default btn-xs btn_position_2 btn_replay"><i class="fa fa-reply"></i></button>'
								+	'</a>'
								+'</li>';
						var $li = $(li);
						$li.data("noteID",noteID);
						$("#recycle_ul").append($li);
					}
				}
			} else {
				alert(result.msg);
			}
		},
		error:function() {
			alert("加载分享笔记异常");
		}
	});
}
//加载回收站笔记信息
function loadRecycleNote() {
	//清空原有选中样式
	$("#recycle_ul a").removeClass("checked");
	//添加选中样式
	$(this).find("a").addClass("checked");
	//获取笔记ID
	var noteID = $(this).data("noteID");
	//发送ajax请求
	$.ajax({
		url:base_path+"/note/load_recycle_note.do",
		type:"post",
		dataType:"json",
		data:{"noteID":noteID},
		success:function(result){
			var data = result.data;
			var title = data.cn_note_title;
			var body = data.cn_note_body;
			$("#noput_note_title").html(title);
			if (body != null) {
				$("#noput_note_title").next().html(body);
			} else {
				$("#noput_note_title").next().html("");
			}
		},
		error:function(){
			alert("加载笔记信息异常");
		}
	});
}
//恢复笔记
function replayNote() {
	//获取请求参数
	var $li = $("#recycle_ul a.checked").parent();
	var noteID = $li.data("noteID");
	var bookID = $("#replaySelect").val();
	//发送ajax请求
	$.ajax({
		url:base_path+"/note/replay_note.do",
		type:"post",
		dataType:"json",
		data:{
			"cn_note_id":noteID,
			"cn_notebook_id":bookID
		},
		success:function(result) {
			if (result.status == 0) {
				$li.remove();
				//清空预览
				clearPreview();
			}
			alert(result.msg);
		},
		error:function() {
			alert("恢复笔记异常");
		}
	});
}
//彻底删除笔记
function deleteRollback() {
	//获取请求参数
	var $li = $("#recycle_ul a.checked").parent();
	var noteID = $li.data("noteID");
	//发送ajax请求
	$.ajax({
		url:base_path+"/note/delete_rollback.do",
		type:"post",
		dataType:"json",
		data:{"noteID":noteID},
		success:function(result) {
			if (result.status == 0) {
				$li.remove();
				//清空预览
				clearPreview();
			}
			alert(result.msg);
		},
		error:function() {
			alert("彻底删除笔记异常");
		}
	});
}
function logout() {
	delCookie("uid");
	delCookie("uname");
	window.location.href = "log_in.html";
}
function likeNote() {
	//获取请求参数
	var $li = $("#share_ul a.checked").parent();
	var userID = getCookie("uid");
	var shareID = $li.data("shareID");
	//参数检查
	if (userID == null) {
		window.location.href = "log_in.do";
		return;
	}
	//发送ajax请求
	$.ajax({
		url:base_path+"/note/like.do",
		type:"post",
		dataType:"json",
		data:{
			"cn_share_id":shareID,
			"cn_user_id":userID
		},
		success:function(result) {
			if (result.status == 0) {
				$li.find("span").after('&nbsp&nbsp<i class="fa fa-star"></i>');
			}
			alert(result.msg);								
		},
		error:function() {
			alert("收藏笔记异常");
		}
	});
}
function showLike() {
	//隐藏编辑笔记界面，显示预览界面
	$("#pc_part_3").hide();
	$("#pc_part_5").show();
	//显示搜索结果列表
	$("#pc_part_2").hide();//全部笔记列表
	$("#pc_part_4").hide();//回收站
	$("#pc_part_6").hide();//搜索结果
	$("#pc_part_7").show();//收藏列表
	$("#pc_part_8").hide();//活动列表
	//获取请求参数
	var userID = getCookie("uid");
	//格式检查
	if (userID == null) {
		window.location.href = "log_in.html";
		return;
	}
	$("#like_ul").empty();
	//发送ajax请求
	$.ajax({
		url:base_path+"/note/show_like.do",
		type:"post",
		dataType:"json",
		data:{"userID":userID},
		success:function(result) {
			if (result.status == 0) {
				var notes = result.data;
				for (var i = 0; i < notes.length; i++) {
					var note = notes[i];
					var likeID = note.cn_like_id;
					var title = note.cn_note_title;
					var li = '<li class="disable">'
						+	'<a>'
						+		'<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'
						+		title
						+		'<button type="button" class="btn btn-default btn-xs btn_position btn_dislike" title="取消收藏"><i class="fa fa-reply"></i></button>'
						+	'</a>'
						+'</li>';
					var $li = $(li);
					$li.data("likeID",likeID);
					$("#like_ul").append($li);
				}
			} else {
				alert(result.msg);
			}
		},
		error:function() {
			alert("显示已收藏笔记异常");
		}
	});
}
//加载收藏笔记信息
function loadLike() {
	//去除原有选中样式
	$("#like_ul a.checked").removeClass("checked");
	//给当前li添加选中样式
	$(this).find("a").addClass("checked");
	//获取请求参数
	var likeID = $(this).data("likeID");
	//发送ajax请求
	$.ajax({
		url:base_path+"/note/load_like_note.do",
		type:"post",
		dataType:"json",
		data:{"likeID":likeID},
		success:function(result){
			var data = result.data;
			var title = data.cn_note_title;
			var body = data.cn_note_body;
			$("#noput_note_title").html(title);
			if (body != null) {
				$("#noput_note_title").next().html(body);
			} else {
				$("#noput_note_title").next().html("");
			}
		},
		error:function(){
			alert("加载笔记信息异常");
		}
	});
}
function dislike() {
	//获取请求参数
	var $li = $("#like_ul a.checked").parent();
	var likeID = $li.data("likeID");
	//发送ajax请求
	$.ajax({
		url:base_path+"/note/dislike.do",
		type:"post",
		dataType:"json",
		data:{"likeID":likeID},
		success:function(result){
			if (result.status == 0) {
				$li.remove();
				//清空预览
				clearPreview();
			}
			alert(result.msg);
		},
		error:function(){
			alert("加载笔记信息异常");
		}
	});
}
//删除笔记本
function deleteNotebook() {
	//获取请求参数
	var $li = $("#book_ul a.checked").parent();
	var bookID = $li.data("bookID");
	//发送ajax请求
	$.ajax({
		url:base_path+"/book/delete_notebook.do",
		type:"post",
		dataType:"json",
		data:{"bookID":bookID},
		success:function(result){
			if (result.status == 0) {
				//删除笔记本li元素
				$li.remove();
				//清空当前笔记列表
				$(".col-xs-3:visible .contacts-list").empty();
				if ($("#pc_part_3").is("visible")) {
					//清空编辑框
					$("#input_note_title").html("");
					um.setContent("");
				} else {
					//清空预览框
					clearPreview();
				}
			}
			alert(result.msg);
		},
		error:function(){
			alert("加载笔记信息异常");
		}
	});
}