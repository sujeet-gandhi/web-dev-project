package com.neu.onestopgo.services;

import com.neu.onestopgo.models.Store;
import com.neu.onestopgo.repositories.StoreRepository;
import org.apache.lucene.search.Query;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import java.util.List;

@Service
public class StoreService {

    private final StoreRepository storeRepository;

    private final EntityManager entityManager;

    @Autowired
    public StoreService(final EntityManagerFactory entityManagerFactory, StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
        this.entityManager = entityManagerFactory.createEntityManager();
    }

    public List<Store> getAllStores() {
        return (List<Store>) storeRepository.findAll();
    }

    public Store getStoreById(int storeId) {
        return storeRepository.findById(storeId).orElse(null);
    }

    public Store createStore(Store store) {
        return storeRepository.save(store);
    }

    public List<Store> performStoreSearch(String searchTerm) {
        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        QueryBuilder qb = fullTextEntityManager.getSearchFactory().buildQueryBuilder().forEntity(Store.class).get();
        Query luceneQuery = qb.keyword()
                .fuzzy()
                .withEditDistanceUpTo(1)
                .withPrefixLength(1)
                .onFields("name")
                .matching(searchTerm)
                .createQuery();

        javax.persistence.Query jpaQuery = fullTextEntityManager.createFullTextQuery(luceneQuery, Store.class);

        // execute search

        List<Store> storeList = null;
        try {
            storeList = jpaQuery.getResultList();
        } catch (NoResultException nre) {
            ;// do nothing
        }

        return storeList;
    }

}
