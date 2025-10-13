package com.ace_it.ace_it_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import com.ace_it.ace_it_back.dto.LoginRequest;
import com.ace_it.ace_it_back.model.User;
import com.ace_it.ace_it_back.repository.UtilisateurRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    // 🔑 variables pour JWT
    private final String jwtSecret = "dfa207c4d7c713a4b2f146df237b1a7bf69b4f6a5300d7ddf15c6cbaf8fd88b0";
    private final long jwtExpirationMs = 86400000;

    public AuthController(UtilisateurRepository utilisateurRepository, PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Chercher l’utilisateur par email
        User user = utilisateurRepository.findByEmail(loginRequest.getEmail())
                .orElse(null);

        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("❌ Email ou mot de passe incorrect");
        }

        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        // Génération du JWT
        String token = Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key)
                .compact();

        return ResponseEntity.ok(Map.of(
                "token", token,
                "role", user.getRole()));
    }
}
