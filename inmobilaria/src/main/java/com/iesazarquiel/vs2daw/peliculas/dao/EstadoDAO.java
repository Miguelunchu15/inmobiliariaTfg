package com.iesazarquiel.vs2daw.peliculas.dao;

import com.iesazarquiel.vs2daw.peliculas.entity.Estado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstadoDAO extends JpaRepository<Estado, Integer> {
}
