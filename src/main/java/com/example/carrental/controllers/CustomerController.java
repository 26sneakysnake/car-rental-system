package com.example.carrental.controllers;

import com.example.carrental.models.Customer;
import com.example.carrental.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;         // Ajoutez ceci
import java.util.List;             // Ajoutez ceci


@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createCustomer(@RequestBody Customer customer) {
        // Validation de la date d'expiration du permis
        LocalDate expiryDate = LocalDate.parse(customer.getLicenseExpiryDate());
        if (expiryDate.isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest().body("Le permis a expiré");
        }
        
        return ResponseEntity.ok(customerRepository.save(customer));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        return customerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}