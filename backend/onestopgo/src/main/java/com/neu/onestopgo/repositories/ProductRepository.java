package com.neu.onestopgo.repositories;

import com.neu.onestopgo.models.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Integer> {}
