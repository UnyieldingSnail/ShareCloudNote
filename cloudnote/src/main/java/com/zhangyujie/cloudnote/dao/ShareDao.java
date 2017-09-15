package com.zhangyujie.cloudnote.dao;

import java.util.List;
import java.util.Map;

import com.zhangyujie.cloudnote.entity.Note;
import com.zhangyujie.cloudnote.entity.Share;

public interface ShareDao {
	public void save(Share share);
	public List<Map> findLikeTitle(Map<String, Object> map);
	public Share findByShareID(String shareID);
}
