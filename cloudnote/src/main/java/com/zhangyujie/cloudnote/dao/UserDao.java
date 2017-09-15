package com.zhangyujie.cloudnote.dao;

import com.zhangyujie.cloudnote.entity.User;

public interface UserDao {
	public User findByName(String name);
	public void save(User user);
	public int updatePassword(User user);
}
