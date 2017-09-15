package com.zhangyujie.cloudnote.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import org.apache.commons.codec.binary.Base64;


public class NoteUtil {
	/**
	 * 将传入的字符串加密处理
	 * @param data
	 * 		明文字符串
	 * @return
	 * 		加密后的字符串
	 * @throws Exception 
	 */
	public static String md5(String msg) {
		//将输入信息利用MD5处理
		MessageDigest md = null;
		try {
			md = MessageDigest.getInstance("MD5");//SHA
		} catch (NoSuchAlgorithmException e) {
			throw new NoteException(e);
		}
		byte[] out = md.digest(msg.getBytes());
		//将MD5处理结果利用Base64转成字符串
		return Base64.encodeBase64String(out);
	}
	/**
	 * 
	 * @return
	 */
	public static String createID() {
		UUID uuid = UUID.randomUUID();
		return uuid.toString().replace("-", "");
	}
	
	public static void main(String[] args) {
		System.out.println(createID());
	}
}
