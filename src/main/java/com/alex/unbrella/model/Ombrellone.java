package com.alex.unbrella.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ombrelloni")
public class Ombrellone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer n; // Numero identificativo dell'ombrellone
    private char l;    // Lettera che identifica la fila (es. 'A', 'B')
    private Boolean p;// se attivo prenotato
}