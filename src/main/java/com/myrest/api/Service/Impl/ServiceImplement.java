package com.myrest.api.Service.Impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.myrest.api.Repo.CloudRepo;
import com.myrest.api.Service.CloudService;
import com.myrest.api.exception.CloudVendorNotFoundException;
import com.myrest.api.model.CloudVendor;


@Service
public class ServiceImplement implements CloudService{
	
	private final CloudRepo cloudRepo;
	
	public ServiceImplement(CloudRepo cloudRepo) {
		this.cloudRepo = cloudRepo;
	}

	@Override
	public String deleteCloudDetails(String VendorId) {
		
		cloudRepo.deleteById(VendorId); 
		return "Deleted Successfully";
	}

	@Override
	public String createCloudDetails(CloudVendor cloudVendor) {
		
		cloudRepo.save(cloudVendor);
		
		return "Added Successfully";
	}

	@Override
	public String updateCloudDetails(CloudVendor cloudVendor) {
		
		cloudRepo.save(cloudVendor);
		
		return "Updated Successfully";
	}

	@Override
	public CloudVendor showCloudDetails(String VendorId) {
		if(cloudRepo.findById(VendorId).isEmpty())
		{
			throw new CloudVendorNotFoundException("Vendor Doesn't Exists");
		}
		return cloudRepo.findById(VendorId).get();
	}

	@Override
	public List<CloudVendor> getAllCloudDetails() {
		return cloudRepo.findAll();
	}
	
	@Override
    public CloudVendor findCloudVendorByName(String  vendorName) {
        return cloudRepo.findByVendorName(vendorName);
    }

}
