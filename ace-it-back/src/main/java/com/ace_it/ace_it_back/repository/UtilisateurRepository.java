package com.ace_it.ace_it_back.repository;

import com.ace_it.ace_it_back.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    // Tu peux ajouter des méthodes custom plus tard
}
