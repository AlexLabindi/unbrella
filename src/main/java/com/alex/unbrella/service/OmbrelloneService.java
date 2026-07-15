package com.alex.unbrella.service;

import com.alex.unbrella.model.Bagno;
import com.alex.unbrella.model.Ombrellone;
import com.alex.unbrella.repository.BagnoRepository;
import com.alex.unbrella.repository.OmbrelloneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OmbrelloneService {

    @Autowired // Dependency Injection: Spring inietta automaticamente l'istanza del repository
    private OmbrelloneRepository ombrelloneRepository;


    public List<Ombrellone> getAllOmbrellone() {
        return ombrelloneRepository.findAll();
    }


    public Optional<Ombrellone> getOmbrelloneById(Long id) {
        return ombrelloneRepository.findById(id);
    }


        public Ombrellone prenotaOmbrellone(Long idOmbrellone) {
        // 1. Cerchiamo l'ombrellone nel database tramite ID
    Optional<Ombrellone> optionalOmbrellone = ombrelloneRepository.findById(idOmbrellone);

    // 2. Usiamo ifPresent con una Lambda Expression (omb -> ...)
    // Il codice dentro le graffe viene eseguito SOLO se l'ombrellone esiste nel DB
    optionalOmbrellone.ifPresent(omb -> {
        // Controlliamo se l'ombrellone NON è già prenotato (quindi se p è false o null)
        if (omb.getP() == null || !omb.getP()) {
            // Settiamo lo stato a true
            omb.setP(true);
            // Salviamo l'entità aggiornata nel database
            ombrelloneRepository.save(omb);
        }
    });
//
    // 3. Ritorniamo l'ombrellone aggiornato cercandolo nuovamente,
    // oppure null se non è stato trovato o non è stato possibile prenotarlo
    return ombrelloneRepository.findById(idOmbrellone).orElse(null);
}
    }

