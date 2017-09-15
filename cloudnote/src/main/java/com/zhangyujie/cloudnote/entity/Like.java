package com.zhangyujie.cloudnote.entity;

import java.io.Serializable;

public class Like implements Serializable{
	private String cn_like_id;
	private String cn_share_id;
	private String cn_user_id;
	
	public Like() {
		super();
	}
	public String getCn_like_id() {
		return cn_like_id;
	}
	public void setCn_like_id(String cn_like_id) {
		this.cn_like_id = cn_like_id;
	}
	public String getCn_share_id() {
		return cn_share_id;
	}
	public void setCn_share_id(String cn_share_id) {
		this.cn_share_id = cn_share_id;
	}
	public String getCn_user_id() {
		return cn_user_id;
	}
	public void setCn_user_id(String cn_user_id) {
		this.cn_user_id = cn_user_id;
	}
	@Override
	public String toString() {
		return "Like [cn_like_id=" + cn_like_id + ", cn_share_id=" + cn_share_id + ", cn_user_id=" + cn_user_id + "]";
	}
	
}
