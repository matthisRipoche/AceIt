package com.ace_it.ace_it_back.database;

import com.ace_it.ace_it_back.model.Utilisateur;
import com.ace_it.ace_it_back.repository.UtilisateurRepository;
import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UtilisateurRepository utilisateurRepository) {
        return args -> {
            Faker faker = new Faker();

            for (int i = 0; i < 10; i++) {
                Utilisateur utilisateur = new Utilisateur();
                utilisateur.setName(faker.name().fullName());
                utilisateur.setEmail(faker.internet().emailAddress());
                utilisateur.setMotDePasse(faker.internet().password());
                utilisateur.setRole("USER");
                utilisateur.setCreatedAt(LocalDateTime.now());
                utilisateur.setUpdatedAt(LocalDateTime.now());

                utilisateurRepository.save(utilisateur);
            }

            System.out.println("✅ 10 utilisateurs générés en base !");
        };
    }
}
