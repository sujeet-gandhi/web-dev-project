package com.neu.onestopgo.repositories;

import com.neu.onestopgo.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {

    public User findUserByEmail(String email) ;
}
