package com.ace_it.ace_it_back.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "type_statistic")
public class TypeStatistic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ Nom du type de statistique (ex: "Aces", "Blocks", "Attaques réussies")
    @Column(length = 100, nullable = false)
    private String name;

    // ✅ Description facultative
    @Column(length = 255)
    private String description;

    // ✅ Lien vers une équipe (optionnel)
    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_type_statistic_team"))
    private Team team;

    // ✅ Timestamps
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // --- Getters & Setters ---
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
