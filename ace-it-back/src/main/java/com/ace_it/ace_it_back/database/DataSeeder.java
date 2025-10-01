package com.ace_it.ace_it_back.database;

import com.ace_it.ace_it_back.model.Utilisateur;
import com.ace_it.ace_it_back.repository.UtilisateurRepository;
import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
public class DataSeeder {

    private final PasswordEncoder passwordEncoder;

    public DataSeeder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    CommandLineRunner initDatabase(UtilisateurRepository utilisateurRepository) {
        return args -> {
            Faker faker = new Faker();

            for (int i = 0; i < 10; i++) {
                Utilisateur utilisateur = new Utilisateur();
                utilisateur.setName(faker.name().fullName());
                utilisateur.setEmail(faker.internet().emailAddress());
                utilisateur.setMotDePasse(passwordEncoder.encode(faker.internet().password()));
                utilisateur.setRole("USER");
                utilisateur.setCreatedAt(LocalDateTime.now());
                utilisateur.setUpdatedAt(LocalDateTime.now());

                utilisateurRepository.save(utilisateur);
            }

            Utilisateur utilisateurUser = new Utilisateur();
            utilisateurUser.setName("UserTest");
            utilisateurUser.setEmail("user@user.com");
            utilisateurUser.setMotDePasse(passwordEncoder.encode("user"));
            utilisateurUser.setRole("USER");
            utilisateurUser.setCreatedAt(LocalDateTime.now());
            utilisateurUser.setUpdatedAt(LocalDateTime.now());

            utilisateurRepository.save(utilisateurUser);

            Utilisateur utilisateurAdmin = new Utilisateur();
            utilisateurAdmin.setName("AdminTest");
            utilisateurAdmin.setEmail("admin@admin.com");
            utilisateurAdmin.setMotDePasse(passwordEncoder.encode("admin"));
            utilisateurAdmin.setRole("ADMIN");
            utilisateurAdmin.setCreatedAt(LocalDateTime.now());
            utilisateurAdmin.setUpdatedAt(LocalDateTime.now());

            utilisateurRepository.save(utilisateurAdmin);

            System.out.println("✅ 12 utilisateurs générés en base !");
        };
    }
}
