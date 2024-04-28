package com.myrest.api.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.myrest.api.model.CloudVendor;

public interface CloudRepo extends JpaRepository<CloudVendor, String> {
	
	CloudVendor findByVendorName(String vendorName);
}
