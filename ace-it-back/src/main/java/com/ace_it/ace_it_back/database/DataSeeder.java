package com.ace_it.ace_it_back.database;

import com.ace_it.ace_it_back.model.*;
import com.ace_it.ace_it_back.repository.*;
import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class DataSeeder {

    private final PasswordEncoder passwordEncoder;

    public DataSeeder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    CommandLineRunner initDatabase(
            UserRepository userRepository,
            ProfilRepository profilRepository,
            MatchRepository matchRepository,
            TypeStatisticRepository typeStatRepository,
            StatisticRepository statisticRepository,
            TeamRepository teamRepository) {

        return args -> {
            Faker faker = new Faker();

            // --- USERS ---
            List<User> users = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                User user = new User();
                user.setFirstName(faker.name().firstName());
                user.setLastName(faker.name().lastName());
                user.setEmail(faker.internet().emailAddress());
                user.setPassword(passwordEncoder.encode(faker.internet().password()));
                user.setRole("USER");
                user.setCreatedAt(LocalDateTime.now());
                user.setUpdatedAt(LocalDateTime.now());
                userRepository.save(user);
                users.add(user);
            }

            User userTest = new User();
            userTest.setFirstName("UserTest");
            userTest.setLastName("UserTest");
            userTest.setEmail("user@user.com");
            userTest.setPassword(passwordEncoder.encode("user"));
            userTest.setRole("USER");
            userTest.setCreatedAt(LocalDateTime.now());
            userTest.setUpdatedAt(LocalDateTime.now());
            userRepository.save(userTest);
            users.add(userTest);

            User adminTest = new User();
            adminTest.setFirstName("AdminTest");
            adminTest.setLastName("AdminTest");
            adminTest.setEmail("admin@admin.com");
            adminTest.setPassword(passwordEncoder.encode("admin"));
            adminTest.setRole("ADMIN");
            adminTest.setCreatedAt(LocalDateTime.now());
            adminTest.setUpdatedAt(LocalDateTime.now());
            userRepository.save(adminTest);
            users.add(adminTest);

            System.out.println("✅ 12 utilisateurs générés en base !");

            // --- TEAMS & PROFILES ---
            List<Team> teams = new ArrayList<>();
            for (int i = 0; i < 5; i++) {
                Team team = new Team();
                team.setName(faker.team().name());
                team.setDivision(faker.options().option("SENIOR", "JUNIOR", "CADET"));
                team.setTeamPicturePath(faker.avatar().image());
                teamRepository.save(team);
                teams.add(team); // ✅ indispensable !

                // Profils de la team
                List<Profil> teamProfils = new ArrayList<>();

                // 6 joueurs
                for (int j = 0; j < 6; j++) {
                    Profil profil = new Profil();
                    profil.setNumber(faker.number().numberBetween(1, 99));
                    profil.setPosition(Profil.Position.valueOf(
                            faker.options().option("LIBERO", "PASSEUR", "CENTRAL", "RECEP_ATTAQUANT", "POINTU")));
                    profil.setHeight(faker.number().numberBetween(160, 210));
                    profil.setTeam(team);
                    profil.setUser(users.get(faker.number().numberBetween(0, users.size())));
                    profilRepository.save(profil);
                    teamProfils.add(profil);
                }

                Profil coach = new Profil();
                coach.setNumber(faker.number().numberBetween(1, 99));
                coach.setHeight(faker.number().numberBetween(160, 210));
                coach.setTeam(team);
                coach.setUser(users.get(faker.number().numberBetween(0, users.size())));
                profilRepository.save(coach);

                // 👇 Lie le coach à la team
                team.setCoach(coach);
                teamRepository.save(team);
            }

            // --- MATCHES ---
            for (int i = 0; i < 5; i++) {
                Match match = new Match();
                match.setTeamHome(teams.get(faker.number().numberBetween(0, teams.size())));
                match.setTeamAwayName(faker.team().name());
                match.setDate(faker.date().future(30, java.util.concurrent.TimeUnit.DAYS)
                        .toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDateTime());
                match.setLocation(faker.address().fullAddress());
                matchRepository.save(match);
            }

            // --- TYPE_STATISTIC ---
            String[] types = { "Service", "Réception", "Attaque", "Bloc" };
            List<TypeStatistic> typeStats = new ArrayList<>();
            for (String type : types) {
                TypeStatistic ts = new TypeStatistic();
                ts.setName(type);
                ts.setDescription(type + " stats");
                ts.setTeam(teams.get(0)); // assign à la première team
                typeStatRepository.save(ts);
                typeStats.add(ts);
            }

            // --- STATISTICS ---
            List<Profil> allProfils = profilRepository.findAll();
            List<Match> allMatches = matchRepository.findAll();
            for (int i = 0; i < 20; i++) {
                Statistic stat = new Statistic();
                stat.setValue(faker.number().numberBetween(0, 10));
                stat.setType(typeStats.get(faker.number().numberBetween(0, typeStats.size())));
                stat.setPlayer(allProfils.get(faker.number().numberBetween(0, allProfils.size())));
                stat.setMatch(allMatches.get(faker.number().numberBetween(0, allMatches.size())));
                statisticRepository.save(stat);
            }

            System.out.println("✅ Seed terminé !");
        };
    }
}
