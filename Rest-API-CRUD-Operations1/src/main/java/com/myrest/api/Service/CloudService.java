package com.myrest.api.Service;

import java.util.List;
import com.myrest.api.model.CloudVendor;

public interface CloudService {
	
	public String deleteCloudDetails(String VendorId);
	public String createCloudDetails(CloudVendor cloudVendor);
	public String updateCloudDetails(CloudVendor cloudVendor);
	public CloudVendor showCloudDetails(String VendorId);
	public List<CloudVendor> getAllCloudDetails();
	public CloudVendor findCloudVendorByName(String vendorName);
}
