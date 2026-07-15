package com.alex.unbrella.controller;

import com.alex.unbrella.model.Ombrellone;
import com.alex.unbrella.service.OmbrelloneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController // ⚙️ Indica che questa classe gestisce endpoint REST e risponde in formato JSON
@RequestMapping("/api/ombrelloni") // 🛣️ Prefisso URL comune per tutti gli endpoint di questa classe
@CrossOrigin(origins = "http://localhost:5173") // 🔌 Permette le chiamate AJAX da React (Porta 5173)
public class OmbrelloneController {

  @Autowired // 💉 Iniezione automatica del Service per la logica di business
  private OmbrelloneService ombrelloneService;

  /**
   * Endpoint: POST http://localhost:8090/api/ombrelloni/{id}/prenota
   *
   * @PathVariable Long id: Cattura l'ID dell'ombrellone direttamente dall'URL.
   * @return ResponseEntity<Ombrellone>: Risponde con 200 OK e l'oggetto aggiornato se la prenotazione ha successo,
   *         oppure con 404 Not Found se l'ombrellone non esiste o è già occupato.
   */
  @PostMapping("/{id}/prenota")
  public ResponseEntity<Ombrellone> prenotaOmbrellone(@PathVariable Long id) {
    // 1. Eseguiamo l'azione sul database tramite il service
    Ombrellone ombrelloneAggiornato = ombrelloneService.prenotaOmbrellone(id);

    // 2. Usiamo Optional.ofNullable per avvolgere il risultato (che può essere nullo)
    return Optional.ofNullable(ombrelloneAggiornato)
            // Se l'oggetto è presente, rispondi con lo status 200 OK e l'ombrellone aggiornato nel body
            .map(omb -> ResponseEntity.ok(omb))
            // Se il service ha restituito null, costruisci una risposta 404 Not Found
            .orElse(ResponseEntity.notFound().build());
  }
}