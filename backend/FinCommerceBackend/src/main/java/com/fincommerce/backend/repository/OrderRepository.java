package com.fincommerce.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fincommerce.backend.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	 List<Order> findByUserEmail(String email);

}
