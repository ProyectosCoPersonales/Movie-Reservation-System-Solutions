package com.jordancode.plataformacine.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jordancode.plataformacine.entity.Horario;
import com.jordancode.plataformacine.entity.Reservation;
import com.jordancode.plataformacine.repository.HorarioRepository;
import com.jordancode.plataformacine.repository.ReservationRepository;
import jakarta.transaction.Transactional;

@Service
public class ReservationService {
    
    private final ReservationRepository reservationRepository;
    private final HorarioRepository horarioRepository;

    public ReservationService(ReservationRepository reservationRepository, HorarioRepository horarioRepository) {
        this.reservationRepository = reservationRepository;
        this.horarioRepository = horarioRepository;
    }

    public List<Reservation> findAllReservations() {
        return reservationRepository.findAll();
    }

    public void saveAll(List<Reservation> reservations) {
        reservationRepository.saveAll(reservations);
    }

    public boolean existsByHorario(Horario horario) {
        return reservationRepository.existsByHorario(horario);
    }

    @Transactional
    public void addSeatsToReservation(Long horarioId, List<String> newSeats) {
        Reservation reservation = reservationRepository.findByHorarioId(horarioId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found for the given HorarioId"));

        List<String> currentSeats = reservation.getSeats();
        currentSeats.addAll(newSeats);

        reservationRepository.save(reservation);
    }

    public List<String> getOccupiedSeats(Long horarioId) {
        Reservation reservation = reservationRepository.findByHorarioId(horarioId)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró la reserva para el Horario ID: " + horarioId));
        
        return reservation.getSeats();
    }
    
    @Transactional
    public void createReservationsForAllHorarios() {
        List<Horario> horarios = horarioRepository.findAll();
        
        for (Horario horario : horarios) {
            if (!reservationRepository.existsByHorario(horario)) {
                Reservation reservation = new Reservation();
                reservation.setHorario(horario);
                reservation.setSeats(new ArrayList<>());
                
                reservationRepository.save(reservation);
            }
        }
    }

    public List<Reservation> getReservationsByMovieId(Long movieId) {
        return reservationRepository.findReservationsByMovieId(movieId);
    }
}
