package com.ace_it.ace_it_back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ace_it.ace_it_back.model.Profil;
import com.ace_it.ace_it_back.model.Team;
import com.ace_it.ace_it_back.repository.ProfilRepository;
import com.ace_it.ace_it_back.repository.TeamRepository;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin(origins = "*")
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private ProfilRepository profilRepository;

    @GetMapping
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @GetMapping("/{id}")
    public Team getTeamById(@PathVariable Long id) {
        return teamRepository.findById(id).orElse(null);
    }

    @GetMapping("/{id}/players")
    public List<Profil> getPlayersByTeamId(@PathVariable Long id) {
        return profilRepository.findByTeamId(id);
    }

}
