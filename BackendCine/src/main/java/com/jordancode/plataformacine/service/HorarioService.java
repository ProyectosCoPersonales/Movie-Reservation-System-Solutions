package com.jordancode.plataformacine.service;

import org.springframework.stereotype.Service;
import com.jordancode.plataformacine.entity.Horario;
import com.jordancode.plataformacine.repository.HorarioRepository;
import java.util.List;
import java.util.Optional;

@Service
public class HorarioService {

    private HorarioRepository horarioRepository;
    

    public HorarioService(HorarioRepository horarioRepository) {
        this.horarioRepository = horarioRepository;
    }

    public List<Horario> findAllHorarios() {
        return horarioRepository.findAll();
    }

    public Horario createHorario(Horario Horario) {
        return horarioRepository.save(Horario);
    }

    public Optional<Horario> getHorario(Long id) {
        return horarioRepository.findById(id);
    }

    public Horario updateHorario(Long id, Horario HorarioDetails) {
        if (horarioRepository.existsById(id)) {
            HorarioDetails.setId(id);
            return horarioRepository.save(HorarioDetails);
        }
        return null;
    }

    public void deleteHorario(Long id) {
        horarioRepository.deleteById(id);
    }

    public List<Horario> getAllHorarios() {
        return horarioRepository.findAll();
    }

}

