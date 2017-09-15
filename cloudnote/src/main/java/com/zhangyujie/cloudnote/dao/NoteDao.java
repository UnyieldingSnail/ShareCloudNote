package com.zhangyujie.cloudnote.dao;

import java.util.List;
import java.util.Map;

import com.zhangyujie.cloudnote.entity.Note;

public interface NoteDao {
	public List<Map> findNotRecycleByBookID(String bookID);
	public Note findNotRecycleByNoteID(String noteID);
	public int updateNote(Note note);
	public void save(Note note);
	public int updateStatus(Note note);
	public int updateBookID(Note note);
	public List<Map> findRecycleByUserID(String userID);
	public Note findByNoteID(String noteID);
	public int updateStatusAndBookID(Note note);
	public void deleteByNoteID(String noteID);
}
