package com.alex.unbrella.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "locale")
public class Locale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String n;// Nome locale

    @Enumerated(EnumType.STRING)
    private Tipo t;
}
