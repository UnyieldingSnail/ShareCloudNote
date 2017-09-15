package com.zhangyujie.cloudnote.controller.note;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhangyujie.cloudnote.service.NoteService;
import com.zhangyujie.cloudnote.util.NoteResult;
@Controller
@RequestMapping("/note")
public class UpdateNoteController {
	
	@Resource(name="noteService")
	private NoteService service;
	
	@RequestMapping("/update.do")
	@ResponseBody
	public NoteResult execute(String noteID, String title, String body) {
		return service.updateNote(noteID, title, body);
	}

}
