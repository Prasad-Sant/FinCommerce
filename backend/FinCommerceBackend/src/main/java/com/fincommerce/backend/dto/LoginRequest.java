package com.fincommerce.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
	
	@NotBlank(message = "Email is required")
	@Email(message = "Enter a valid Email Id")
	private String email;
	
	@NotBlank
	private String password;

}
