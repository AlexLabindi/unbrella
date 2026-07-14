package com.alex.unbrella.repository;

import com.alex.unbrella.model.Bagno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Dice a Spring che questa interfaccia gestisce l'accesso al database (Componente di persistenza)
public interface BagnoRepository extends JpaRepository<Bagno, Long> {
    /*
     * Estendendo JpaRepository<Entità, TipoChiavePrimaria>, Spring Boot genera a runtime
     * l'implementazione con tutti i metodi CRUD standard pronti all'uso:
     * - findAll()          -> Esegue "SELECT * FROM bagni"
     * - findById(id)       -> Esegue "SELECT * FROM bagni WHERE id = ?"
     * - save(entità)       -> Esegue "INSERT" o "UPDATE" a seconda che l'id esista o meno
     * - deleteById(id)     -> Esegue "DELETE FROM bagni WHERE id = ?"
     */

}