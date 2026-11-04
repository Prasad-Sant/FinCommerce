package com.fincommerce.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fincommerce.backend.dto.AuthResponse;
import com.fincommerce.backend.dto.LoginRequest;
import com.fincommerce.backend.dto.RegisterRequest;
import com.fincommerce.backend.entity.User;
import com.fincommerce.backend.repository.UserRepository;

@Service
public class AuthService {

	private final JwtService jwtService;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	 public AuthService(
			 JwtService jwtService,
	            UserRepository userRepository,
	            PasswordEncoder passwordEncoder) {
		 this.jwtService = jwtService;
	        this.userRepository = userRepository;
	        this.passwordEncoder = passwordEncoder;
	    }
	 
	 public String register(RegisterRequest request) {
		 
		 if(userRepository.existsByEmail(request.getEmail())) {
			 throw new IllegalArgumentException(
					 "Email already exists"
					 );
		 }
		 
		 User user = new User();
		 user.setName(request.getName());
		 user.setEmail(request.getEmail());
		 user.setPassword(
				 passwordEncoder.encode(request.getPassword())
				 );
		 user.setRole("USER");
		 
		 userRepository.save(user);
		 
		 return "User registered successfully";
		 
	 }
	 
	 public AuthResponse login(LoginRequest request) {
		 
		 User user = userRepository.findByEmail(request.getEmail())
				 .orElseThrow(()-> new IllegalArgumentException("Invalid email or password"));
		 
		 boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());
		 
		 if(!passwordMatches) {
			 throw new IllegalArgumentException("Invalid email or password");
		 }
		 
		 String token = jwtService.generateToken(
			        user.getEmail(),
			        user.getRole()
			);

			return new AuthResponse(
			        token,
			        "Bearer",
			        user.getEmail(),
			        user.getRole()
			);
	 }
}
