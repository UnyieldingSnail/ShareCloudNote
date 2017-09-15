package com.zhangyujie.cloudnote.controller.user;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhangyujie.cloudnote.entity.User;
import com.zhangyujie.cloudnote.service.UserService;
import com.zhangyujie.cloudnote.util.NoteResult;

@Controller
@RequestMapping("/user")
public class LoginController {
	
	@Resource(name="userService")
	private UserService us;
	
	@RequestMapping("/login.do")
	@ResponseBody
	public NoteResult execute(User user){
		NoteResult note = us.checkLogin(user);
		return note;
	}
}
