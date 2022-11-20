package com.neu.onestopgo.services;

import com.neu.onestopgo.models.Product;
import com.neu.onestopgo.repositories.ProductRepository;
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
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    private final EntityManager entityManager;

    @Autowired
    public ProductService(final EntityManagerFactory entityManagerFactory, ProductRepository productRepository) {
        this.productRepository = productRepository;
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

    public List<Product> getAllProducts() {
        return (List<Product>) productRepository.findAll();
    }

    public Product getProductById(UUID productId) {
        return productRepository.findById(productId).orElse(null);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    public List<Product> performProductSearch(String searchTerm) {
        List<Product> productList;
        try {
            productList = Utils.getSearchQuery(Product.class, entityManager, searchTerm, "name", "type").getResultList();
        } catch (NoResultException nre) {
            productList = new ArrayList<>();
        }

        return productList;
    }

}
