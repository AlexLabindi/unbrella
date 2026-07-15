package com.alex.unbrella.controller;

import com.alex.unbrella.model.Ombrellone;
import com.alex.unbrella.service.OmbrelloneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/ombrellone")
@CrossOrigin(origins = "http://localhost:5173")
public class OmbrelloneController {

  @Autowired
    private OmbrelloneService ombrelloneService;

    @PostMapping
    public ResponseEntity<Ombrellone> setOmbrellone(@RequestBody Long idOmbrellone) {
      Ombrellone ombrellone = ombrelloneService.prenotaOmbrellone(idOmbrellone);
      // 2. Usiamo Optional.ofNullable per avvolgere il risultato (che può essere nullo)
      return Optional.ofNullable(ombrellone)
              // Se l'oggetto è presente, rispondi con lo status 200 OK e l'ombrellone aggiornato nel body
              .map(omb -> ResponseEntity.ok(omb))
              // Se il service ha restituito null, costruisci una risposta 404 Not Found
              .orElse(ResponseEntity.notFound().build());
    }
}