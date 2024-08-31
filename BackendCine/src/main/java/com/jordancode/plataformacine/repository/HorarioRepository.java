package com.jordancode.plataformacine.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jordancode.plataformacine.entity.Horario;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, Long>{

}
