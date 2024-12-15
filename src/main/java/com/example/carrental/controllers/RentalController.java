package com.example.carrental.controllers;

import com.example.carrental.models.Rental;
import com.example.carrental.services.RentalService;
import com.example.carrental.repositories.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rentals")
@CrossOrigin(origins = "http://localhost:3000")
public class RentalController {

    @Autowired
    private RentalService rentalService;
    
    @Autowired
    private RentalRepository rentalRepository;

    // Obtenir toutes les locations
    @GetMapping
    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }

    // Créer une nouvelle location
    @PostMapping
    public ResponseEntity<?> createRental(@RequestBody Rental rental) {
        try {
            Rental newRental = rentalService.createRental(rental);
            return ResponseEntity.ok(newRental);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Obtenir une location par ID
    @GetMapping("/{id}")
    public ResponseEntity<Rental> getRentalById(@PathVariable Long id) {
        return rentalRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Supprimer une location
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRental(@PathVariable Long id) {
        if (!rentalRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        rentalRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}