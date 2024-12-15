package com.example.carrental.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import com.example.carrental.enums.InsuranceType;  // Ajoutez ceci
import com.example.carrental.enums.RentalStatus;   // Ajoutez ceci

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private Customer customer;
    
    @ManyToOne
    private Car car;
    
    private LocalDate startDate;
    private LocalDate endDate;
    
    @Enumerated(EnumType.STRING)
    private InsuranceType insuranceType;
    
    @Enumerated(EnumType.STRING)
    private RentalStatus status;
    
    private Double totalPrice;
}