package com.neu.onestopgo.repositories;

import com.neu.onestopgo.models.Favourite;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface FavouriteRepository extends CrudRepository<Favourite, UUID> {
    public List<Favourite> findAllByUser_Id(int userId);

    public List<Favourite> findAllByFavouriteStore_Id(int storeId);
}
