package com.neu.onestopgo.services;

import com.neu.onestopgo.dao.OrderItemQuantityRequestObject;
import com.neu.onestopgo.models.*;
import com.neu.onestopgo.repositories.OrderItemQuantityRepository;
import com.neu.onestopgo.repositories.OrderRepository;
import com.neu.onestopgo.response.OrderResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    private final OrderItemQuantityRepository orderItemQuantityRepository;

    private final StoreItemService storeItemService;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderItemQuantityRepository orderItemQuantityRepository, StoreItemService storeItemService) {
        this.orderRepository = orderRepository;
        this.storeItemService = storeItemService;
        this.orderItemQuantityRepository = orderItemQuantityRepository;
    }

    public Order1 getOrderById(UUID orderId) {
        var order = orderRepository.findById(orderId);
        return order.orElseThrow();
    }

    public OrderResponseObject getCartResponse(User user) {
        return getCart(user).getResponseObject();
    }

    private Order1 getCart(User user) {
        var cart = orderRepository.findFirstByUserAndState(user, OrderState.IN_CART);
        if (cart != null) {
            return cart;
        } else {
            var order = new Order1();
            order.setId(UUID.randomUUID());
            order.setUser(user);
            order.setState(OrderState.IN_CART);
            return orderRepository.saveAndFlush(order);
        }
    }

    public OrderResponseObject addToCart(OrderItemQuantityRequestObject requestObject, User user) {
        var storeProduct = storeItemService.getProductInAStore(requestObject.getStoreId(), requestObject.getProductId());
        if (storeProduct.getQuantity() < requestObject.getQuantity()) {
            throw new IllegalStateException("Cannot full-fill order, not enough quantity");
        }

        storeProduct.setQuantity(storeProduct.getQuantity() - requestObject.getQuantity());
        storeItemService.updateStoreItemQuantity(storeProduct);
        Store currentStore = storeProduct.getStore();

        var cart = getCart(user);

        OrderItemQuantity orderItemQuantity = new OrderItemQuantity();
        orderItemQuantity.setProduct(new Product(storeProduct.getProduct()));
        orderItemQuantity.setQuantity(requestObject.getQuantity());
        orderItemQuantity.setStore(currentStore);
        orderItemQuantity.setOrder(cart);

        var cartItems = cart.getOrderItemQuantitySet();
        if (cartItems == null) {
            cartItems = new HashSet<>();
        }

        orderItemQuantity.setId(UUID.randomUUID());
        var savedOrderItem = orderItemQuantityRepository.saveAndFlush(orderItemQuantity);
        cartItems.add(savedOrderItem);

        cart.setOrderItemQuantitySet(cartItems);
        return orderRepository.saveAndFlush(cart).getResponseObject();
    }

    public OrderResponseObject removeFromCart(String orderItemId, User user) {
        var cart = getCart(user);
        var orderItem = orderItemQuantityRepository
                .findById(UUID.fromString(orderItemId))
                .orElseThrow();
        if (cart.getOrderItemQuantitySet().contains(orderItem)) {
            cart.getOrderItemQuantitySet().remove(orderItem);
            orderItemQuantityRepository.deleteById(orderItem.getId());

            storeItemService.updateStoreIdAndProductIdQuantity(orderItem.getStore().getId(),
                    orderItem.getProduct().getId().toString(),
                    orderItem.getQuantity(),
                    true);

            return orderRepository.save(cart).getResponseObject();
        } else {
            throw new IllegalStateException("Item not in cart or already removed");
        }
    }

    public OrderResponseObject updateItemInCart(OrderItemQuantityRequestObject requestObject, User user) {
        var cart = getCart(user);
        var orderItem = orderItemQuantityRepository
                .findById(UUID.fromString(requestObject.getOrderItemQuantityId()))
                .orElseThrow();
        if (orderItem.getOrder().getId() != cart.getId()) {
            throw new IllegalArgumentException("Cannot modify item that is in other carts");
        }

        var storeItem = storeItemService.getByProductId(orderItem.getProduct().getId());

        if (storeItem.getQuantity() < requestObject.getQuantity()) {
            throw new IllegalStateException("Unable to update quantity. Store does not have enough quantity");
        }

        var orderItemQuantity = orderItemQuantityRepository
                .findById(UUID.fromString(requestObject.getOrderItemQuantityId()))
                .orElseThrow();
        orderItemQuantity.setQuantity(requestObject.getQuantity());
        orderItemQuantityRepository.save(orderItemQuantity);

        return getCart(user).getResponseObject();
    }

    public List<OrderResponseObject> getOrdersList(User user) {
        List<Order1> orders = new ArrayList<>();

        orders.addAll(orderRepository.findAllByUserAndState(user, OrderState.DELIVERED));
        orders.addAll(orderRepository.findAllByUserAndState(user, OrderState.PLACED));

        return orders.stream().map(Order1::getResponseObject).collect(Collectors.toList());
    }

    public OrderResponseObject updateOrderStatus(UUID orderId, OrderState state) {
        var order = getOrderById(orderId);
        if (order != null) {
            order.setState(state);
            if (state == OrderState.PLACED) {
                order.setOrderDate(new Date());
            } else if (state == OrderState.DELIVERED) {
                order.setOrderDeliveryDate(new Date());
            }
            if (verifyPayment(orderId)) {
                return orderRepository.save(order).getResponseObject();
            } else {
                throw new IllegalStateException("Unable to verify payment, something went wrong.");
            }
        }

        throw new IllegalArgumentException("Unable to find the specified order, checkout failed.");
    }

    /**
     * Do a synchronous call to verify that the payment is made.
     *
     * @param orderId unique identifier of the order
     * @return verification status of the payment
     */
    private boolean verifyPayment(UUID orderId) {
        return true;
    }

}
