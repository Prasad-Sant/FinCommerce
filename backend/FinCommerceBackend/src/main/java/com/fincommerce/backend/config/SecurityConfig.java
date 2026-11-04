
package com.fincommerce.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fincommerce.backend.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

	private final JwtAuthenticationFilter jwtAuthenticationFilter;

	public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
		this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable())

				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

				.authorizeHttpRequests(auth -> auth.requestMatchers("/api/auth/register", "/api/auth/login").permitAll()

						.requestMatchers(org.springframework.http.HttpMethod.GET, "/api/products", "/api/products/**")
						.hasAnyRole("USER", "ADMIN")

						.requestMatchers(org.springframework.http.HttpMethod.POST, "/api/products", "/api/products/**")
						.hasRole("ADMIN")

						.requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/products", "/api/products/**")
						.hasRole("ADMIN")

						.requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/products",
								"/api/products/**")
						.hasRole("ADMIN")

						.requestMatchers(org.springframework.http.HttpMethod.POST, "/api/orders")
						.hasAnyRole("USER", "ADMIN")

						.requestMatchers(org.springframework.http.HttpMethod.GET, "/api/orders/my-orders")
						.hasAnyRole("USER", "ADMIN")

						.requestMatchers(HttpMethod.GET, "/api/orders/*")
						.hasAnyRole("USER", "ADMIN")

						.requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/orders/*/status")
						.hasRole("ADMIN")
						
						.requestMatchers(HttpMethod.GET, "/api/orders")
						.hasRole("ADMIN")

						.anyRequest().authenticated()

				)
				.exceptionHandling(exception -> exception

					    // 401: User is not authenticated
					    .authenticationEntryPoint((request, response, authException) -> {
					        response.setStatus(HttpStatus.UNAUTHORIZED.value());
					        response.setContentType("application/json");
					        response.getWriter().write(
					            "{\"status\":401,\"message\":\"Unauthorized - Please login\"}"
					        );
					    })

					    // 403: User is authenticated but lacks permission
					    .accessDeniedHandler((request, response, accessDeniedException) -> {
					        response.setStatus(HttpStatus.FORBIDDEN.value());
					        response.setContentType("application/json");
					        response.getWriter().write(
					            "{\"status\":403,\"message\":\"Forbidden - Insufficient permissions\"}"
					        );
					    })
					)
				
				.formLogin(form -> form.disable()).httpBasic(basic -> basic.disable())

				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
}
