package com.ace_it.ace_it_back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ace_it.ace_it_back.model.TypeStatistic;
import com.ace_it.ace_it_back.repository.TypeStatisticRepository;

@RestController
@RequestMapping("/api/types_statistic")
@CrossOrigin(origins = "*")
public class TypeStatisticController {

    @Autowired
    private TypeStatisticRepository typeStatisticRepository;

    @GetMapping
    public List<TypeStatistic> getAllTypeStatistics() {
        return typeStatisticRepository.findAll();
    }

}
