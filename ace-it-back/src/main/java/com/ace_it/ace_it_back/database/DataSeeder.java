package com.ace_it.ace_it_back.database;

import com.ace_it.ace_it_back.model.User;
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
                User utilisateur = new User();
                utilisateur.setFirstName(faker.name().firstName());
                utilisateur.setLastName(faker.name().lastName());
                utilisateur.setEmail(faker.internet().emailAddress());
                utilisateur.setPassword(passwordEncoder.encode(faker.internet().password()));
                utilisateur.setRole("USER");
                utilisateur.setCreatedAt(LocalDateTime.now());
                utilisateur.setUpdatedAt(LocalDateTime.now());

                utilisateurRepository.save(utilisateur);
            }

            User utilisateurUser = new User();
            utilisateurUser.setFirstName("UserTest");
            utilisateurUser.setLastName("UserTest");
            utilisateurUser.setEmail("user@user.com");
            utilisateurUser.setPassword(passwordEncoder.encode("user"));
            utilisateurUser.setRole("USER");
            utilisateurUser.setCreatedAt(LocalDateTime.now());
            utilisateurUser.setUpdatedAt(LocalDateTime.now());

            utilisateurRepository.save(utilisateurUser);

            User utilisateurAdmin = new User();
            utilisateurAdmin.setFirstName("AdminTest");
            utilisateurAdmin.setLastName("AdminTest");
            utilisateurAdmin.setEmail("admin@admin.com");
            utilisateurAdmin.setPassword(passwordEncoder.encode("admin"));
            utilisateurAdmin.setRole("ADMIN");
            utilisateurAdmin.setCreatedAt(LocalDateTime.now());
            utilisateurAdmin.setUpdatedAt(LocalDateTime.now());

            utilisateurRepository.save(utilisateurAdmin);

            System.out.println("✅ 12 utilisateurs générés en base !");
        };
    }
}
