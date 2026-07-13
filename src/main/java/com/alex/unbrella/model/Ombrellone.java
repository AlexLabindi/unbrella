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

    private Integer n;
    private char l;
}
