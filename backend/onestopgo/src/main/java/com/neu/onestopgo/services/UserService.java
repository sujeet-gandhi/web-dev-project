package com.neu.onestopgo.services;

import com.neu.onestopgo.dao.UserDAO;
import com.neu.onestopgo.models.Store;
import com.neu.onestopgo.models.User;
import com.neu.onestopgo.repositories.UserRepository;
import com.neu.onestopgo.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final StoreService storeService;

    @Autowired
    public UserService(UserRepository userRepository, StoreService storeService) {
        this.userRepository = userRepository;
        this.storeService = storeService;
    }

    public User getUserFromId(int userId) {
        return userRepository.findById(userId).orElseThrow();
    }

    public User createNewUser(UserDAO userDAO) {
        User newUser = userDAO.getModelFromDao();
        newUser.setType("CUSTOMER");
        return userRepository.save(newUser);
    }

    public User createNewStoreAdmin(UserDAO userDAO) throws Exception {
        User newUser = userDAO.getModelFromDao();
        newUser.setType("STORE_ADMIN");
        if (Utils.IsNullOrEmpty(userDAO.getStoreId())) {
            throw new Exception("empty store id");
        }
        Store store = storeService.getStoreById(userDAO.getStoreId());
        if (store == null) {
            throw new Exception("invalid store id");
        }
        newUser.setStore(store);
        return userRepository.save(newUser);
    }
}
