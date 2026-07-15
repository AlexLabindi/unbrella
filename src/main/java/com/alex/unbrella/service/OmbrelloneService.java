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

        // 2. Verifichiamo se l'oggetto è presente nel contenitore Optional
        if (optionalOmbrellone.isPresent()) {

            // Estraiamo l'oggetto reale usando .get()
            Ombrellone omb = optionalOmbrellone.get();
            if (omb.getP() == false || omb.getP() == null) {

                // Modifichiamo il campo booleano 'p' impostandolo a true (prenotato)
                omb.setP(true);

                // Salviamo l'entità aggiornata nel database e la restituiamo
                return ombrelloneRepository.save(omb);
            }

        }
            // 3. Gestione del caso in cui l'ID non esista (restituiamo null o lanciamo un'eccezione)
            return ombrelloneRepository.findById(idOmbrellone).orElse(null);
        }
        /*
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

    // 3. Ritorniamo l'ombrellone aggiornato cercandolo nuovamente,
    // oppure null se non è stato trovato o non è stato possibile prenotarlo
    return ombrelloneRepository.findById(idOmbrellone).orElse(null);
}*/
    }

