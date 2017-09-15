package com.zhangyujie.cloudnote.controller.note;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhangyujie.cloudnote.service.NoteService;
import com.zhangyujie.cloudnote.util.NoteResult;
@Controller
@RequestMapping("/note")
public class AddNoteController {
	@Resource(name="noteService")
	private NoteService service;
	
	@RequestMapping("/add.do")
	@ResponseBody
	public NoteResult execute(String userID,String noteTitle,String bookID,String noteType,String noteStatus) {
		NoteResult noteResult = service.addNote(userID, noteTitle, bookID, noteType, noteStatus);
		return noteResult;
	}
}
