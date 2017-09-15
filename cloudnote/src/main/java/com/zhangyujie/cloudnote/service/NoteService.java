package com.zhangyujie.cloudnote.service;

import com.zhangyujie.cloudnote.entity.Like;
import com.zhangyujie.cloudnote.entity.Note;
import com.zhangyujie.cloudnote.util.NoteResult;

public interface NoteService {
	public NoteResult showNotes(String bookID);
	public NoteResult load(String noteID);
	public NoteResult updateNote(String noteID, String title, String body);
	public NoteResult addNote(String userID,String noteTitle, String bookID,String noteType,String noteStatus);
	public NoteResult deleteNote(Note note);
	public NoteResult moveNote(Note note);
	public NoteResult shareNote(String noteID);
	public NoteResult searchShare(String key, int page);
	public NoteResult loadShare(String shareID);
	public NoteResult recycleBin(String userID);
	public NoteResult loadRecycle(String noteID);
	public NoteResult replayNote(Note note);
	public NoteResult deleteRollback(String noteID);
	public NoteResult like(Like like);
	public NoteResult showLike(String userID);
	public NoteResult loadLike(String likeID);
	public NoteResult dislike(String likeID);
}
