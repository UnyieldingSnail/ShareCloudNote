package com.zhangyujie.cloudnote.controller.note;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhangyujie.cloudnote.service.NoteService;
import com.zhangyujie.cloudnote.util.NoteResult;
@Controller
@RequestMapping("/note")
public class SearchShareNoteController {
	@Resource(name="noteService")
	private NoteService service;
	
	@RequestMapping("/search_share.do")
	@ResponseBody
	public NoteResult execute(String key,int page) {
		NoteResult noteResult = service.searchShare(key, page);
		return noteResult;
	}
}
