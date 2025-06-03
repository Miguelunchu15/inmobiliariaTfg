package com.iesazarquiel.vs2daw.peliculas.dao;

import com.iesazarquiel.vs2daw.peliculas.entity.Tipo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipoDAO extends JpaRepository<Tipo, Integer> {
}
