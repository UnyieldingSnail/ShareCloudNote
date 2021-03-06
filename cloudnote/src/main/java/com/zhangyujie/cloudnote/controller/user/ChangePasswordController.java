package com.zhangyujie.cloudnote.controller.user;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhangyujie.cloudnote.entity.User;
import com.zhangyujie.cloudnote.service.UserService;
import com.zhangyujie.cloudnote.util.NoteResult;
@Controller
@RequestMapping("/user")
public class ChangePasswordController {

	@Resource(name="userService")
	private UserService us;
	
	@RequestMapping("/changepassword.do")
	@ResponseBody
	public NoteResult execute(User user){
		NoteResult note = us.changePassword(user);
		return note;
	}
}
