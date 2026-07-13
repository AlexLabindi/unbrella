package com.alex.unbrella.controller;

import com.alex.unbrella.model.Bagno;
import com.alex.unbrella.model.Ombrellone;
import com.alex.unbrella.service.BagnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bagni")
@CrossOrigin(origins = "http://localhost:5173") // Permette a Vite/React di fare chiamate qui
public class BagnoController {

    @Autowired
    private BagnoService bagnoService;

    // GET http://localhost:8090/api/bagni
    @GetMapping
    public List<Bagno> getAllBagni() {
        return bagnoService.getAllBagni();
    }

    // GET http://localhost:8080/api/bagni/{id}/ombrelloni
    // Questo serve esattamente per la richiesta del tuo frontend!
    @GetMapping("/{id}/ombrelloni")
    public ResponseEntity<List<Ombrellone>> getOmbrelloniByBagno(@PathVariable Long id) {
        return bagnoService.getBagnoById(id)
                .map(bagno -> ResponseEntity.ok(bagno.getOmbrelloneList()))
                .orElse(ResponseEntity.notFound().build());
    }

    // POST http://localhost:8080/api/bagni (Per inserire dati di prova)
    @PostMapping("/{bagno}")
    public Bagno createBagno(@RequestBody Bagno bagno) {
        return bagnoService.saveBagno(bagno);
    }
}