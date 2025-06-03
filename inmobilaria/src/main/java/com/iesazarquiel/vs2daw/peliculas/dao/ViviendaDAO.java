package com.iesazarquiel.vs2daw.peliculas.dao;

import com.iesazarquiel.vs2daw.peliculas.entity.Vivienda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ViviendaDAO extends JpaRepository<Vivienda, Integer>, JpaSpecificationExecutor<Vivienda> {

    List<Vivienda> findByInmobiliaria_Id(Integer id);


    long countByEstado_Id(Integer id);

    long countByTipo_Id(Integer id);

    long countByLocalidad_Id(Integer id);

    long countByTipo_IdAndInmobiliaria_Id(Integer id, Integer id1);

    long countByEstado_IdAndInmobiliaria_Id(Integer id, Integer id1);

    long countByLocalidad_IdAndInmobiliaria_Id(Integer id, Integer id1);
}
