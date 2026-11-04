package com.fincommerce.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fincommerce.backend.entity.Product;
import com.fincommerce.backend.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}
	
	public Product createProduct(Product product) {
		return productRepository.save(product);
	}
	
	public Optional<Product> getById(Long id) {
		return productRepository.findById(id);
	}
	
	public Product updateProduct(Long id, Product updatedProduct) {
		Optional<Product> existingProduct = productRepository.findById(id);
		
		if(existingProduct.isPresent()) {
			Product product = existingProduct.get();
			
			product.setName(updatedProduct.getName());
			product.setPrice(updatedProduct.getPrice());
			product.setCategory(updatedProduct.getCategory());
			
			return productRepository.save(product);
		}
		else
			return null;
	}
	
	public boolean deleteProduct(Long id) {
	    Optional<Product> product = productRepository.findById(id);

	    if (product.isEmpty()) {
	        return false;
	    }

	    productRepository.delete(product.get());
	    return true;
	}

}
