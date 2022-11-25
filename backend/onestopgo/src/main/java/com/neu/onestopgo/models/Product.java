package com.neu.onestopgo.models;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.TermVector;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Indexed
public class Product {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "product_id", columnDefinition = "VARCHAR(255)")
    @Type(type = "uuid-char")
    private UUID id;

    @Field(termVector = TermVector.YES)
    private String name;

    @Field(termVector = TermVector.YES)
    private String description;

    private String unit;

    private double quantity;

    private boolean inStock;

    private float price;

    @Field
    private String type;

    private String imageUrl;

    public Product() {

    }

    public Product(Product other) {
        this.id = other.getId();
        this.name = other.getName();
        this.description = other.getDescription();
        this.unit = other.getUnit();
        this.quantity = other.getQuantity();
        this.inStock = other.isInStock();
        this.price = other.getPrice();
        this.type = other.getType();
        this.imageUrl = other.getImageUrl();
    }

    public String getUnit() {
        return unit;
    }

    public Product setUnit(String unit) {
        this.unit = unit;
        return this;
    }

    public double getQuantity() {
        return quantity;
    }

    public Product setQuantity(double quantity) {
        this.quantity = quantity;
        return this;
    }

    public boolean isInStock() {
        return inStock;
    }

    public Product setInStock(boolean inStock) {
        this.inStock = inStock;
        return this;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Product setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public UUID getId() {
        return id;
    }

    public Product setId(UUID id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Product setName(String name) {
        this.name = name;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Product setDescription(String description) {
        this.description = description;
        return this;
    }

    public float getPrice() {
        return price;
    }

    public Product setPrice(float price) {
        this.price = price;
        return this;
    }

    public String getType() {
        return type;
    }

    public Product setType(String type) {
        this.type = type;
        return this;
    }
}
