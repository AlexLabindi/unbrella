package com.alex.unbrella.service;

import com.alex.unbrella.model.Bagno;
import com.alex.unbrella.repository.BagnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BagnoService {

    @Autowired
    private BagnoRepository bagnoRepository;

    // Ottieni tutti i bagni per la lista iniziale del frontend
    public List<Bagno> getAllBagni() {
        return bagnoRepository.findAll();
    }

    // Ottieni un singolo bagno tramite ID
    public Optional<Bagno> getBagnoById(Long id) {
        return bagnoRepository.findById(id);
    }

    // Salva o aggiorna un bagno
    public Bagno saveBagno(Bagno bagno) {
        return bagnoRepository.save(bagno);
    }
}
