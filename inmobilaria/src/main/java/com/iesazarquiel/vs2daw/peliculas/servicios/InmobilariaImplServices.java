package com.iesazarquiel.vs2daw.peliculas.servicios;

import com.iesazarquiel.vs2daw.peliculas.dao.*;
import com.iesazarquiel.vs2daw.peliculas.dto.ImagenesDto;
import com.iesazarquiel.vs2daw.peliculas.entity.*;
import com.iesazarquiel.vs2daw.peliculas.mapper.ImagenesMapper;
import jakarta.persistence.criteria.Predicate;
import org.antlr.v4.runtime.tree.pattern.ParseTreePattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class InmobilariaImplServices implements InmobilariaServices {
@Autowired
ImagenesDAO imagenesDAO;
@Autowired
InmobilariaDAO inmobilariaDAO;
@Autowired
LocalidadesDAO localidadesDAO;
@Autowired
RolesDAO rolesDAO;
@Autowired
TipoDAO tipoDAO;
@Autowired
UsuarioDAO usuarioDAO;
@Autowired
ViviendaDAO viviendaDAO;
@Autowired
EstadoDAO estadoDAO;

@Autowired
ImagenesMapper imagenesMapper;
public InmobilariaImplServices(ImagenesDAO imagenesDAO, InmobilariaDAO inmobilariaDAO, LocalidadesDAO localidadesDAO, RolesDAO rolesDAO, TipoDAO tipoDAO, UsuarioDAO usuarioDAO, ViviendaDAO viviendaDAO,ImagenesMapper imagenesMapper,EstadoDAO estadoDAO) {
    this.imagenesDAO = imagenesDAO;
    this.inmobilariaDAO = inmobilariaDAO;
    this.localidadesDAO = localidadesDAO;
    this.rolesDAO = rolesDAO;
    this.tipoDAO = tipoDAO;
    this.usuarioDAO = usuarioDAO;
    this.viviendaDAO = viviendaDAO;
    this.imagenesMapper = imagenesMapper;
    this.estadoDAO = estadoDAO;

    }


    @Override
    @Transactional
    public List<Vivienda> findViviendas() {
        return viviendaDAO.findAll();
    }

    @Override
    @Transactional
    public List<ImagenesDto> findAllImagenes() {
        List<Imagenes> imagenes = imagenesDAO.findAll();

        return imagenes.stream()
                .map(imagenesMapper::toDto)
                .collect(Collectors.toList());
    }
    @Override
    public List<Imagenes> findByFiltros(Integer habitaciones, Integer tipoId, Boolean garaje, Integer localidadId, BigDecimal precioMin, BigDecimal precioMax,Integer estadoId) {
        return imagenesDAO.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (habitaciones != null) {
                predicates.add(cb.equal(root.get("vivienda").get("habitaciones"), habitaciones));
            }
            if (tipoId != null) {
                predicates.add(cb.equal(root.get("vivienda").get("tipo").get("id"), tipoId));
            }
            if (garaje != null) {
                predicates.add(cb.equal(root.get("vivienda").get("garaje"), garaje ? 1 : 0));
            }
            if (localidadId != null) {
                predicates.add(cb.equal(root.get("vivienda").get("localidad").get("id"), localidadId));
            }
            if (precioMin != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("vivienda").get("precio"), precioMin));
            }
            if (precioMax != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("vivienda").get("precio"), precioMax));
            }
            if (estadoId != null) {
                predicates.add(cb.equal(root.get("vivienda").get("estado").get("id"), estadoId));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        });
    }

    @Override
    public List<Localidades> findAllLocalidades() {
    return localidadesDAO.findAll();
    }

    @Override
    public List<Estado> findAllEstados() {
        return estadoDAO.findAll();
    }

    @Override
    public Optional<Vivienda> viviendaPorId(Integer id) {
        return viviendaDAO.findById(id);
    }

    @Override
    public List<Imagenes> imagenPorIdVivvienda(Integer id) {
            return imagenesDAO.findByVivienda_Id(id);
    }
    @Transactional
    @Override
    public Vivienda guardarVivienda(Vivienda vivienda) {
        return viviendaDAO.save(vivienda);
    }
    @Transactional
    @Override
    public Imagenes guardarImagenes(Imagenes imagenes) {
        return imagenesDAO.save(imagenes);
    }
    @Transactional
    @Override
    public Vivienda actualizarVivienda(Vivienda vivienda) {

        return viviendaDAO.save(vivienda);

    }
    @Transactional
    @Override
    public Vivienda borrarVivienda(Integer id) {
     Vivienda vivienda = viviendaDAO.findById(id).get();
     viviendaDAO.delete(vivienda);
     return vivienda;

    }
    @Transactional
    @Override
    public Imagenes borrarImagenes(Integer id) {
    Imagenes imagenes = imagenesDAO.findById(id).get();
    imagenesDAO.delete(imagenes);
    return imagenes;
    }

    @Override
    public List<Inmobiliaria> findAllInmobiliarias() {
        return inmobilariaDAO.findAll();
    }
    @Override
    public Optional<Inmobiliaria> inmobiliariaPorId(Integer id) {
        return inmobilariaDAO.findById(id);
    }
    @Transactional
    @Override
    public Inmobiliaria guardarInmobiliaria(Inmobiliaria inmobiliaria) {
        return inmobilariaDAO.save(inmobiliaria);
    }
    @Transactional
    @Override
    public Inmobiliaria borrarInmobiliaria(Integer id) {
    Inmobiliaria inmobiliaria = inmobilariaDAO.findById(id).get();
    inmobilariaDAO.delete(inmobiliaria);
    return inmobiliaria;
    }
    @Override
    public Optional<Usuario> findByEmail(String email) {
        // Imprimir el resultado para verificar
        Optional<Usuario> usuario = usuarioDAO.findByEmail(email);
        return usuario;
    }
    @Override
    public Inmobiliaria inmobiliariaPoridUsuario(Integer idUsuario) {
        return inmobilariaDAO.findByUsuario_Id(idUsuario);
    }

    @Override
    public List<Vivienda> findViviendaPorIdInmobiliaria(Integer idInmobiliaria) {
        return viviendaDAO.findByInmobiliaria_Id(idInmobiliaria);
    }

    @Override
    public List<Tipo> findAllTipos() {
        return tipoDAO.findAll();
    }

    @Override
    public List<Usuario> findAllUsuarios() {
        return usuarioDAO.findAll();
    }

    @Override
    public Usuario usuarioPorId(Integer id) {
        return usuarioDAO.findById(id).get();
    }
    @Transactional
    @Override
    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioDAO.save(usuario);
    }
    @Transactional
    @Override
    public Usuario actualizarUsuario(Usuario usuario) {
        return usuarioDAO.save(usuario);
    }
    @Transactional
    @Override
    public Usuario borrarUsuario(Integer id) {
    Usuario usuario = usuarioDAO.findById(id).get();
         usuarioDAO.delete(usuario);
         return usuario;
    }

    @Override
    public List<Roles> findAllRoles() {
        return rolesDAO.findAll();
    }


    @Override
    public Map<String, Long> contarTodoPorEstado() {
        Map<String, Long> result = new HashMap<>();
        result.put("venta", viviendaDAO.countByEstado_Id(1));
        result.put("alquiler", viviendaDAO.countByEstado_Id(2));
        return result;
    }

    @Override
    public Map<String, Long> contarTodoPorTipo() {
        Map<String, Long> result = new HashMap<>();
        result.put("piso", viviendaDAO.countByTipo_Id(1));
        result.put("chalet", viviendaDAO.countByTipo_Id(2));
        result.put("adosado", viviendaDAO.countByTipo_Id(3));
        return result;

    }

    @Override
    public Map<String, Long> contarTodoPorLocalidad() {
        Map<String, Long> result = new HashMap<>();
        result.put("madrid", viviendaDAO.countByLocalidad_Id(1));
        result.put("barcelona", viviendaDAO.countByLocalidad_Id(2));
        return result;
    }

    @Override
    public Map<String, Long> contarEstadoPorInmobiliaria(Integer idInmobiliaria) {
        Map<String, Long> result = new HashMap<>();
        result.put("venta", viviendaDAO.countByEstado_IdAndInmobiliaria_Id(1,idInmobiliaria));
        result.put("alquiler", viviendaDAO.countByEstado_IdAndInmobiliaria_Id(2, idInmobiliaria));
        return result;
    }

    @Override
    public Map<String, Long> contarTipoPorInmobiliaria(Integer idInmobiliaria) {
        Map<String, Long> result = new HashMap<>();
        result.put("piso", viviendaDAO.countByTipo_IdAndInmobiliaria_Id(1,idInmobiliaria));
        result.put("chalet", viviendaDAO.countByTipo_IdAndInmobiliaria_Id(2, idInmobiliaria));
        result.put("adosado", viviendaDAO.countByTipo_IdAndInmobiliaria_Id(3, idInmobiliaria));
        return result;
    }

    @Override
    public Map<String, Long> contarLocalidadPorInmobiliaria(Integer idInmobiliaria) {
        Map<String, Long> result = new HashMap<>();
        result.put("madrid", viviendaDAO.countByLocalidad_IdAndInmobiliaria_Id(1, idInmobiliaria));
        result.put("barcelona", viviendaDAO.countByLocalidad_IdAndInmobiliaria_Id(2, idInmobiliaria));
        return result;
    }


}



