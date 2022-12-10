package com.neu.onestopgo.repositories;

import com.neu.onestopgo.models.Category;

import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Integer> {
  public boolean existsByName(String name);
}
