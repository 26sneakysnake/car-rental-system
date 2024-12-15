package com.example.carrental.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String brand;        // marque
    private String model;        // modèle
    private int year;           // année
    private String licensePlate; // plaque d'immatriculation
    private double dailyRate;    // tarif journalier
    private boolean available;   // disponibilité
}