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

import com.jordancode.plataformacine.entity.Horario;
import com.jordancode.plataformacine.service.HorarioService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/horario")
@CrossOrigin(origins = "*")
public class HorarioController {

    @Autowired
    private HorarioService horarioService;

    @PostMapping
    public ResponseEntity<Horario> createHorario(@RequestBody Horario horario) {
        try {
            Horario createdHorario = horarioService.createHorario(horario);
            return ResponseEntity.ok(createdHorario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping
    public List<Horario> getAllHorarios() {
        return horarioService.findAllHorarios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Horario> getHorario(@PathVariable Long id) {
        Optional<Horario> horario = horarioService.getHorario(id);
        return horario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHorario(@PathVariable Long id) {
        horarioService.deleteHorario(id);
        return ResponseEntity.noContent().build();
    }
}
