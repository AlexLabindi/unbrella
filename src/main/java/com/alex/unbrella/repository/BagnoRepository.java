package com.alex.unbrella.repository;

import com.alex.unbrella.model.Bagno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

    @Repository
    public interface BagnoRepository extends JpaRepository<Bagno, Long> {
        // Avrai già gratis metodi come findAll(), findById(), save(), deleteById()
    }

