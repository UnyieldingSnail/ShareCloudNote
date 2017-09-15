package com.zhangyujie.cloudnote.controller.book;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhangyujie.cloudnote.service.BookService;
import com.zhangyujie.cloudnote.util.NoteResult;
@Controller
@RequestMapping("/book")
public class RenameBookController {
	@Resource(name="bookService")
	private BookService service;
	
	@RequestMapping("/rename.do")
	@ResponseBody
	public NoteResult execute(String bookID, String bookName) {
		NoteResult noteResult = service.rename(bookID,bookName);
		return noteResult;
	}
}
