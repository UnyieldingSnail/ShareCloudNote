package com.zhangyujie.cloudnote.dao;

import java.util.List;

import com.zhangyujie.cloudnote.entity.Notebook;


public interface BookDao {
	public List<Notebook> findByUserID(String id);
	public void save(Notebook notebook);
	public int rename(Notebook notebook);
	public void deleteByBookID(String bookID);
}
