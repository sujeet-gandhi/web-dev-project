package com.neu.onestopgo.services;

import com.neu.onestopgo.dao.UserRequestObject;
import com.neu.onestopgo.dao.UserResponseObject;
import com.neu.onestopgo.models.Authorities;
import com.neu.onestopgo.models.Store;
import com.neu.onestopgo.models.User;
import com.neu.onestopgo.repositories.UserRepository;
import com.neu.onestopgo.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService {
    private final UserRepository userRepository;

    private final StoreService storeService;

    @Autowired
    private AuthoritiesService authoritiesService;

    @Autowired
    private FavouriteService favouriteService;

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
        currentUser.setName(userRequestObject.getName())
                .setAddress(userRequestObject.getAddress())
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

    public UserResponseObject getUserDataFromUserName(String userName) {
        User user = getUserFromUserName(userName);
        Map<String, List<Object>> favouritesOfUser = favouriteService.getAllFavouriteOfUsers(user.getId());

        return new UserResponseObject()
                .setFavourites(favouritesOfUser)
                .setName(user.getName())
                .setId(user.getId())
                .setContact(user.getContact())
                .setAddress(user.getAddress())
                .setEmail(user.getEmail())
                .setPassword(user.getPassword())
                .setImageUrl(user.getImageUrl())
                .setEnabled(user.isEnabled())
                .setType(user.getType());
    }

    public UserResponseObject getSafeUserDetailsFromId(int userId) {
        User user = getUserFromId(userId);
        Map<String, List<Object>> favouritesOfUser = favouriteService.getAllFavouriteOfUsers(user.getId());

        return new UserResponseObject()
                .setName(user.getName())
                .setFavourites(favouritesOfUser)
                .setId(user.getId())
                .setEmail(user.getEmail())
                .setImageUrl(user.getImageUrl())
                .setEnabled(user.isEnabled())
                .setType(user.getType());
    }

    public int getStoreIdOfStoreAdmin(String emailIdOfStoreAdmin) {
        return userRepository.findUserByEmail(emailIdOfStoreAdmin).getStore().getId();
    }
}
