package com.neu.onestopgo.services;

import com.neu.onestopgo.dao.UserResponseObject;
import com.neu.onestopgo.models.Favourite;
import com.neu.onestopgo.models.User;
import com.neu.onestopgo.repositories.FavouriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class FavouriteService {

    @Autowired
    private FavouriteRepository favouriteRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private StoreService storeService;

    @Autowired
    private ProductService productService;

    public List<Object> markStoreAsFavourite(int storeId, String userEmail) {
        Favourite favourite = favouriteRepository.save(new Favourite()
                .setFavouriteStore(storeService.getStoreById(storeId))
                .setUser(userService.getUserFromUserName(userEmail)));

        return List.of(favourite.getFavouriteStore().getName(), favourite.getFavouriteStore().getId());
    }

    public List<Object> markProductAsFavourite(String productId, String userEmail) {
        Favourite favourite = favouriteRepository.save(new Favourite()
                .setUser(userService.getUserFromUserName(userEmail))
                .setFavouriteProduct(productService.getProductById(UUID.fromString(productId))));

        return List.of(favourite.getFavouriteProduct().getName(), favourite.getFavouriteProduct().getId().toString());
    }

    public Map<String, List<Object>> getAllFavouriteOfUsers(int userId) {
        List<Favourite> allFavourites = favouriteRepository.findAllByUser_Id(userId);
        Map<String, List<Object>> favourites = new HashMap<>();
        favourites.put("stores", new LinkedList<>());
        favourites.put("products", new LinkedList<>());

        if (allFavourites != null) {
            allFavourites.forEach(each -> {
                if (each.getFavouriteProduct() != null) {
                    favourites.get("products").add(List.of(each.getFavouriteProduct().getName(), each.getFavouriteProduct().getId().toString()));
                } else {
                    favourites.get("stores").add(List.of(each.getFavouriteStore().getName(), each.getFavouriteStore().getId()));
                }
            });
        }

        return favourites;
    }

    public List<UserResponseObject> getUsersWhoLikeGivenStore(int storeId) {
        List<Favourite> favourites = favouriteRepository.findAllByFavouriteStore_Id(storeId);
        if (favourites == null || favourites.size() == 0)
            return new LinkedList<>();

        Set<User> users = favourites.stream().map(Favourite::getUser).collect(Collectors.toSet());
        List<UserResponseObject> response = new LinkedList<>();
        for (User user : users) {
            response.add(new UserResponseObject()
                    .setId(user.getId())
                    .setEmail(user.getEmail())
                    .setImageUrl(user.getImageUrl())
                    .setEnabled(user.isEnabled())
                    .setType(user.getType()));
        }

        return response;
    }
}
