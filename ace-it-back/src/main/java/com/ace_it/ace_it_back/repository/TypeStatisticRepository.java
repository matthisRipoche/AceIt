package com.ace_it.ace_it_back.repository;

import com.ace_it.ace_it_back.model.TypeStatistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TypeStatisticRepository extends JpaRepository<TypeStatistic, Long> {
    List<TypeStatistic> findByTeamId(Long teamId);
}
