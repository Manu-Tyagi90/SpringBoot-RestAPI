package com.myrest.api.exception;

import org.springframework.http.HttpStatus;

public class CloudVendorException {
	private final String message;
	private final Throwable throwable;
	private final HttpStatus hhtpstatus;
	public CloudVendorException(String message, Throwable throwable, HttpStatus hhtpstatus) {
		super();
		this.message = message;
		this.throwable = throwable;
		this.hhtpstatus = hhtpstatus;
	}
	public String getMessage() {
		return message;
	}
	public Throwable getThrowable() {
		return throwable;
	}
	public HttpStatus getHhtpstatus() {
		return hhtpstatus;
	}

	
}
