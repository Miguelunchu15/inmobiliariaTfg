package com.iesazarquiel.vs2daw.peliculas.servicios;

import com.iesazarquiel.vs2daw.peliculas.dto.ImagenesDto;
import com.iesazarquiel.vs2daw.peliculas.entity.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;


public interface InmobilariaServices {
    List<Vivienda> findViviendas();
    List<ImagenesDto> findAllImagenes();
    List<Imagenes> findByFiltros(Integer habitaciones, Integer tipoId, Boolean garaje, Integer localidadId, BigDecimal precioMin, BigDecimal precioMax,Integer estadoId);
    List<Localidades> findAllLocalidades();
    List<Estado> findAllEstados();
    Optional<Vivienda> viviendaPorId(Integer id);
    List<Imagenes> imagenPorIdVivvienda(Integer id);
    Vivienda guardarVivienda(Vivienda vivienda);
    Imagenes guardarImagenes(Imagenes imagenes);
    Vivienda actualizarVivienda(Vivienda vivienda);
    Vivienda borrarVivienda(Integer id);
    Imagenes borrarImagenes(Integer id);
    List<Inmobiliaria> findAllInmobiliarias();
    Inmobiliaria guardarInmobiliaria(Inmobiliaria inmobiliaria);
    Inmobiliaria borrarInmobiliaria(Integer id);
    Optional<Inmobiliaria> inmobiliariaPorId(Integer id);
    Optional<Usuario> findByEmail(String email);
    Inmobiliaria inmobiliariaPoridUsuario(Integer idUsuario);
   List <Vivienda> findViviendaPorIdInmobiliaria(Integer idInmobiliaria);
   List <Tipo> findAllTipos();
   List<Usuario> findAllUsuarios();
   Usuario usuarioPorId(Integer id);
   Usuario guardarUsuario(Usuario usuario);
   Usuario actualizarUsuario(Usuario usuario);
   Usuario borrarUsuario(Integer id);
   List<Roles> findAllRoles();
   Map<String, Long> contarTodoPorEstado();
   Map<String, Long> contarTodoPorTipo();
   Map<String, Long> contarTodoPorLocalidad();
    Map<String, Long> contarEstadoPorInmobiliaria(Integer idInmobiliaria);
    Map<String, Long> contarTipoPorInmobiliaria(Integer idInmobiliaria);
    Map<String, Long> contarLocalidadPorInmobiliaria(Integer idInmobiliaria);







}
