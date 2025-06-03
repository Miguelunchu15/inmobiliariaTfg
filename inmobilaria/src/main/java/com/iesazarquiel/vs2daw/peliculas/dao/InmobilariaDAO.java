package com.iesazarquiel.vs2daw.peliculas.dao;

import com.iesazarquiel.vs2daw.peliculas.entity.Inmobiliaria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InmobilariaDAO extends JpaRepository<Inmobiliaria, Integer> {

    Inmobiliaria findByUsuario_Id(Integer id);
}
