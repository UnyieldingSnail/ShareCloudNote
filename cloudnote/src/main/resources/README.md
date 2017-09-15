## 登录功能
#### 发送ajax请求
- 发送时机：登录按钮的单击
- 请求参数：用户名和密码
- 请求地址：/user/login.do
- 提交类型：post

#### 服务器端处理
/user/login.do --> DispatcherServlet 
--> HandlerMapping
--> LoginController.execute(User user) 
--> UserService.checkLogin(User user) 
--> UserDao.findByName(String name) 
--> cn_user(查找) 
--> 返回json结果{"status":0,"msg":"xxx","data":xx}

## 注册功能
### 发送ajax请求
- 发送时机：注册按钮的单击
- 请求参数：用户名、昵称和密码
- 请求地址：/user/add.do
- 提交类型：post

###服务器端处理
/user/add.do --> DispatcherServlet 
--> HandlerMapping 
--> UserAddController.execute(User user) 
--> UserService.addUser(user) 
--> UserDao.save(User user) 
--> cn_user(插入) 
--> 返回json结果{"status":0,"msg":"xxx","data":xx}

## 笔记本列表显示
### 发送ajax请求
- 发送时机：页面载入后
- 请求参数：用户ID
- 请求地址：/book/showbooks.do
- 提交类型：post

### 服务端处理
/book/showbooks.do --> DispatcherServlet 
--> HandlerMapping 
--> ShowBooksController.execute(Session session) 
--> BookService.showBook(String cn_user_id) 
--> BookDao.findByUserID(String cn_user_id,)
--> cn_notebook(查询)
--> 返回json结果{"status":0,"msg":"xxx","data":xx}

## 笔记列表显示
### 发送ajax请求
- 发送时机：单击笔记本列表的li元素
- 请求参数：li元素上绑定的笔记本ID
- 请求地址：/note/shownotes.do
- 请求提交类型：post

### 服务器端处理
/note/shownotes.do
-->ShowNotesController.excute
-->NoteService.showNotes
-->NoteDao.findByBookID
-->cn_note(查询)
-->返回json结果{"status":0,"msg":"xxx","data":xx}

## 笔记显示
### 发送ajax请求
- 发送时机：点击笔记li元素
- 请求参数： li元素绑定的笔记ID
- 请求地址：/note/load.do
- 请求提交类型：post

### 服务器端处理
/note/load.do
-->LoadNoteController.execute(String noteID)
-->NoteService.loadNote(String noteID)
-->NoteDao.findByID(String noteID)
-->cn_note(查询)
-->返回json结果{"status":0,"msg":"xxx","data":xx}

## 保存笔记
### 发送ajax请求
- 发送时机：单击保存按钮
- 请求参数：li元素绑定的ID
- 请求地址：/note/update.do
- 请求提交类型：post

### 服务器端处理
/note/update.do
-->UpdateNoteController.execute(Note note)
-->NoteService.updateNote(Note note)
-->NoteDao.updateNote(Note note)
-->cn_note(更新)
-->返回json结果{"status":0,"msg":"xxx","data":xx}
更新笔记列表li元素的标题

## 创建笔记本
### 发送ajax请求
- 发送时机：单击创建按钮
- 请求参数：用户ID，笔记本名，笔记本类型
- 请求地址：/book/add.do
- 请求类型：post

### 服务器端处理
/book/add.do
-->AddBookController.execute
-->BookService.addBook
-->BookDao.save
-->cn_notebook
-->返回json结果

### ajax回调
解析返回的json结果
- 关闭对话框
- 在笔记本列表中添加一个li元素
- 提示创建笔记笨成功

## 创建笔记
### 发送ajax请求
- 发送时机：单击笔记创建按钮
- 请求参数：用户ID，笔记本ID，笔记标题,笔记类型
- 请求地址：/note/add.do
- 请求类型：post

### 服务器端处理
/note/add.do
-->AddNoteController.execute
-->NoteService.addNote
-->NoteDao.save
-->cn_note
-->返回json结果

### ajax回调
解析返回的json结果
- 关闭对话框
- 在笔记列表中添加一个li元素
- 提示创建笔记成功

## 保存笔记
### 发送ajax请求
- 发送时机：单击重命名笔记本按钮
- 请求参数：笔记本li元素绑定的ID，笔记本新名字
- 请求地址：/book/update.do
- 请求提交类型：post

### 服务器端处理
/book/update.do
-->RenameBookController.execute(String bookID, String bookName)
-->BookService.rename(String bookID, String bookName)
-->BookDao.rename(Notebook notebook)
-->cn_notebook(更新)
-->返回json结果{"status":0,"msg":"xxx","data":xx}
更新笔记本列表li元素的标题

## 笔记删除
### 发送ajax请求
- 发送时机：单击笔记菜单的x按钮，弹出删除对话框，单击删除按钮
- 请求参数：笔记ID
- 请求地址：/note/delete.do
- 请求类型：post

### 服务器端处理
/note/delete.do
-->DeleteNoteController.execute(String noteID)
-->NoteService.deleteNote(String noteID)
-->NoteDao.updateStatus(String noteID)
-->cn_note(更新)
更新笔记列表，关闭对话框

## 移动笔记
### 发送ajax请求
- 发送时机：单击"确定"移动笔记按钮
- 请求参数：目标笔记本ID,当前笔记ID
- 请求地址：/note/move.do
- 请求类型：post

### 服务器端处理
/note/move.do
-->MoveNoteController.execute(String bookID,String noteID)
-->NoteService.moveNote(String bookID,String noteID)
-->NoteDao.updateBookID(String bookID,String noteID)
-->cn_note(更新)

## 笔记分享
需求：用户点击分享按钮，客户端向服务端发送笔记ID，服务端根据笔记ID查询标题和内容，然后插入到cn_share表中
### 发送ajax请求
- 发送时机：点击分享按钮
- 请求参数：笔记ID
- 请求类型：post
- 请求地址：/note/share.do

### 服务器端处理
/note/share.do
-->ShareNoteController.execute(String noteID)
-->NoteService.shareNote(String noteID)
-->NoteDao.findByNoteID(String noteID)
-->NoteDao.updateStatus(String noteID) 将状态ID修改为"4"
-->ShareDao.save(Share share)
### 回调处理
给已分享笔记添加图标

## 搜索分享笔记
需求：输入搜索关键词，按回车键发送ajax请求，去cn_share表查询笔记，生成结果列表
### 发送ajax请求
- 发送时机：id为search_note的输入框发生回车事件
- 请求参数：输入框输入的关键字内容
- 请求地址：/note/search_share.do
- 提交类型：post

### 服务器端处理
/note/search_share.do
-->SearchShareNoteController.execute(String key)
-->NoteService.searchShare(String key)
-->ShareDao.findLikeKey(String key)
-->cn_share(模糊查询,cn_like和cn_share/cn_note做右连接操作)
### ajax回调处理
成功：解析返回的json结果，将查询的元素

## 显示分享预览笔记
### 发送ajax请求
- 发送时机：单击分享笔记
- 请求参数：分享笔记ID
- 提交地址：/note/load_share.do
- 提交类型：post

### 服务器处理
/note/load_share.do
-->LoadShareNoteController.execute(String shareID)
-->NoteService.loadShare(String shareID)
-->ShareDao.findByShareID(String shareID)
-->cn_share(查询)
### ajax回调处理
成功：解析返回的json结果，将查询的元素title和body添加到预览界面

## 显示回收站笔记
### 发送ajax请求
- 发送时机：单击回收站图标
- 请求参数：当前用户ID
- 提交地址：/note/recyclebin.do
- 请求类型：post

### 服务器处理
/note/recyclebin.do
-->RecycleBinController.execute(String userID)
-->NoteService.recycleBin(String userID)
-->NoteDao.findRecycleByUserID(String userID)
-->cn_note(查询)

## 加载回收站笔记信息
### 发送ajax请求
- 发送时机：单击回收站笔记li元素
- 请求参数：noteID
- 提交地址：/note/load_recycle_note.do
- 提交类型：post

### 服务器处理
/note/load_recycle_note.do
-->LoadRecycleNoteController.execute(String noteID)
-->NoteService.loadRecycle(String noteID)
-->NoteDao.findByNoteID(String noteID)
-->cn_note(查询)

## 恢复笔记
### 发送ajax请求
- 发送时机：单击"确认"恢复笔记按钮
- 请求参数：笔记ID，目标笔记本ID
- 提交地址：/note/replay_note.do
- 提交类型：post

### 服务端处理
/note/replay_note.do
-->ReplayNoteController.execute(Note note)
-->NoteService.replayNote(Note note)
-->NoteDao.updateStatusAndBookID(Note note)
-->cn_note(更新)

## 彻底删除笔记
### 发送ajax请求
- 发送时机：单击"确认"彻底删除笔记按钮
- 请求参数：笔记ID
- 提交地址：/note/delete_rollback.do
- 提交类型：post

### 服务端处理
/note/delete_rollback.do
-->DeleteRollbackController.execute(String noteID)
-->NoteService.deleteRollback(String noteID)
-->NoteDao.deleteByNoteID(String noteID)
-->cn_note(删除)

## 收藏笔记
### 发送ajax请求
- 发送时机：点击笔记li元素的收藏按钮
- 请求参数：shareID、userID
- 提交地址：/note/like.do
- 提交类型：post

### 服务端处理
/note/like.do
-->LikeNoteController.execute(Like like)
-->NoteService.like(Like like)
-->LikeDao.findByUserIDAndShareID(Like like);
-->LikeDao.insert(Like like)
-->cn_like(插入)

## 显示收藏笔记
### 发送ajax请求
- 发送时机：点击显示收藏笔记本按钮
- 请求参数：userID
- 提交地址：/note/show_like.do
- 提交类型：post

### 服务端处理
/note/show_like.do
-->ShowLikeNotesController.execute(String userID)
-->NoteService.showLike(String userID)
-->LikeDao.findByUserID(String userID)
-->cn_like/cn_share/cn_note

## 加载收藏笔记
### 发送ajax请求
- 发送时机：单击收藏笔记列表li元素
- 请求参数：likeID
- 提交地址：/note/load_like_note.do
- 提交类型：post

### 服务端处理
/note/load_like_note.do
-->LoadLikeNoteController.execute(String likeID)
-->NoteService.loadLike(String likeID)
-->LikeDao.findByLikeID(String likeID)
-->cn_like/cn_share/cn_note

## 取消收藏笔记
### 发送ajax请求
- 发送时机：单击确认取消收藏
- 请求参数：likeID
- 提交地址：/note/dislike.do
- 提交类型：post

### 服务端处理
/note/dislike.do
-->DislikeNoteController.execute(String likeID)
-->NoteService.dislike(String likeID)
-->LikeDao.deleteByLikeID(String likeID)
-->cn_like

## 删除笔记本
### 发送ajax请求
- 发送时机：单击确认彻底删除笔记本按钮
- 请求参数：bookID
- 提交地址：/note/delete_notebook.do
- 提交类型：post

### 服务端处理
/note/delete_notebook.do
-->DeleteNoteBookController.execute(String bookID)
-->BookService.deleteNoteBook(String bookID)
-->BookDao.deleteByBookID(String bookID)
-->cn_notebook(删除)