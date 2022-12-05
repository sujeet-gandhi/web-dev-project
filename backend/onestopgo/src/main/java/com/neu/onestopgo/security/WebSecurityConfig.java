package com.neu.onestopgo.security;

import com.neu.onestopgo.constants.StringConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.HeaderWriterLogoutHandler;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter;
import org.springframework.security.web.session.HttpSessionEventPublisher;

import javax.servlet.http.HttpSession;
import javax.sql.DataSource;
import static org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter.Directive.*;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private static final ClearSiteDataHeaderWriter.Directive[] SOURCE =
            {CACHE, COOKIES, STORAGE, EXECUTION_CONTEXTS};
    @Autowired
    private DataSource dataSource;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PlainTextPasswordEncoder.getInstance();
    }

    @Bean
    public static ServletListenerRegistrationBean httpSessionEventPublisher() {
        return new ServletListenerRegistrationBean(new HttpSessionEventPublisher());
    }
    @Autowired
    public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().passwordEncoder(new BCryptPasswordEncoder())
                .dataSource(dataSource)
                .usersByUsernameQuery("select email, password, enabled from user where email=?").passwordEncoder(PlainTextPasswordEncoder.getInstance());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                .authorizeRequests()
                .antMatchers("/api/v1/home").permitAll()
                .antMatchers("/api/v1/search").permitAll()
                .antMatchers("/api/v1/login/cookie").permitAll()
                .antMatchers("/api/v1/signup").permitAll()
                .antMatchers("/login/*").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/api/v1/user").permitAll()
                .antMatchers("/api/v1/category/").access("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
                .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .anyRequest().authenticated()
                .and().csrf().disable()
                .formLogin().permitAll()
                .successHandler((request, response, authentication) -> {
                    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                    String username = userDetails.getUsername();
                    HttpSession session = request.getSession(false);
                    if(session!=null) {
                        session.setAttribute(StringConstants.LOGGED_IN_USER, username);
                    }
                    System.out.println("The user " + username + " has logged in.");
                   response.setStatus(HttpStatus.NO_CONTENT.value());
                   response.addHeader("username",username);
                })
              .and()
                .logout(logout -> logout
                        .logoutUrl("/csd/csdlogout")
                        .addLogoutHandler(new HeaderWriterLogoutHandler(new ClearSiteDataHeaderWriter(SOURCE)))
                .clearAuthentication(true).deleteCookies("JSESSIONID").invalidateHttpSession(true).logoutSuccessHandler((request, response, authentication) -> {
                    response.setHeader("username",null);
                        }));
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
            .ignoring()
            .antMatchers("/images/**");
    }
}
