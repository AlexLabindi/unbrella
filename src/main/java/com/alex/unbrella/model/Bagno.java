package com.alex.unbrella.model;

import jakarta.persistence.*;
import lombok.Data;


import java.util.List;

@Data
@Entity
@Table(name = "bagni")
public class Bagno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Aggiunto ID per JPA

    private String rg; // Ragione Sociale
    private String indirizzo;

    // Un Bagno ha molti Ombrelloni. cascade e orphanRemoval servono a gestire
    // la vita degli ombrelloni insieme a quella del bagno.
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "bagno_id") // Crea la chiave esterna nella tabella ombrelloni
    private List<Ombrellone> ombrelloneList;

    // Un Bagno ha molti Locali
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "bagno_id") // Crea la chiave esterna nella tabella locali
    private List<Locale> localeList;
}
