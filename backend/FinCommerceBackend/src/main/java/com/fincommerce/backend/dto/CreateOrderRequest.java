package com.fincommerce.backend.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class CreateOrderRequest {
	@NotEmpty(message = "An order must contain at least one item")
	@Valid
	private List<OrderItemRequest> items;

}
