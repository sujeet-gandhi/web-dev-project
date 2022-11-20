package com.neu.onestopgo.services;

import com.neu.onestopgo.models.Category;
import com.neu.onestopgo.repositories.CategoryRepository;
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
public class CategoryService {

    private final CategoryRepository categoryRepository;

    private final EntityManager entityManager;

    @Autowired
    public CategoryService(final EntityManagerFactory entityManagerFactory, CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
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

    public List<Category> getAllCategories() {
        return (List<Category>) categoryRepository.findAll();
    }

    public Category getCategoryById(int categoryId) {
        return categoryRepository.findById(categoryId).orElse(null);
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Transactional
    public List<Category> performCategorySearch(String searchTerm) {
        List<Category> categoryList;
        try {
            categoryList = Utils.getSearchQuery(Category.class, entityManager, searchTerm, "name").getResultList();
        } catch (NoResultException nre) {
            categoryList = new ArrayList<>();
        }
        return categoryList;
    }

}
