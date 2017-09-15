package test.service;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.zhangyujie.cloudnote.entity.User;
import com.zhangyujie.cloudnote.service.UserService;
import com.zhangyujie.cloudnote.util.NoteResult;
import com.zhangyujie.cloudnote.util.NoteUtil;

public class TestCase {
	private ApplicationContext ctx;
	@Before
	public void init() {
		ctx = new ClassPathXmlApplicationContext("conf/spring-*.xml");
	}
	@Test
	public void testLogin() {
		
		UserService ser = ctx.getBean("userService", UserService.class);
		User user = new User();
		user.setCn_user_name("zhou");
		user.setCn_user_password("1111");
		NoteResult note = ser.checkLogin(user);
		System.out.println(note);
	}
	@Test
	public void testRegister() {
		UserService ser = ctx.getBean("userService", UserService.class);
		User user = new User();
		user.setCn_user_id(NoteUtil.createID());
		user.setCn_user_name("zhouyujie");
		user.setCn_user_password("123456");
		NoteResult note = ser.addUser(user);
		System.out.println(note);
	}
}
