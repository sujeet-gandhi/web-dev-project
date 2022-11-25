
package com.neu.onestopgo.controllers;

import com.neu.onestopgo.dao.OrderItemQuantityRequestObject;
import com.neu.onestopgo.models.OrderState;
import com.neu.onestopgo.services.OrderService;
import com.neu.onestopgo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static com.neu.onestopgo.utils.Constants.CART;
import static com.neu.onestopgo.utils.Constants.ORDERS;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/order")
public class OrderManagementController {

    private final OrderService orderService;

    private final UserService userService;


    @Autowired
    public OrderManagementController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @GetMapping(path = "/cart")
    public ResponseEntity<Map<String, Object>> getCart() {
        Map<String, Object> response = new HashMap<>();
        response.put(CART, orderService.getCartResponse(userService.getUserFromId(getCurrentUserId())));
        return ResponseEntity.ok(response);
    }

    @PostMapping(path = "/addToCart")
    public ResponseEntity<Map<String, Object>> addProductToCart(@RequestBody OrderItemQuantityRequestObject orderItemQuantity) {
        Map<String, Object> response = new HashMap<>();
        response.put(CART, orderService.addToCart(orderItemQuantity, userService.getUserFromId(getCurrentUserId())));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(path = "/removeFromCart")
    public ResponseEntity<Map<String, Object>> removeProductFromCart(@RequestBody OrderItemQuantityRequestObject orderItemQuantity) {
        Map<String, Object> response = new HashMap<>();
        response.put(CART, orderService.removeFromCart(orderItemQuantity, userService.getUserFromId(getCurrentUserId())));
        return ResponseEntity.ok(response);
    }

    @PutMapping(path = "/updateCart")
    public ResponseEntity<Map<String, Object>> updateCartQuantity(@RequestBody OrderItemQuantityRequestObject orderItemQuantity) {
        Map<String, Object> response = new HashMap<>();
        response.put(CART, orderService.updateItemInCart(orderItemQuantity, userService.getUserFromId(getCurrentUserId())));
        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/orderList")
    public ResponseEntity<Map<String, Object>> getOrders() {
        Map<String, Object> response = new HashMap<>();
        response.put(ORDERS, orderService.getOrdersList(userService.getUserFromId(getCurrentUserId())));
        return ResponseEntity.ok(response);
    }

    @PutMapping(path = "/placeOrder")
    public ResponseEntity<Map<String, Object>> placeOrder(@PathParam("orderId") String orderId) {
        Map<String, Object> response = new HashMap<>();
        response.put(CART, orderService.updateOrderStatus(UUID.fromString(orderId), OrderState.PLACED));
        return ResponseEntity.ok(response);
    }

    @PutMapping(path = "/deliverOrder")
    public ResponseEntity<Map<String, Object>> deliverOrder(@PathParam("orderId") String orderId) {
        Map<String, Object> response = new HashMap<>();
        response.put(CART, orderService.updateOrderStatus(UUID.fromString(orderId), OrderState.DELIVERED));
        return ResponseEntity.ok(response);
    }

    /**
     * Dummy method for now, to be replaced with actual method after the session implementation is done.
     *
     * @return  userId
     */
    private int getCurrentUserId() {
        return 14;
    }

}
