package com.neu.onestopgo.services;

import com.neu.onestopgo.models.Authorities;
import com.neu.onestopgo.repositories.AuthoritiesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthoritiesService {

  @Autowired
  private AuthoritiesRepository authoritiesRepository;

  public Authorities createNewAuthorities(Authorities authorities) {
    return authoritiesRepository.save(authorities);
  }
}
