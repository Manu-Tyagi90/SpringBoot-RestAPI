package com.myrest.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class CloudVendor {
	@Id
	private String vendorId;
	private String vendorName;
	
	
	public CloudVendor() {
		
	}
	
	
	public CloudVendor(String vendorId, String vendorName) {
		
		this.vendorId = vendorId;
		this.vendorName = vendorName;
	}


	public String getVendorId() {
		return vendorId;
	}


	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}


	public String getVendorName() {
		return vendorName;
	}


	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	
	
	
	


}
