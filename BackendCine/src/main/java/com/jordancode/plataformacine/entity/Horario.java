package com.jordancode.plataformacine.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Table(name = "horarios")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Horario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="movie_id",nullable = false)
    private Movie movie_id;

    @ManyToOne
    @JoinColumn(name="salas_id",nullable = false)
    private Salas salas_id;

    @Column(name="año",nullable = false)
    private String anio;
    
    private String mes;

    private String dia;

    private String hora;
 
    private String minutos;
}

