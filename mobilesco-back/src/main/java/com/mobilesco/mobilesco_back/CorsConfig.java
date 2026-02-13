package com.mobilesco.mobilesco_back;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        // Permite acceso desde el frontend en localhost:4200
        registry.addMapping("/**")  // Aplica para todas las rutas
          .allowedOrigins("http://76.13.30.221:8092",
                          "http://localhost:5173") // URL de tu frontend
          .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
          .allowedHeaders("*")
          .allowCredentials(true);
      }
    };
  }
}