package com.mobilesco.mobilesco_back.config;

import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.mobilesco.mobilesco_back.models.RolModel;
import com.mobilesco.mobilesco_back.models.UsuarioModel;
import com.mobilesco.mobilesco_back.repositories.RolRepository;
import com.mobilesco.mobilesco_back.repositories.UsuarioRepository;

@Configuration
public class DataSeeder {

    @Bean
    @SuppressWarnings("unused")
    CommandLineRunner initData(RolRepository roleRepo,
                              UsuarioRepository userRepo,
                              PasswordEncoder passwordEncoder) {
        return args -> {

            // 1) Crear roles si no existen
            RolModel adminRole = roleRepo.findByName("ADMIN").orElseGet(() -> {
                RolModel r = new RolModel();
                r.setName("ADMIN");
                return roleRepo.save(r);
            });

            RolModel employeeRole = roleRepo.findByName("EMPLOYEE").orElseGet(() -> {
                RolModel r = new RolModel();
                r.setName("EMPLOYEE");
                return roleRepo.save(r);
            });

            // 2) Crear usuario admin si no existe
            String adminEmail = "admin@mobilesco.com";

            if (!userRepo.existsByEmail(adminEmail)) {
                UsuarioModel u = new UsuarioModel();
                u.setEmail(adminEmail);

                // Aquí convertimos "Admin123!" a hash bcrypt
                u.setPasswordHash(passwordEncoder.encode("Admin123!"));

                u.setEnabled(true);
                u.setLocked(false);

                // Asignar rol ADMIN
                u.setRoles(Set.of(adminRole));

                userRepo.save(u);

                System.out.println("✅ Admin creado: " + adminEmail + " / Admin123!");
            } else {
                System.out.println("ℹ️ Admin ya existe: " + adminEmail);
            }
        };
    }
}
