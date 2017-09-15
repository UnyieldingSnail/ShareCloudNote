package com.zhangyujie.cloudnote.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.dao.support.DaoSupport;
import org.springframework.stereotype.Service;

import com.zhangyujie.cloudnote.dao.LikeDao;
import com.zhangyujie.cloudnote.dao.NoteDao;
import com.zhangyujie.cloudnote.dao.ShareDao;
import com.zhangyujie.cloudnote.entity.Like;
import com.zhangyujie.cloudnote.entity.Note;
import com.zhangyujie.cloudnote.entity.Share;
import com.zhangyujie.cloudnote.util.NoteResult;
import com.zhangyujie.cloudnote.util.NoteUtil;
@Service("noteService")
public class NoteServiceImpl implements NoteService {
	
	@Resource(name="shareDao")
	private ShareDao shareDao;
	
	@Resource(name="noteDao")
	private NoteDao noteDao;
	
	@Resource(name="likeDao")
	private LikeDao likeDao;
	
	public NoteResult showNotes(String bookID) {
		List<Map> notes = noteDao.findNotRecycleByBookID(bookID);
		NoteResult noteResult = new NoteResult();
		noteResult.setStatus(0);
		noteResult.setMsg("查询完毕");
		noteResult.setData(notes);
		return noteResult;
	}
	public NoteResult load(String noteID) {
		Note note = noteDao.findNotRecycleByNoteID(noteID);
		NoteResult noteResult = new NoteResult();
		noteResult.setStatus(0);
		noteResult.setMsg("查询完毕");
		noteResult.setData(note);
		return noteResult;
	}
	public NoteResult updateNote(String noteID, String title, String body) {
		Note note = new Note();
		note.setCn_note_id(noteID);
		note.setCn_note_title(title);
		note.setCn_note_body(body);
		note.setCn_note_last_modify_time(System.currentTimeMillis());
		int rows = noteDao.updateNote(note);
		NoteResult result = new NoteResult();
		if (rows == 1) {
			result.setStatus(0);
			result.setMsg("保存成功");
		} else {
			result.setStatus(1);
			result.setMsg("保存失败");
		}
		return result;
	}
	public NoteResult addNote(String userID, String noteTitle, String bookID, String noteType, String noteStatus) {
		String noteID = NoteUtil.createID();
		long createTime = System.currentTimeMillis();
		Note note = new Note();
		note.setCn_note_id(noteID);
		note.setCn_user_id(userID);
		note.setCn_note_create_time(createTime);
		note.setCn_note_title(noteTitle);
		note.setCn_note_type_id(noteType);
		note.setCn_notebook_id(bookID);
		note.setCn_note_status_id(noteStatus);
		noteDao.save(note);
		
		NoteResult noteResult = new NoteResult();
		noteResult.setStatus(0);
		noteResult.setMsg("创建笔记成功");
		noteResult.setData(noteID);
		return noteResult;
	}
	public NoteResult deleteNote(Note note) {
		//将笔记状态设置为删除
		note.setCn_note_status_id("2");
		//更新笔记状态
		int rows = noteDao.updateStatus(note);
		NoteResult noteResult = new NoteResult();
		if (rows == 1) {
			noteResult.setStatus(0);
			noteResult.setMsg("删除笔记成功");
		} else {
			noteResult.setStatus(1);
			noteResult.setMsg("删除笔记异常");
		}
		return noteResult;
	}
	public NoteResult moveNote(Note note) {
		int rows = noteDao.updateBookID(note);
		NoteResult noteResult = new NoteResult();
		if (rows == 1) {
			noteResult.setStatus(0);
			noteResult.setMsg("移动笔记成功");
		} else {
			noteResult.setStatus(1);
			noteResult.setMsg("移动笔记异常");
		}
		return noteResult;
	}
	public NoteResult shareNote(String noteID) {
		//查询笔记信息
		Note note = noteDao.findByNoteID(noteID);
		String noteStatus = note.getCn_note_status_id();
		NoteResult noteResult = new NoteResult();
		if (!"4".equals(noteStatus)) {
			//修改笔记状态
			note.setCn_note_status_id("4");
			note.setCn_note_id(noteID);
			noteDao.updateStatus(note);
			//插入分享笔记
			String shareID = NoteUtil.createID();
			Share share = new Share();
			share.setCn_note_id(note.getCn_note_id());
			share.setCn_share_id(shareID);
			share.setCn_share_title(note.getCn_note_title());
			share.setCn_share_body(note.getCn_note_body());
			shareDao.save(share);
			noteResult.setStatus(0);
			noteResult.setMsg("分享笔记成功");
		} else {
			noteResult.setStatus(1);
			noteResult.setMsg("笔记已分享");
		}
		return noteResult;
	}
	public NoteResult searchShare(String key, int page) {
		Map<String, Object> map = new HashMap<String, Object>();
		//处理查询条件
		String title = "%";
		if (key != null && !"".equals(key)) {
			title = "%" + key + "%";
		}
		if (page < 1) {
			page = 1;
		}
		int begin = (page-1) * 5;
		map.put("key", title);
		map.put("begin", begin);
		List<Map> shares = shareDao.findLikeTitle(map);
		//封装NoteResult
		NoteResult noteResult = new NoteResult();
		if (shares.isEmpty()) {
			noteResult.setStatus(1);
			noteResult.setMsg("未查询到相关笔记");
		} else {
			noteResult.setStatus(0);
			noteResult.setMsg("查询成功");
			noteResult.setData(shares);
		}
		return noteResult;
	}
	public NoteResult loadShare(String shareID) {
		NoteResult noteResult = new NoteResult();
		Share share = shareDao.findByShareID(shareID);
		noteResult.setStatus(0);
		noteResult.setMsg("加载分享笔记成功");
		noteResult.setData(share);
		return noteResult;
	}
	public NoteResult recycleBin(String userID) {
		List<Map> notes = noteDao.findRecycleByUserID(userID);
		NoteResult noteResult = new NoteResult();
		if (notes != null) {
			noteResult.setStatus(0);
			noteResult.setMsg("查询回收站笔记成功");
			noteResult.setData(notes);
		} else {
			noteResult.setStatus(1);
			noteResult.setMsg("查询回收站笔记异常");
		}
		return noteResult;
	}
	public NoteResult loadRecycle(String noteID) {
		Note note = noteDao.findByNoteID(noteID);
		NoteResult noteResult = new NoteResult();
		if (note != null) {
			noteResult.setStatus(0);
			noteResult.setMsg("加载笔记成功");
			noteResult.setData(note);
		} else {
			noteResult.setStatus(1);
			noteResult.setMsg("加载笔记异常");
		}
		return noteResult;
	}
	public NoteResult replayNote(Note note) {
		int rows = noteDao.updateStatusAndBookID(note);
		NoteResult noteResult = new NoteResult();
		if (rows == 1) {
			noteResult.setStatus(0);
			noteResult.setMsg("恢复笔记成功");
		} else {
			noteResult.setStatus(1);
			noteResult.setMsg("恢复笔记异常");
		}
		return noteResult;
	}
	public NoteResult deleteRollback(String noteID) {
		noteDao.deleteByNoteID(noteID);
		NoteResult noteResult = new NoteResult();
		noteResult.setStatus(0);
		noteResult.setMsg("彻底删除笔记成功");
		return noteResult;
	}
	public NoteResult like(Like like) {
		Like temp = likeDao.findByUserIDAndShareID(like);
		NoteResult noteResult = new NoteResult();
		if (temp == null) {
			String likeID = NoteUtil.createID();
			like.setCn_like_id(likeID);
			likeDao.save(like);
			noteResult.setStatus(0);
			noteResult.setMsg("收藏笔记成功");
		} else {
			noteResult.setStatus(1);
			noteResult.setMsg("请不要重复收藏");
		}
		return noteResult;
	}
	public NoteResult showLike(String userID) {
		List<Map> notes = likeDao.findByUserID(userID);
		NoteResult noteResult = new NoteResult();
		if (notes != null) {
			noteResult.setStatus(0);
			noteResult.setMsg("显示收藏笔记成功");
			noteResult.setData(notes);
		} else {
			noteResult.setStatus(1);
			noteResult.setMsg("显示收藏笔记异常");
		}
		return noteResult;
	}
	public NoteResult loadLike(String likeID) {
		Map note = likeDao.findByLikeID(likeID);
		NoteResult noteResult = new NoteResult();
		if (note == null) {
			noteResult.setStatus(1);
			noteResult.setMsg("加载收藏笔记异常");
		} else {
			noteResult.setStatus(0);
			noteResult.setMsg("加载收藏笔记成功");
			noteResult.setData(note);
		}
		return noteResult;
	}
	public NoteResult dislike(String likeID) {
		likeDao.deleteByLikeID(likeID);
		NoteResult noteResult = new NoteResult();
		noteResult.setStatus(0);
		noteResult.setMsg("取消收藏笔记成功");
		return noteResult;
	}
}
