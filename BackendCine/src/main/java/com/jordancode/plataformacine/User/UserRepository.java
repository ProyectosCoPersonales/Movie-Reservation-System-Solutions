package com.jordancode.plataformacine.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);

    void deleteById(Long id); 
}
