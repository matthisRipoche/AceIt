package com.ace_it.ace_it_back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ace_it.ace_it_back.model.Statistic;
import com.ace_it.ace_it_back.repository.StatisticRepository;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(origins = "*")
public class StatisticController {

    @Autowired
    private StatisticRepository statisticRepository;

    @GetMapping
    public List<Statistic> getAllStatistics() {
        return statisticRepository.findAll();
    }
}
