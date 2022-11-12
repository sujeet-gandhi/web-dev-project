package com.neu.onestopgo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.neu.onestopgo.controllers"})
public class OneStopGoApplication {

	public static void main(String[] args) {
		SpringApplication.run(OneStopGoApplication.class, args);
	}

}
