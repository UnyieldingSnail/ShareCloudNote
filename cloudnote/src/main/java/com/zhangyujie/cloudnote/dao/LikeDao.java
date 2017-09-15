package com.zhangyujie.cloudnote.dao;

import java.util.List;
import java.util.Map;

import com.zhangyujie.cloudnote.entity.Like;

public interface LikeDao {
	public void save(Like like);
	public Like findByUserIDAndShareID(Like like);
	public List<Map> findByUserID(String userID);
	public Map findByLikeID(String likeID);
	public void deleteByLikeID(String likeID);
}
