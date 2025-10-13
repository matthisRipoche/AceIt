package com.ace_it.ace_it_back.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 100)
    private String division = "SENIOR";

    @Column(length = 255)
    private String teamPicturePath;

    // ✅ Relation avec l'entraîneur (coach)
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "coach_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_team_profil"))
    private Profil coach;

    // ✅ Timestamps automatiques
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // --- Getters / Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public String getTeamPicturePath() {
        return teamPicturePath;
    }

    public void setTeamPicturePath(String teamPicturePath) {
        this.teamPicturePath = teamPicturePath;
    }

    public Profil getCoach() {
        return coach;
    }

    public void setCoach(Profil coach) {
        this.coach = coach;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
