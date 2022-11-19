package com.neu.onestopgo.models;

import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.TermVector;

import javax.persistence.*;

@Entity
@Indexed
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "category_id")
    private int id;

    @Field(termVector = TermVector.YES)
    private String name;

    @Field(termVector = TermVector.YES)
    private String description;

    private String imageUrl;

    public int getId() {
        return id;
    }

    public Category setId(int id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Category setName(String name) {
        this.name = name;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Category setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Category setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

}
