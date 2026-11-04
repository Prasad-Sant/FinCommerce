package com.fincommerce.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fincommerce.backend.dto.CreateOrderRequest;
import com.fincommerce.backend.dto.OrderResponse;
import com.fincommerce.backend.dto.UpdateOrderStatusRequest;
import com.fincommerce.backend.entity.Order;
import com.fincommerce.backend.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	private OrderService orderService;

	public OrderController(OrderService orderService) {
		this.orderService = orderService;
	}

	@PostMapping
	public ResponseEntity<OrderResponse> createOrder(@Valid @RequestBody CreateOrderRequest request) {

		OrderResponse createdOrder = orderService.createOrder(request);

		return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
	}

	@PutMapping("/{id}/status")
	public OrderResponse updateOrderStatus(@PathVariable Long id,@Valid @RequestBody UpdateOrderStatusRequest request) {

		String status = request.getStatus();

	    return orderService.updateOrderStatus(id, status);
	}

	@GetMapping
	public ResponseEntity<List<OrderResponse>> getAllOrders() {
		return ResponseEntity.ok(orderService.getAllOrders());
	}
	
	@GetMapping("/my-orders")
	public ResponseEntity<List<OrderResponse>> getMyOrders() {
	    return ResponseEntity.ok(orderService.getMyOrders());
	}

	@GetMapping("/{id}")
	public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id) {

		return ResponseEntity.ok(orderService.getOrderById(id));

	}

}
