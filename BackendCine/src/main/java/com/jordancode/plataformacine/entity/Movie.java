package com.jordancode.plataformacine.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "movies")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(columnDefinition = "TEXT",nullable = false)
    private String description;

    @Column(columnDefinition = "TEXT",nullable = false)
    private String posterImage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Genre genre;

    @Column(nullable = false)
    private String duracion;

    public enum Genre {
        drama, thriller, comedy, fantasy, romance, science, fiction, adventure, sports, action, western, horror, musical, mystery
    }

}
