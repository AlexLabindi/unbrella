package com.alex.unbrella.service;

import com.alex.unbrella.model.Bagno;
import com.alex.unbrella.repository.BagnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service // Registra la classe come Service nel contesto di Spring (Componente Business Logic)
public class BagnoService {

    @Autowired // Dependency Injection: Spring inietta automaticamente l'istanza del repository
    private BagnoRepository bagnoRepository;

    // Recupera l'elenco completo di tutti i bagni
    public List<Bagno> getAllBagni() {
        return bagnoRepository.findAll();
    }

    /*
     * Optional<Bagno>: Contenitore che può o meno racchiudere un valore non nullo.
     * Serve a prevenire i NullPointerException se cerchi un ID di un bagno che non esiste nel DB.
     */
    public Optional<Bagno> getBagnoById(Long id) {
        return bagnoRepository.findById(id);
    }

    // Salva un nuovo bagno o aggiorna uno esistente
    public Bagno saveBagno(Bagno bagno) {
        return bagnoRepository.save(bagno);
    }
}