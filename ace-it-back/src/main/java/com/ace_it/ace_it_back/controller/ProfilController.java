package com.ace_it.ace_it_back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ace_it.ace_it_back.model.Profil;
import com.ace_it.ace_it_back.repository.ProfilRepository;

@RestController
@RequestMapping("/api/profils")
@CrossOrigin(origins = "*")
public class ProfilController {

    @Autowired
    private ProfilRepository profilRepository;

    @GetMapping
    public List<Profil> getAllProfils() {
        return profilRepository.findAll();
    }

}
