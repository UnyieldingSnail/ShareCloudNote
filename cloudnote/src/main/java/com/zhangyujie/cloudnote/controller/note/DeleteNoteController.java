package com.zhangyujie.cloudnote.controller.note;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhangyujie.cloudnote.entity.Note;
import com.zhangyujie.cloudnote.service.NoteService;
import com.zhangyujie.cloudnote.util.NoteResult;
@Controller
@RequestMapping("/note")
public class DeleteNoteController {
	@Resource(name="noteService")
	private NoteService service;
	
	@RequestMapping("/delete.do")
	@ResponseBody
	public NoteResult execute(Note note) {
		NoteResult noteResult = service.deleteNote(note);
		return noteResult;
	}
}
