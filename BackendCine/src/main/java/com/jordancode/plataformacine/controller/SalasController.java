package com.jordancode.plataformacine.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jordancode.plataformacine.entity.Salas;
import com.jordancode.plataformacine.service.SalasService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/salas")
@CrossOrigin(origins = "*")
public class SalasController {

    @Autowired
    private SalasService salasService;

    @PostMapping
    public ResponseEntity<Salas> createSalas(@RequestBody Salas salas) {
        Salas createdSalas = salasService.createSalas(salas);
        return ResponseEntity.ok(createdSalas);
    }

    @GetMapping
    public List<Salas> getAllSalas() {
        return salasService.findAllSalas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Salas> getSalas(@PathVariable Long id) {
        Optional<Salas> salas = salasService.getSalas(id);
        return salas.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSalas(@PathVariable Long id) {
        salasService.deleteSalas(id);
        return ResponseEntity.noContent().build();
    }
}
