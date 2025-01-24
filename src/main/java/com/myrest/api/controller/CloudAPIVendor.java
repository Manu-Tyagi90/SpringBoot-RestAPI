package com.myrest.api.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;

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
	public ResponseEntity<?> getAllCloudDetails(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable paging = PageRequest.of(page, size);
            List<CloudVendor> vendors = cloudService.getAllCloudDetails();
            
            int start = (int) paging.getOffset();
            int end = Math.min((start + paging.getPageSize()), vendors.size());
            
            if (start > vendors.size()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }
            
            return new ResponseEntity<>(vendors.subList(start, end), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                "Error fetching vendors: " + e.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
