package com.example.carrental.services;

import com.example.carrental.models.Car;
import com.example.carrental.models.Rental;
import com.example.carrental.repositories.CarRepository;
import com.example.carrental.repositories.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.time.temporal.ChronoUnit;

@Service
public class RentalService {
    
    @Autowired
    private RentalRepository rentalRepository;
    
    @Autowired
    private CarRepository carRepository;

    public Rental createRental(Rental rental) {
        validateRental(rental);
        calculatePrice(rental);
        updateCarAvailability(rental.getCar(), false);
        return rentalRepository.save(rental);
    }

    private void validateRental(Rental rental) {
        Car car = carRepository.findById(rental.getCar().getId())
            .orElseThrow(() -> new RuntimeException("Car not found"));
            
        if (!car.isAvailable()) {
            throw new RuntimeException("Car is not available");
        }
        
        if (rental.getEndDate().isBefore(rental.getStartDate())) {
            throw new RuntimeException("End date cannot be before start date");
        }
    }

    private void calculatePrice(Rental rental) {
        long days = ChronoUnit.DAYS.between(rental.getStartDate(), rental.getEndDate());
        double basePrice = rental.getCar().getDailyRate() * days;
        
        switch(rental.getInsuranceType()) {
            case BASIC:
                rental.setTotalPrice(basePrice * 1.1);
                break;
            case MEDIUM:
                rental.setTotalPrice(basePrice * 1.2);
                break;
            case PREMIUM:
                rental.setTotalPrice(basePrice * 1.3);
                break;
        }
    }

    private void updateCarAvailability(Car car, boolean available) {
        car.setAvailable(available);
        carRepository.save(car);
    }
}