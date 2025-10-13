package com.ace_it.ace_it_back.controller;

import com.ace_it.ace_it_back.model.User;
import com.ace_it.ace_it_back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "*")
public class UtilisateurController {

    @Autowired
    private UserRepository utilisateurRepository;

    @GetMapping
    public List<User> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUtilisateurById(@PathVariable Long id) {
        return utilisateurRepository.findById(id).orElse(null);
    }

    @PostMapping
    public void createUtilisateur(@RequestBody User utilisateur) {
        utilisateurRepository.save(utilisateur);
    }

    @PutMapping("/{id}")
    public void updateUtilisateur(@PathVariable Long id, @RequestBody User utilisateur) {
        utilisateurRepository.save(utilisateur);
    }

    @DeleteMapping("/{id}")
    public void deleteUtilisateur(@PathVariable Long id) {
        utilisateurRepository.deleteById(id);
    }
}
