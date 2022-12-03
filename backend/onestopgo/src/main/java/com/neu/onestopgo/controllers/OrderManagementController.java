
package com.neu.onestopgo.controllers;

import com.neu.onestopgo.dao.OrderItemQuantityRequestObject;
import com.neu.onestopgo.models.OrderState;
import com.neu.onestopgo.services.OrderService;
import com.neu.onestopgo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static com.neu.onestopgo.utils.Constants.*;

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

    @DeleteMapping(path = "/removeFromCart/{orderItemId}")
    public ResponseEntity<Map<String, Object>> removeProductFromCart(@PathVariable String orderItemId) {
        Map<String, Object> response = new HashMap<>();
        response.put(CART, orderService.removeFromCart(orderItemId, userService.getUserFromId(getCurrentUserId())));
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

    @PutMapping(path = "/placeOrder/{orderId}")
    public ResponseEntity<Map<String, Object>> placeOrder(@PathVariable String orderId) {
        Map<String, Object> response = new HashMap<>();
        response.put(ORDER, orderService.updateOrderStatus(UUID.fromString(orderId), OrderState.PLACED));
        return ResponseEntity.ok(response);
    }

    @PutMapping(path = "/cancelOrder/{orderId}")
    public ResponseEntity<Map<String, Object>> cancelOrder(@PathVariable String orderId) {
        Map<String, Object> response = new HashMap<>();
        response.put(ORDERS, orderService.updateOrderStatus(UUID.fromString(orderId), OrderState.CANCELLED));
        return ResponseEntity.ok(response);
    }

    @PutMapping(path = "/deliverOrder/{orderId}")
    public ResponseEntity<Map<String, Object>> deliverOrder(@PathVariable String orderId) {
        Map<String, Object> response = new HashMap<>();
        response.put(ORDER, orderService.updateOrderStatus(UUID.fromString(orderId), OrderState.DELIVERED));
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
