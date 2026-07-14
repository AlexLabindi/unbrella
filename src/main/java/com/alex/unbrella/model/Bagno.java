package com.alex.unbrella.model;

import jakarta.persistence.*; // Contiene tutte le annotazioni standard per l'ORM (JPA)
import lombok.Data;          // Lombok: genera automaticamente Getter, Setter, toString, equals, ecc.
import java.util.List;

@Data // Evita la scrittura manuale del codice boilerplate (Getter/Setter) grazie a Lombok
@Entity // Indica a JPA che questa classe rappresenta una tabella nel Database
@Table(name = "bagni") // Specifica esplicitamente il nome della tabella nel DB
public class Bagno {

    @Id // Definisce la Chiave Primaria della tabella
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincremento gestito direttamente dal Database (SERIAL/BIGSERIAL in Postgres)
    private Long id;

    private String rg; // Diventa la colonna 'rg' nel DB (Ragione Sociale)
    private String indirizzo; // Diventa la colonna 'indirizzo' nel DB

    /*
     * @OneToMany: Relazione "Uno a Molti". Un Bagno possiede molti Ombrelloni.
     * - cascade = CascadeType.ALL: Qualsiasi operazione fatta sul Bagno (salvataggio, eliminazione)
     *   si ripercuote automaticamente a cascata sui suoi ombrelloni.
     * - orphanRemoval = true: Se rimuovi un Ombrellone da questa lista, JPA lo cancella fisicamente anche dal DB.
     */
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    /*
     * @JoinColumn: Crea la chiave esterna (Foreign Key) denominata "bagno_id" nella tabella "ombrelloni".
     * Mantiene la relazione pulita senza bisogno di una tabella di giunzione intermedia.
     */
    @JoinColumn(name = "bagno_id")
    private List<Ombrellone> ombrelloneList;

    // Relazione Uno a Molti: Un Bagno possiede molti Locali (stessa logica di cui sopra)
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "bagno_id") // Crea la Foreign Key "bagno_id" nella tabella "locali"
    private List<Locale> localeList;
}