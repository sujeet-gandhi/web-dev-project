package com.neu.onestopgo.security.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<SessionFilter> loggingFilter(){
        FilterRegistrationBean<SessionFilter> registrationBean
                = new FilterRegistrationBean<>();

        registrationBean.setFilter(new SessionFilter());
        registrationBean.addUrlPatterns("/logout");
        registrationBean.setOrder(1);

        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> loggingInFilter(){
        FilterRegistrationBean<CorsFilter> registrationBean
                = new FilterRegistrationBean<>();

        registrationBean.setFilter(new CorsFilter());
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(0);

        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<CookieFilter> cookie(){
        FilterRegistrationBean<CookieFilter> registrationBean
                = new FilterRegistrationBean<>();

        registrationBean.setFilter(new CookieFilter());
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(2);

        return registrationBean;
    }
}
