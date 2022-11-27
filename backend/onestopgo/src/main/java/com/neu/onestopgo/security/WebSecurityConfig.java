package com.neu.onestopgo.security;

import com.neu.onestopgo.constants.StringConstants;
import com.neu.onestopgo.models.PlainTextPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.HeaderWriterLogoutHandler;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter;
import org.springframework.security.web.session.HttpSessionEventPublisher;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

import java.io.IOException;

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

//        http.httpBasic().disable().authenticationEntryPoint((httpServletRequest, httpServletResponse, e) -> {
//            if (httpServletRequest.getServletPath().startsWith("/api/")) {
//                httpServletResponse.setStatus(403);
//            }
//        });
        http.httpBasic().disable().
                authorizeRequests()
                .antMatchers("/api/v1/home").permitAll()
                .antMatchers("/api/v1/search").permitAll()
                .antMatchers("/login/*").permitAll()
                .anyRequest().authenticated()
                .and().csrf().disable()
               .exceptionHandling()
                .and()
                .formLogin().permitAll()
                .successHandler((request, response, authentication) -> {
                    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                    String username = userDetails.getUsername();
                    HttpSession session = request.getSession(false);
                    session.setAttribute(StringConstants.LOGGED_IN_USER,username);
                    System.out.println("The user " + username + " has logged in.");
                    request.setAttribute("currentUser",username);
                   response.setStatus(HttpStatus.NO_CONTENT.value());
                    response.sendRedirect("/api/v1/login/success");
                })
                //.failureHandler((request, response, authentication) -> {response.sendRedirect("/api/v1/login/failure");})
              .and()
                .logout(logout -> logout
                        .logoutUrl("/csd/csdlogout")
                        .addLogoutHandler(new HeaderWriterLogoutHandler(new ClearSiteDataHeaderWriter(SOURCE)))
                .clearAuthentication(true).deleteCookies("JSESSIONID").invalidateHttpSession(true));
    }


}
