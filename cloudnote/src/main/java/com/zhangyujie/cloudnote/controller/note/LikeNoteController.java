package com.zhangyujie.cloudnote.controller.note;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhangyujie.cloudnote.entity.Like;
import com.zhangyujie.cloudnote.service.NoteService;
import com.zhangyujie.cloudnote.util.NoteResult;
@Controller
@RequestMapping("/note")
public class LikeNoteController {
	@Resource(name="noteService")
	private NoteService service;
	
	@RequestMapping("/like.do")
	@ResponseBody
	public NoteResult execute(Like like) {
		NoteResult noteResult = service.like(like);
		return noteResult;
	}
}
