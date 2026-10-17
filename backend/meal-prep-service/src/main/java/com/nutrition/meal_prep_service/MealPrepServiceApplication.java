package com.nutrition.meal_prep_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class MealPrepServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MealPrepServiceApplication.class, args);
	}

}
