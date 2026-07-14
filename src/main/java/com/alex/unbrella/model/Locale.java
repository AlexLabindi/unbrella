package com.alex.unbrella.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "locali")
public class Locale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String n; // Nome del locale (es. "Baraonda")

    /*
     * @Enumerated(EnumType.STRING): Dice a JPA di salvare nel database il valore testuale
     * dell'Enum (es. "BAR", "WC") invece dell'indice numerico (0, 1, 2).
     * È fondamentale per la leggibilità del database e per evitare bug se inserisci nuovi elementi nell'Enum.
     */
    @Enumerated(EnumType.STRING)
    private Tipo t; // Tipo di locale (Enum)
}