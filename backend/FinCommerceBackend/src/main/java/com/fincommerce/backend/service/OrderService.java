package com.fincommerce.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fincommerce.backend.dto.CreateOrderRequest;
import com.fincommerce.backend.dto.OrderItemRequest;
import com.fincommerce.backend.dto.OrderResponse;
import com.fincommerce.backend.entity.Order;
import com.fincommerce.backend.entity.OrderItem;
import com.fincommerce.backend.entity.OrderStatus;
import com.fincommerce.backend.entity.Product;
import com.fincommerce.backend.entity.User;
import com.fincommerce.backend.exception.ResourceNotFoundException;
import com.fincommerce.backend.mapper.OrderMapper;
import com.fincommerce.backend.repository.OrderRepository;
import com.fincommerce.backend.repository.ProductRepository;
import com.fincommerce.backend.repository.UserRepository;

@Service
public class OrderService {

	private final OrderRepository orderRepository;
	private final ProductRepository productRepository;
	private final OrderMapper orderMapper;
	private final UserRepository userRepository;

	public OrderService(OrderRepository orderRepository, ProductRepository productRepository, OrderMapper orderMapper,
			UserRepository userRepository) {

		this.orderRepository = orderRepository;
		this.productRepository = productRepository;
		this.orderMapper = orderMapper;
		this.userRepository = userRepository;
	}

	@Transactional
	public OrderResponse createOrder(CreateOrderRequest request) {

		Order order = new Order();
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		String email = authentication.getName();

		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

		order.setUser(user);
		order.setStatus(OrderStatus.PENDING);
		order.setCreatedAt(LocalDateTime.now());

		BigDecimal totalAmount = BigDecimal.ZERO;
		List<OrderItem> orderItems = new ArrayList<>();

		for (OrderItemRequest itemRequest : request.getItems()) {

			Product product = productRepository.findById(itemRequest.getProductId()).orElseThrow(
					() -> new IllegalArgumentException("Product not found: " + itemRequest.getProductId()));

			BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

			OrderItem orderItem = new OrderItem();
			orderItem.setOrder(order);
			orderItem.setProduct(product);
			orderItem.setQuantity(itemRequest.getQuantity());
			orderItem.setPrice(product.getPrice());

			orderItems.add(orderItem);
			totalAmount = totalAmount.add(itemTotal);
		}

		order.setOrderItems(orderItems);
		order.setTotalAmount(totalAmount);
		
		System.out.println("Authenticated email: " + email);
		System.out.println("Assigned User ID: " + order.getUser().getId());

		Order saveOrder = orderRepository.save(order);

		return orderMapper.toResponse(saveOrder);
	}

	public List<OrderResponse> getMyOrders() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		String email = authentication.getName();

		return orderRepository.findByUserEmail(email).stream().map(orderMapper::toResponse).toList();
	}

	public OrderResponse updateOrderStatus(Long orderId, String status) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		boolean isAdmin = authentication.getAuthorities().stream()
				.anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));

		if (!isAdmin) {
			throw new org.springframework.security.access.AccessDeniedException(
					"Only administrators can update order status");
		}

		OrderStatus newStatus;

		try {
			newStatus = OrderStatus.valueOf(status);
		} catch (IllegalArgumentException | NullPointerException e) {
			throw new IllegalArgumentException(
					"Invalid status. Allowed statuses: PENDING, CONFIRMED, SHIPPED, CANCELLED, DELIVERED");
		}

		Order order = orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));

		validateStatusTransition(order.getStatus(), newStatus);

		order.setStatus(newStatus);

		Order updatedOrder = orderRepository.save(order);

		return orderMapper.toResponse(updatedOrder);
	}

	private void validateStatusTransition(OrderStatus currentStatus, OrderStatus newStatus) {

		boolean allowed = switch (currentStatus) {
		case PENDING -> newStatus == OrderStatus.CONFIRMED || newStatus == OrderStatus.CANCELLED;

		case CONFIRMED -> newStatus == OrderStatus.SHIPPED || newStatus == OrderStatus.CANCELLED;

		case SHIPPED -> newStatus == OrderStatus.DELIVERED;

		case DELIVERED, CANCELLED -> false;
		};

		if (!allowed) {
			throw new IllegalArgumentException("Cannot change order status from " + currentStatus + " to " + newStatus);
		}
	}

	public Order createOrder(Order order) {
		return orderRepository.save(order);
	}

	public List<OrderResponse> getAllOrders() {
		return orderRepository.findAll().stream().map(orderMapper::toResponse).toList();
	}

	public OrderResponse getOrderById(Long id) {

		Order order = orderRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + id));

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		String email = authentication.getName();

		boolean isAdmin = authentication.getAuthorities().stream()
				.anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));

		if (!isAdmin && !order.getUser().getEmail().equals(email)) {
			throw new org.springframework.security.access.AccessDeniedException(
					"You are not authorized to access this order");
		}

		return orderMapper.toResponse(order);
	}

}
