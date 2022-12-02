package com.neu.onestopgo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.neu.onestopgo.response.OrderItemQuantityResponseObject;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"order_id", "product_id"})
})
public class OrderItemQuantity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "order_product_id", columnDefinition = "VARCHAR(255)")
    @Type(type = "uuid-char")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order1 order1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    @JsonIgnore
    private Store store;

    private float quantity;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Order1 getOrder() {
        return order1;
    }

    public void setOrder(Order1 order1) {
        this.order1 = order1;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public Store getStore() {
        return store;
    }

    public OrderItemQuantity setStore(Store store) {
        this.store = store;
        return this;
    }

    public OrderItemQuantityResponseObject getResponseObject() {
        OrderItemQuantityResponseObject orderItemQuantityResponseObject = new OrderItemQuantityResponseObject();
        orderItemQuantityResponseObject.setId(this.id);
        orderItemQuantityResponseObject.setProduct(this.getProduct());
        orderItemQuantityResponseObject.setQuantity(this.getQuantity());
        orderItemQuantityResponseObject.setStore(this.getStore());
        return orderItemQuantityResponseObject;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItemQuantity that = (OrderItemQuantity) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
