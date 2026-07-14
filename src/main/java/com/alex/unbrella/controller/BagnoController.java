package com.alex.unbrella.controller;

import com.alex.unbrella.model.Bagno;
import com.alex.unbrella.model.Ombrellone;
import com.alex.unbrella.service.BagnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Unisce @Controller e @ResponseBody. Indica che i metodi restituiscono dati (JSON) direttamente nel corpo della risposta HTTP
@RequestMapping("/api/bagni") // Base URL per tutti gli endpoint contenuti in questa classe
/*
 * @CrossOrigin: Abilita la condivisione delle risorse tra origini differenti.
 * Di default, i browser bloccano richieste AJAX fatte da un dominio (React su localhost:5173)
 * verso un altro (Spring su localhost:8090). Questa annotazione disattiva il blocco CORS.
 */
@CrossOrigin(origins = "http://localhost:5173")
public class BagnoController {

    @Autowired
    private BagnoService bagnoService;


    /**
     * Endpoint: GET http://localhost:8090/api/bagni
     * Restituisce la lista completa di tutti i bagni registrati (usata da React per popolare la tendina)
     */
    @GetMapping
    public List<Bagno> getAllBagni() {
        return bagnoService.getAllBagni();
    }

    /**
     * Endpoint: GET http://localhost:8090/api/bagni/{id}/ombrelloni
     * @PathVariable Long id: Estrae il valore dall'URL e lo passa come parametro.
     * Restituisce solo la lista di ombrelloni di quel determinato bagno.
     *
     * Utilizza ResponseEntity per gestire esplicitamente lo Status Code HTTP (200 OK o 404 NOT FOUND).
     */
    @GetMapping("/{id}/ombrelloni")
    public ResponseEntity<List<Ombrellone>> getOmbrelloniByBagno(@PathVariable Long id) {
        return bagnoService.getBagnoById(id)
                // Se il bagno viene trovato, estrai la lista degli ombrelloni e rispondi con 200 OK + JSON
                .map(bagno -> ResponseEntity.ok(bagno.getOmbrelloneList()))
                // Se il Optional è vuoto (bagno non trovato), restituisci lo status HTTP 404 Not Found
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Endpoint: POST http://localhost:8090/api/bagni
     * @RequestBody Bagno bagno: Prende il JSON inviato nel corpo della richiesta HTTP e lo deserializza in un oggetto Java Bagno
     */
    @PostMapping
    public Bagno createBagno(@RequestBody Bagno bagno) {
        return bagnoService.saveBagno(bagno);
    }

}