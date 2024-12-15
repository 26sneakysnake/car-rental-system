package com.example.carrental;

import com.example.carrental.controllers.CarController;
import com.example.carrental.models.Car;
import com.example.carrental.repositories.CarRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CarController.class)
public class CarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CarRepository carRepository;

    @Test
    public void getAllCars_shouldReturnList() throws Exception {
        Car car = new Car();
        car.setBrand("Toyota");
        car.setModel("Camry");
        car.setYear(2023);
        car.setLicensePlate("ABC123");
        car.setDailyRate(50.0);
        car.setAvailable(true);

        when(carRepository.findAll()).thenReturn(Arrays.asList(car));

        mockMvc.perform(get("/api/cars"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].brand").value("Toyota"))
                .andExpect(jsonPath("$[0].model").value("Camry"));
    }

    @Test
    public void getCarById_shouldReturnCar() throws Exception {
        Car car = new Car();
        car.setId(1L);
        car.setBrand("Toyota");
        car.setModel("Camry");

        when(carRepository.findById(1L)).thenReturn(Optional.of(car));

        mockMvc.perform(get("/api/cars/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.brand").value("Toyota"));
    }

    @Test
    public void addCar_shouldReturnSavedCar() throws Exception {
        Car car = new Car();
        car.setBrand("Toyota");
        car.setModel("Camry");

        when(carRepository.save(any(Car.class))).thenReturn(car);

        mockMvc.perform(post("/api/cars")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"brand\":\"Toyota\",\"model\":\"Camry\",\"year\":2023,\"licensePlate\":\"ABC123\",\"dailyRate\":50.0,\"available\":true}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.brand").value("Toyota"));
    }
}