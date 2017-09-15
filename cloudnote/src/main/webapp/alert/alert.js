/*alert.js 封装对话框处理*/
//弹出创建笔记本对话框
function alertAddBookWindow() {
	$("#can").load("alert/alert_notebook.html");
	$(".opacity_bg").show();
}
//弹出重命名笔记本对话框
function alertRenameBookWindow() {
	$("#can").load("alert/alert_rename.html");
	$(".opacity_bg").show();
}
//弹出创建笔记对话框
function alertAddNoteWindow() {
	$("#can").load("alert/alert_note.html");
	$(".opacity_bg").show();
}
//弹出删除笔记对话框
function alertDeleteNoteWindow() {
	$("#can").load("alert/alert_delete_note.html");
	$(".opacity_bg").show();
}
//关闭对话框
function closeAlertWindow() {
	//关闭操作
	$("#can").empty();//清空对话框内容
	$(".opacity_bg").hide();//隐藏背景
}
function checkAlertAddNoteWindow() {
	var $book = $("#book_ul a.checked").parent();
	if ($book.length == 0) {
		alert("请先选择笔记本");
	} else {
		alertAddNoteWindow();
	}
}
//弹出移动笔记对话框
function alertMoveNoteWindow() {
	$("#can").load("alert/alert_move.html", function() {
		//给移动笔记对话框的下拉选项框添加数据
		var books = $("#book_ul li");
		for (var i = 0; i < books.length; i++) {
			var $book = $(books[i]);
			var bookID = $book.data("bookID");
			var bookName = $book.find("span").html().trim();
			var item = "<option value='" + bookID + "'>" + bookName + "</option>";
			//将option添加到select中
			$("#moveSelect").append(item);
		}
	});
	$(".opacity_bg").show();
}
//弹出恢复笔记对话框
function alertReplayNoteWindow() {
	$("#can").load("alert/alert_replay.html", function() {
		//给移动笔记对话框的下拉选项框添加数据
		var books = $("#book_ul li");
		for (var i = 0; i < books.length; i++) {
			var $book = $(books[i]);
			var bookID = $book.data("bookID");
			var bookName = $book.find("span").html().trim();
			var item = "<option value='" + bookID + "'>" + bookName + "</option>";
			//将option添加到select中
			$("#replaySelect").append(item);
		}
	});
	$(".opacity_bg").show();
}
function alertDeleteRollbackWindow() {
	$("#can").load("alert/alert_delete_rollback.html");
	$(".opacity_bg").show();
}
function alertLikeNoteWindow() {
	$("#can").load("alert/alert_like.html");
	$(".opacity_bg").show();
}
function alertDislikeNoteWindow() {
	$("#can").load("alert/alert_delete_like.html");
	$(".opacity_bg").show();
}
function alertDeleteNoteBookWindow() {
	$("#can").load("alert/alert_delete_notebook.html");
	$(".opacity_bg").show();
}