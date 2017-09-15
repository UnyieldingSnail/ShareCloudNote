package com.zhangyujie.cloudnote.service;

import com.zhangyujie.cloudnote.entity.User;
import com.zhangyujie.cloudnote.util.NoteResult;

public interface UserService {
	public NoteResult checkLogin(User user);
	public NoteResult addUser(User user);
	public NoteResult changePassword(User user);
}
