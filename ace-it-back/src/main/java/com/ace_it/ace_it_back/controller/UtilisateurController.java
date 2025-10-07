package com.ace_it.ace_it_back.controller;

import com.ace_it.ace_it_back.model.Utilisateur;
import com.ace_it.ace_it_back.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "*")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @GetMapping
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @GetMapping("/{id}")
    public Utilisateur getUtilisateurById(@PathVariable Long id) {
        return utilisateurRepository.findById(id).orElse(null);
    }

    @PostMapping
    public void createUtilisateur(@RequestBody Utilisateur utilisateur) {
        utilisateurRepository.save(utilisateur);
    }

    @PutMapping("/{id}")
    public void updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {
        utilisateurRepository.save(utilisateur);
    }

    @DeleteMapping("/{id}")
    public void deleteUtilisateur(@PathVariable Long id) {
        utilisateurRepository.deleteById(id);
    }
}
