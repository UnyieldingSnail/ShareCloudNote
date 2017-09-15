package test.repository;



import org.apache.commons.dbcp.BasicDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.Test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.zhangyujie.cloudnote.dao.UserDao;


public class TestCase {
	@Test
	public void test1() throws Exception {
		ApplicationContext ctx = new ClassPathXmlApplicationContext("conf/spring-*.xml");
		BasicDataSource s = ctx.getBean("ds", BasicDataSource.class);
		System.out.println(s.getConnection());
		SqlSessionFactory factory = ctx.getBean("ssf", SqlSessionFactory.class);
		System.out.println(factory);
		UserDao dao = ctx.getBean("userDao", UserDao.class);
		System.out.println(dao.findByName("zhouj"));
	}
}
