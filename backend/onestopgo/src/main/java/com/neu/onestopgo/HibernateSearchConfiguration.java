package com.neu.onestopgo;

import com.neu.onestopgo.services.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;

@EnableAutoConfiguration
@Configuration
public class HibernateSearchConfiguration {

    private final EntityManager bentityManager;

    @Autowired
    public HibernateSearchConfiguration(EntityManager bentityManager) {
        this.bentityManager = bentityManager;
    }

    @Bean
    SearchService searchService() {
        SearchService searchService = new SearchService(bentityManager);
        searchService.initializeHibernateSearch();
        return searchService;
    }
}
