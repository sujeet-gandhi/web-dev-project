package com.neu.onestopgo.utils;

import org.apache.lucene.search.Query;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;

import javax.persistence.EntityManager;

public class Utils {
    public static boolean IsNullOrEmpty(String data) {
        return data == null || data.length() == 0;
    }

    public static boolean IsNullOrEmpty(int data) {
        return data < 0;
    }

    // Inspiration from: https://mkyong.com/spring-boot/spring-boot-hibernate-search-example/
    public static javax.persistence.Query getSearchQuery(Class<?> entityClass, EntityManager entityManager, String searchTerm, String... fields) {
        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        QueryBuilder qb = fullTextEntityManager.getSearchFactory().buildQueryBuilder().forEntity(entityClass).get();
        Query luceneQuery = qb.keyword()
                .fuzzy()
                .withEditDistanceUpTo(1)
                .withPrefixLength(1)
                .onFields(fields)
                .matching(searchTerm)
                .createQuery();

        return fullTextEntityManager.createFullTextQuery(luceneQuery, entityClass);
    }

    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        long factor = (long) Math.pow(10, places);
        value = value * factor;
        long tmp = Math.round(value);
        return (double) tmp / factor;
    }

}
