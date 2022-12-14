package com.neu.onestopgo.services;

import com.neu.onestopgo.models.Store;
import com.neu.onestopgo.repositories.StoreRepository;
import com.neu.onestopgo.utils.Utils;

import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;

import java.util.ArrayList;
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

  @PostConstruct
  public void initializeHibernateSearch() {
    try {
      FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
      fullTextEntityManager.createIndexer().startAndWait();
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
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

  @Transactional
  public List<Store> performStoreSearch(String searchTerm) {
    List<Store> storeList;
    try {
      storeList = Utils.getSearchQuery(Store.class, entityManager, searchTerm, "name", "type").getResultList();
    } catch (NoResultException nre) {
      storeList = new ArrayList<>();
    }
    return storeList;
  }

}
