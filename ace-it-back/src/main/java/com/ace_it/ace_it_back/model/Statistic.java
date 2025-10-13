package com.ace_it.ace_it_back.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "statistic")
public class Statistic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ Valeur numérique de la statistique (ex : nombre de blocs, d’aces, etc.)
    @Column(nullable = false)
    private int value = 0;

    // ✅ Type de statistique (ex: "ACE", "BLOCK", etc.)
    @ManyToOne(optional = false)
    @JoinColumn(name = "type_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_statistic_type"))
    private TypeStatistic type;

    // ✅ Joueur concerné (profil)
    @ManyToOne(optional = false)
    @JoinColumn(name = "player_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_statistic_player"))
    private Profil player;

    // ✅ Match auquel appartient la statistique
    @ManyToOne(optional = false)
    @JoinColumn(name = "match_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_statistic_match"))
    private Match match;

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

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public TypeStatistic getType() {
        return type;
    }

    public void setType(TypeStatistic type) {
        this.type = type;
    }

    public Profil getPlayer() {
        return player;
    }

    public void setPlayer(Profil player) {
        this.player = player;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
