
package com.fincommerce.backend.mapper;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.fincommerce.backend.dto.OrderItemResponse;
import com.fincommerce.backend.dto.OrderResponse;
import com.fincommerce.backend.entity.Order;
import com.fincommerce.backend.entity.OrderItem;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    @Mapping(source = "orderItems", target = "items")
    OrderResponse toResponse(Order order);

    @InheritInverseConfiguration(name = "toResponse")
    Order toEntity(OrderResponse response);

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    @Mapping(source = "price", target = "unitPrice")
    OrderItemResponse toItemResponse(OrderItem item);

    @InheritInverseConfiguration(name = "toItemResponse")
    OrderItem toItemEntity(OrderItemResponse itemResponse);
}
