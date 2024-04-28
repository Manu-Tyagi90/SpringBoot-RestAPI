package com.myrest.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myrest.api.Service.CloudService;
import com.myrest.api.model.CloudVendor;


@RestController
@RequestMapping("/cloudvendor")
public class CloudAPIVendor {
	
	private final CloudService cloudService;
	public CloudAPIVendor(CloudService cloudService) {
		this.cloudService = cloudService;
		
	}
	
	
	@GetMapping("{vendorId}")
	public CloudVendor getCloudDetails(@PathVariable("vendorId") String vendorId) {
		
		return cloudService.showCloudDetails(vendorId);
	}
	
	@PostMapping
	public String CreateCloudDetails(@RequestBody CloudVendor cloudVendor) {
		
		cloudService.createCloudDetails(cloudVendor);
		
		return "Added SuccessFully"; 
	}
	
	@PutMapping
	public String UpdateCloudDetails(@RequestBody CloudVendor cloudVendor ) {
		
		cloudService.updateCloudDetails(cloudVendor);
		return "Updated SuccessFully"; 
	}
	
	@DeleteMapping("{vendorId}")
	public String DeleteCloudDetails(@PathVariable("vendorId") String VendorId ) {
		
		cloudService.deleteCloudDetails(VendorId);
		
		return "Deleted SuccessFully"; 
	}
	
	@GetMapping()
	public List<CloudVendor> getAllCloudDetails() {
		
		return cloudService.getAllCloudDetails();
	}
	
    @GetMapping("/byname/{vendorName}")
    public ResponseEntity<CloudVendor> findCloudVendorByName(@PathVariable("vendorName") String vendorName) {
        CloudVendor cloudVendor = cloudService.findCloudVendorByName(vendorName);
        if (cloudVendor != null) {
            return ResponseEntity.ok(cloudVendor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	
	
}
