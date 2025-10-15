package com.ace_it.ace_it_back.repository;

import com.ace_it.ace_it_back.model.Profil;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfilRepository extends JpaRepository<Profil, Long> {
    List<Profil> findByTeamId(Long teamId);

}
