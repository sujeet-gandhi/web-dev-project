package com.neu.onestopgo.repositories;

import com.neu.onestopgo.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {}
