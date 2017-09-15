package com.zhangyujie.cloudnote.service;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.zhangyujie.cloudnote.dao.BookDao;
import com.zhangyujie.cloudnote.entity.Notebook;
import com.zhangyujie.cloudnote.util.NoteResult;
import com.zhangyujie.cloudnote.util.NoteUtil;

@Service("bookService")
public class BookServiceImpl implements BookService {
	
	@Resource(name="bookDao")
	private BookDao bookDao;
	
	public NoteResult showBooks(String id) {
		List<Notebook> notebooks = bookDao.findByUserID(id);
		NoteResult noteResult = new NoteResult();
		noteResult.setStatus(0);
		noteResult.setMsg("查询完毕");
		noteResult.setData(notebooks);
		return noteResult;
		
	}

	public NoteResult addBook(String userID, String typeID, String bookName) {
		//创建笔记本ID
		String bookID = NoteUtil.createID();
		//创建笔记本时间
		Timestamp createTime = new Timestamp(System.currentTimeMillis());
		Notebook book = new Notebook();
		book.setCn_notebook_id(bookID);
		book.setCn_notebook_type_id(typeID);
		book.setCn_notebook_name(bookName);
		book.setCn_user_id(userID);
		book.setCn_notebook_createtime(createTime);
		bookDao.save(book);
		//封装返回结果
		NoteResult noteResult = new NoteResult();
		noteResult.setStatus(0);
		noteResult.setMsg("创建笔记本成功");
		noteResult.setData(bookID);
		return noteResult;
	}

	public NoteResult rename(String bookID, String bookName) {
		Notebook notebook = new Notebook();
		notebook.setCn_notebook_id(bookID);
		notebook.setCn_notebook_name(bookName);
		int rows = bookDao.rename(notebook);
		NoteResult noteResult = new NoteResult();
		if (rows == 1) {
			noteResult.setStatus(0);
			noteResult.setMsg("重命名笔记本成功");
		} else {
			noteResult.setStatus(1);
			noteResult.setMsg("重命名笔记本异常");
		}
		return noteResult;
	}

	public NoteResult deleteNoteBook(String bookID) {
		bookDao.deleteByBookID(bookID);
		NoteResult noteResult = new NoteResult();
		noteResult.setStatus(0);
		noteResult.setMsg("删除笔记本成功");
		return noteResult;
	}

}
