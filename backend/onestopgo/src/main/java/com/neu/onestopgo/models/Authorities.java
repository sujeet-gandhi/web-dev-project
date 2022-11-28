package com.neu.onestopgo.models;


import org.hibernate.search.annotations.Indexed;

import javax.persistence.*;

@Entity
@Indexed
public class Authorities {

    @Column(name = "username", columnDefinition = "VARCHAR(255)")
    private String username;
    @Column(name = "authority", columnDefinition = "VARCHAR(255)")
    private String authority;
    @Id
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
