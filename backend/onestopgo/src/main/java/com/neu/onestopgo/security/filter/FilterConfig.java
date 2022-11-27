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
}
