package com.iesazarquiel.vs2daw.peliculas.dao;

import com.iesazarquiel.vs2daw.peliculas.entity.Imagenes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ImagenesDAO extends JpaRepository<Imagenes, Integer>, JpaSpecificationExecutor<Imagenes> {

   List<Imagenes> findByVivienda_Id(Integer id);
}
