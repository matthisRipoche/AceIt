package com.ace_it.ace_it_back.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "match")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ Équipe à domicile (relation obligatoire)
    @ManyToOne(optional = false)
    @JoinColumn(name = "team_home_id", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name = "fk_match_team_home"))
    private Team teamHome;

    // ✅ Nom de l’équipe adverse (simple texte, pas une relation)
    @Column(length = 100)
    private String teamAwayName;

    // ✅ Date du match
    @Column(nullable = false)
    private LocalDateTime date;

    // ✅ Lieu du match
    @Column(length = 255)
    private String location;

    // ✅ Timestamps
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

    public Team getTeamHome() {
        return teamHome;
    }

    public void setTeamHome(Team teamHome) {
        this.teamHome = teamHome;
    }

    public String getTeamAwayName() {
        return teamAwayName;
    }

    public void setTeamAwayName(String teamAwayName) {
        this.teamAwayName = teamAwayName;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
