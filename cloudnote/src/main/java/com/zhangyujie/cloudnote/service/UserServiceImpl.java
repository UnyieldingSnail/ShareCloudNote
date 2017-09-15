package com.zhangyujie.cloudnote.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.zhangyujie.cloudnote.dao.UserDao;
import com.zhangyujie.cloudnote.entity.User;
import com.zhangyujie.cloudnote.exception.ApplicationException;
import com.zhangyujie.cloudnote.util.NoteException;
import com.zhangyujie.cloudnote.util.NoteResult;
import com.zhangyujie.cloudnote.util.NoteUtil;

@Service("userService")
public class UserServiceImpl implements UserService {
	
	@Resource(name="userDao")
	private UserDao dao;
	
	public NoteResult checkLogin(User user) {
		User findUser = dao.findByName(user.getCn_user_name());
		NoteResult note = new NoteResult();
		String MD5Password = NoteUtil.md5(user.getCn_user_password());
		
		if (findUser == null) {
			note.setStatus(1);
			note.setMsg("用户名错误！");
		} else if(!MD5Password.equals(findUser.getCn_user_password())){
			note.setStatus(2);
			note.setMsg("密码错误！");
		} else {
			note.setStatus(0);
			note.setMsg("登陆成功！");
			findUser.setCn_user_password("");
			note.setData(findUser);
		}
		return note;
	}

	public NoteResult addUser(User user) {
		String md5Pwd = NoteUtil.md5(user.getCn_user_password());
		NoteResult result = new NoteResult();
		try {
			//检测是否重名
			User findUser = dao.findByName(user.getCn_user_name());
			if (findUser != null) {
				result.setStatus(1);
				result.setMsg("用户名已被占用！");
				return result;
			}
			//执行用户注册
			user.setCn_user_id(NoteUtil.createID());
			user.setCn_user_password(md5Pwd);
			dao.save(user);
			//创建返回结果
			result.setStatus(0);
			result.setMsg("注册成功！");
			return result;
		} catch(Exception e) {
//			e.printStackTrace();
			throw new NoteException("用户注册异常！");
		}
	}

	public NoteResult changePassword(User user) {
		//将密码用MD5加密
		String md5Pwd = NoteUtil.md5(user.getCn_user_password());
		user.setCn_user_password(md5Pwd);
		//创建返回结果
		NoteResult noteResult = new NoteResult();
		int rows = dao.updatePassword(user);
		if (rows == 1) {
			noteResult.setStatus(0);
			noteResult.setMsg("修改密码成功，跳转至登录页面");
		} else {
			noteResult.setStatus(1);
			noteResult.setMsg("修改密码异常");
		}
		return noteResult;
	}

}
