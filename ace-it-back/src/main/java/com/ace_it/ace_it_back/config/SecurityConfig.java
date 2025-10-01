package com.ace_it.ace_it_back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF off pour ton API
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll() // libre accès aux routes d'auth
                        .anyRequest().authenticated() // tout le reste => protégé
                )
                .formLogin(form -> form.disable()) // désactive le /login HTML par défaut
                .httpBasic(httpBasic -> httpBasic.disable()); // pas de Basic Auth non plus

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
