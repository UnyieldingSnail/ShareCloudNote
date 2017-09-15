package com.zhangyujie.cloudnote.util;
/**
 * 自定义异常
 * @author zhangyujie
 *
 */
public class NoteException extends RuntimeException {

	public NoteException(String message, Throwable cause) {
		super(message, cause);
	}
	public NoteException(Throwable cause) {
		super(cause);
	}
	public NoteException(String message) {
		super(message);
	}
	
}
