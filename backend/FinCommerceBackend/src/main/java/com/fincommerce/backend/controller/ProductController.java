package com.fincommerce.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fincommerce.backend.entity.Product;
import com.fincommerce.backend.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	private ProductService productService;

//	/-------------------Get Mapping---------------------/
	@GetMapping
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Product> getById(@PathVariable Long id) {
		Optional<Product> product = productService.getById(id);

		if (product.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(product.get());
		}

		else
			return ResponseEntity.notFound().build();
	}

//	/------------------------Put Mapping--------------------/
	@PutMapping("/{id}")
	public ResponseEntity<Product> updateById(@PathVariable Long id,@Valid @RequestBody Product product) {
		Product updatedProduct = productService.updateProduct(id, product);
		if (updatedProduct != null) {
			return ResponseEntity.ok(updatedProduct);
		}

		return ResponseEntity.notFound().build();
	}

//	/--------------------------Post Mapping------------------/
	@PostMapping
	public ResponseEntity createProduct(@Valid @RequestBody Product product) {
		return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(product));
	}

//	/------------------------Delete Mapping------------------/
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {

		boolean deleted = productService.deleteProduct(id);

		if (deleted) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
	}

}
