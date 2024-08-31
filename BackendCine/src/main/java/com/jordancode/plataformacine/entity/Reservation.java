package com.jordancode.plataformacine.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import java.util.List;

@Entity
@Table(name="reservation")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    @ManyToOne
    @JoinColumn(name = "horarios_id") // Asegúrate de que el nombre de la columna coincide con la tabla en la base de datos
    private Horario horario; 

    @ElementCollection
    @CollectionTable(name = "reservation_seats", joinColumns = @JoinColumn(name = "reservation_id"))
    @Column(name = "seat")
    private List<String> seats; 
}
