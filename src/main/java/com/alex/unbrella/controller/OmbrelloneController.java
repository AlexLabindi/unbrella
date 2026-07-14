package com.alex.unbrella.controller;

import com.alex.unbrella.model.Ombrellone;
import com.alex.unbrella.service.OmbrelloneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bagni")
@CrossOrigin(origins = "http://localhost:5173")
public class OmbrelloneController {

  @Autowired
    private OmbrelloneService ombrelloneService;

    @PostMapping
    public Ombrellone setOmbrellone(@RequestBody Long idOmbrellone) {
        return ombrelloneService.prenotaOmbrellone(idOmbrellone);
    }
}