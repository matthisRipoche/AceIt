package com.ace_it.ace_it_back.database;

import com.ace_it.ace_it_back.model.User;
import com.ace_it.ace_it_back.model.Profil;
import com.ace_it.ace_it_back.model.Match;
import com.ace_it.ace_it_back.model.Statistic;
import com.ace_it.ace_it_back.model.Team;
import com.ace_it.ace_it_back.model.TypeStatistic;

import com.ace_it.ace_it_back.repository.MatchRepository;
import com.ace_it.ace_it_back.repository.ProfilRepository;
import com.ace_it.ace_it_back.repository.StatisticRepository;
import com.ace_it.ace_it_back.repository.TeamRepository;
import com.ace_it.ace_it_back.repository.TypeStatisticRepository;
import com.ace_it.ace_it_back.repository.UserRepository;

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
    CommandLineRunner initDatabase(
            UserRepository utilisateurRepository,
            ProfilRepository profilRepository,
            MatchRepository matchRepository,
            TypeStatisticRepository typeStatRepository,
            StatisticRepository statisticRepository,
            TeamRepository teamRepository) {
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

            for (int i = 0; i < 5; i++) {
                Team team = new Team();
                team.setName(faker.team().name());
                team.setDivision(faker.options().option("SENIOR", "JUNIOR", "CADET"));
                team.setTeamPicturePath(faker.avatar().image());
                team.setCoach(utilisateurRepository.findById(1L).orElse(null)); // exemple
                teamRepository.save(team);

                // --- PROFILS pour chaque team ---
                for (int j = 0; j < 6; j++) {
                    Profil profil = new Profil();
                    profil.setNumber(faker.number().numberBetween(1, 99));
                    String randomPositionString = faker.options().option("LIBERO", "PASSEUR", "CENTRAL",
                            "RECEP_ATTAQUANT", "POINTU");
                    Profil.Position positionEnum = Profil.Position.valueOf(randomPositionString);
                    profil.setPosition(positionEnum);
                    profil.setHeight(faker.number().numberBetween(160, 210));
                    profil.setProfilePicturePath(faker.avatar().image());
                    profil.setTeam(team);
                    profil.setUser(utilisateurRepository.findById(faker.number().numberBetween(1, 12L)).orElse(null));
                    profilRepository.save(profil);
                }
            }

            // --- MATCHES ---
            for (int i = 0; i < 5; i++) {
                Match match = new Match();
                match.setTeamHome(teamRepository.findById(faker.number().numberBetween(1, 5L)).orElse(null));
                match.setTeamAwayName(faker.team().name());
                match.setDate(faker.date().future(30, java.util.concurrent.TimeUnit.DAYS).toInstant()
                        .atZone(java.time.ZoneId.systemDefault()).toLocalDateTime());
                match.setLocation(faker.address().fullAddress());
                matchRepository.save(match);
            }

            // --- TYPE_STATISTIC ---
            String[] types = { "Service", "Réception", "Attaque", "Bloc" };
            for (String type : types) {
                TypeStatistic ts = new TypeStatistic();
                ts.setName(type);
                ts.setDescription(type + " stats");
                ts.setTeam(teamRepository.findById(1L).orElse(null));
                typeStatRepository.save(ts);
            }

            // --- STATISTICS ---
            for (int i = 0; i < 20; i++) {
                Statistic stat = new Statistic();
                stat.setValue(faker.number().numberBetween(0, 10));
                stat.setType(
                        typeStatRepository.findById(faker.number().numberBetween(1, types.length + 1L)).orElse(null));
                stat.setPlayer(profilRepository.findById(faker.number().numberBetween(1, 30L)).orElse(null));
                stat.setMatch(matchRepository.findById(faker.number().numberBetween(1, 5L)).orElse(null));
                statisticRepository.save(stat);
            }
        };
    }
}
