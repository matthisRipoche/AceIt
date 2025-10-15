package com.ace_it.ace_it_back.repository;

import com.ace_it.ace_it_back.model.Team;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findByName(String name);

    List<Team> findByDivision(String division);

}
