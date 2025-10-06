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

    @DeleteMapping("/{id}")
    public void deleteUtilisateur(@PathVariable Long id) {
        utilisateurRepository.deleteById(id);
    }
}
