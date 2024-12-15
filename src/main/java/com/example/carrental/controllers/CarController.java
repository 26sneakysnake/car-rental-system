package com.example.carrental.controllers;

import com.example.carrental.models.Car;
import com.example.carrental.repositories.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*")
public class CarController {

    @Autowired
    private CarRepository carRepository;

    // Récupérer toutes les voitures
    @GetMapping
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    // Ajouter une voiture
    @PostMapping
    public Car addCar(@RequestBody Car car) {
        return carRepository.save(car);
    }

    // Récupérer une voiture par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        return carRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Mettre à jour une voiture
    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car carDetails) {
        return carRepository.findById(id)
                .map(car -> {
                    car.setBrand(carDetails.getBrand());
                    car.setModel(carDetails.getModel());
                    car.setYear(carDetails.getYear());
                    car.setLicensePlate(carDetails.getLicensePlate());
                    car.setDailyRate(carDetails.getDailyRate());
                    car.setAvailable(carDetails.isAvailable());
                    Car updatedCar = carRepository.save(car);
                    return ResponseEntity.ok(updatedCar);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Supprimer une voiture
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        return carRepository.findById(id)
                .map(car -> {
                    carRepository.delete(car);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Rechercher des voitures par marque
    @GetMapping("/search/brand/{brand}")
    public List<Car> findByBrand(@PathVariable String brand) {
        return carRepository.findByBrandContainingIgnoreCase(brand);
    }

    // Récupérer uniquement les voitures disponibles
    @GetMapping("/available")
    public List<Car> getAvailableCars() {
        return carRepository.findByAvailableTrue();
    }
}