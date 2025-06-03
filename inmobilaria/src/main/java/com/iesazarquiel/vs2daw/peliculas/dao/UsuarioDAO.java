package com.iesazarquiel.vs2daw.peliculas.dao;

import com.iesazarquiel.vs2daw.peliculas.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioDAO extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail(String email);

}
