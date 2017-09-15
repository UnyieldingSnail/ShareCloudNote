package com.zhangyujie.cloudnote.service;

import com.zhangyujie.cloudnote.util.NoteResult;

public interface BookService {
	public NoteResult showBooks(String id);
	public NoteResult addBook(String userID,String typeID, String bookName);
	public NoteResult rename(String bookID, String bookName);
	public NoteResult deleteNoteBook(String bookID);
	
}
