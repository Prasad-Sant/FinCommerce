package com.fincommerce.backend.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<Map<String, Object>> handleAccessDenied(
	        AccessDeniedException exception) {

	    Map<String, Object> response = new HashMap<>();
	    response.put("status", 403);
	    response.put("message", exception.getMessage());

	    return ResponseEntity
	            .status(HttpStatus.FORBIDDEN)
	            .body(response);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, Object>> handleValidationErrors(MethodArgumentNotValidException exception) {

		Map<String, String> errors = new HashMap<>();

		exception.getBindingResult().getFieldErrors()
				.forEach(
						error -> errors.put(error.getField(), error.getDefaultMessage())
						);
		
		Map<String, Object> response = new HashMap<String,Object>();
		response.put("status", 400);
		response.put("message", "Validation Failed");
		response.put("errors", errors);
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		
	}
	
	 @ExceptionHandler(IllegalArgumentException.class)
	    public ResponseEntity<Map<String, Object>> handleIllegalArgument(
	            IllegalArgumentException exception) {

		 Map<String, Object> response = new HashMap<>();
		    response.put("status", 400);
		    response.put("message", exception.getMessage());

		    return ResponseEntity
		            .status(HttpStatus.BAD_REQUEST)
		            .body(response);
	    }
	 
	 @ExceptionHandler(ResourceNotFoundException.class)
	 public ResponseEntity<Map<String, Object>> handleResourceNotFound(
	         ResourceNotFoundException exception) {

		  Map<String, Object> response = new HashMap<>();
		    response.put("status", 404);
		    response.put("message", exception.getMessage());

		    return ResponseEntity
		            .status(HttpStatus.NOT_FOUND)
		            .body(response);
	 }
	 
	 @ExceptionHandler(Exception.class)
	 public ResponseEntity<Map<String, Object>> handleUnexpectedException(
	         Exception exception) {

	     Map<String, Object> response = new HashMap<>();
	     response.put("status", 500);
	     response.put("message", "An unexpected error occurred");

	     return ResponseEntity
	             .status(HttpStatus.INTERNAL_SERVER_ERROR)
	             .body(response);
	 }

}
