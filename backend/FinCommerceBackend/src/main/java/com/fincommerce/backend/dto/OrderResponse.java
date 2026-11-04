package com.fincommerce.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
	private Long id;
	private BigDecimal totalAmount;
	private String status;
	private LocalDateTime createdAt;
	private List<OrderItemResponse> items;

}
