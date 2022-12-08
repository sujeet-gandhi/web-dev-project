package com.neu.onestopgo.services;

import com.neu.onestopgo.dao.UserRequestObject;
import com.neu.onestopgo.models.Authorities;
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
    private AuthoritiesService authoritiesService;

    @Autowired
    public UserService(UserRepository userRepository, StoreService storeService) {
        this.userRepository = userRepository;
        this.storeService = storeService;
    }

    public User getUserFromId(int userId) {
        return userRepository.findById(userId).orElseThrow();
    }

    public User createNewUser(UserRequestObject userRequestObject) {
        User newUser = userRequestObject.getModelObject();
        newUser.setType("USER");

        Authorities authorities = new Authorities();
        authorities.setAuthority("ROLE_USER");
        authorities.setUsername(userRequestObject.getEmail());
        authoritiesService.createNewAuthorities(authorities);

        return userRepository.save(newUser);
    }

    public User createNewStoreAdmin(UserRequestObject userRequestObject) throws Exception {
        User newUser = userRequestObject.getModelObject();
        newUser.setType("STOREADMIN");

        Authorities authorities = new Authorities();
        authorities.setAuthority("ROLE_STOREADMIN");
        authorities.setUsername(userRequestObject.getEmail());
        authoritiesService.createNewAuthorities(authorities);

        if (Utils.IsNullOrEmpty(userRequestObject.getStoreId())) {
            throw new Exception("empty store id");
        }
        Store store = storeService.getStoreById(userRequestObject.getStoreId());
        if (store == null) {
            throw new Exception("invalid store id");
        }
        newUser.setStore(store);
        return userRepository.save(newUser);
    }

    public User updateUserProfile(UserRequestObject userRequestObject, int userId) {
        User currentUser = userRepository.findById(userId).orElseThrow();
        currentUser.setAddress(userRequestObject.getAddress())
                .setPassword(userRequestObject.getPassword())
                .setContact(userRequestObject.getContact())
                .setImageUrl(userRequestObject.getImageUrl());

        return userRepository.save(currentUser);
    }

    public String getExistingImageUrlOfUser(int userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return user.getImageUrl();
    }

    public User getUserFromUserName(String userName) {
        return userRepository.findUserByEmail(userName);
    }
    public int getStoreIdOfStoreAdmin(String emailIdOfStoreAdmin) {
        return userRepository.findUserByEmail(emailIdOfStoreAdmin).getStore().getId();
    }
}
