package com.iesazarquiel.vs2daw.peliculas.rest;

import com.iesazarquiel.vs2daw.peliculas.dto.ImagenesDto;
import com.iesazarquiel.vs2daw.peliculas.entity.*;
import com.iesazarquiel.vs2daw.peliculas.servicios.InmobilariaServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/inmobilaria")
public class InmobilariaRestController {
    @Autowired
    InmobilariaServices inmobilariaServices;

    public InmobilariaRestController(InmobilariaServices inmobilariaServices) {
        this.inmobilariaServices = inmobilariaServices;
    }

    @GetMapping("/viviendas")
    public List<Vivienda> findViviendas() {
        return inmobilariaServices.findViviendas();
    }

    @GetMapping("/imagenes")
    public List<ImagenesDto> findAllImagenes() {
        return inmobilariaServices.findAllImagenes();
    }

    @GetMapping("/viviendas/filtros")
    public List<Imagenes> filtrarViviendas(
            @RequestParam(required = false) Integer habitaciones,
            @RequestParam(required = false) Integer tipoId,
            @RequestParam(required = false) Boolean garaje,
            @RequestParam(required = false) Integer localidadId,
            @RequestParam(required = false) BigDecimal precioMin,
            @RequestParam(required = false) BigDecimal precioMax,
            @RequestParam(required = false) Integer estadoId
    ) {
        return inmobilariaServices.findByFiltros(habitaciones, tipoId, garaje, localidadId, precioMin, precioMax, estadoId);
    }

    @GetMapping("/localidades")
    public List<com.iesazarquiel.vs2daw.peliculas.entity.Localidades> findAllLocalidades() {
        return inmobilariaServices.findAllLocalidades();
    }

    @GetMapping("/estados")
    public List<com.iesazarquiel.vs2daw.peliculas.entity.Estado> findAllEstados() {
        return inmobilariaServices.findAllEstados();
    }

    @GetMapping("/viviendas/{id}")
    public Optional<Vivienda> viviendaPorId(@PathVariable Integer id) {

        return inmobilariaServices.viviendaPorId(id);
    }

    @GetMapping("/imagenes/{idVivienda}")
    public List<Imagenes> imagenPorIdVivvienda(@PathVariable Integer idVivienda) {
        return inmobilariaServices.imagenPorIdVivvienda(idVivienda);
    }

    @PostMapping("/viviendas")
    public Vivienda guardarVivienda(@RequestBody Vivienda vivienda) {
        return inmobilariaServices.guardarVivienda(vivienda);
    }

    @PostMapping("/imagenes")
    public ResponseEntity<Imagenes> subirImagen(
            @RequestParam("imagen") MultipartFile archivo,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("id_vivienda") Integer idVivienda
    ) {
        try {
            // Nombre del archivo único
            String nombreArchivo = archivo.getOriginalFilename();
            Path rutaImagenes = Paths.get("imagenes");
            if (!Files.exists(rutaImagenes)) {
                Files.createDirectories(rutaImagenes);
            }

            Path rutaDestino = rutaImagenes.resolve(nombreArchivo);
            Files.copy(archivo.getInputStream(), rutaDestino, StandardCopyOption.REPLACE_EXISTING);

            // Crear entidad Imagenes
            Imagenes imagen = new Imagenes();
            imagen.setUrl("http://localhost:8080/imagenes/" + nombreArchivo); // URL accesible desde frontend
            imagen.setDescripcion(descripcion);

            // Buscar vivienda y setearla
            Vivienda vivienda = inmobilariaServices.viviendaPorId(idVivienda).get();
            imagen.setVivienda(vivienda);

            Imagenes guardada = inmobilariaServices.guardarImagenes(imagen);

            return ResponseEntity.ok(guardada);

        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/viviendas/{id}")
    public ResponseEntity<?> actualizarVivienda(@PathVariable Integer id, @RequestBody Vivienda vivienda) {
        vivienda.setId(id);
        Vivienda viviendaActualizada = inmobilariaServices.actualizarVivienda(vivienda);
        return ResponseEntity.ok(viviendaActualizada);

    }

    @DeleteMapping("/viviendas/{id}")
    public ResponseEntity<?> borrarVivienda(@PathVariable Integer id) {
        Vivienda viviendaBorrada = inmobilariaServices.borrarVivienda(id);
        return ResponseEntity.ok(viviendaBorrada);
    }

    @DeleteMapping("/imagenes/{id}")
    public ResponseEntity<?> borrarImagenes(@PathVariable Integer id) {
        Imagenes imagenesBorrada = inmobilariaServices.borrarImagenes(id);
        return ResponseEntity.ok(imagenesBorrada);
    }

    @GetMapping("/inmobiliarias")
    public List<Inmobiliaria> findAllInmobiliarias() {
        return inmobilariaServices.findAllInmobiliarias();
    }

    @PostMapping("/inmobiliarias")
    public Inmobiliaria guardarInmobiliaria(@RequestBody Inmobiliaria inmobiliaria) {
        return inmobilariaServices.guardarInmobiliaria(inmobiliaria);
    }

    @PutMapping("/inmobiliarias/{id}")
    public ResponseEntity<?> actualizarInmobiliaria(@PathVariable Integer id, @RequestBody Inmobiliaria inmobiliaria) {
        inmobiliaria.setId(id);
        Inmobiliaria inmobiliariaActualizada = inmobilariaServices.guardarInmobiliaria(inmobiliaria);
        return ResponseEntity.ok(inmobiliariaActualizada);
    }

    @GetMapping("/inmobiliarias/idUsuario/{id}")
    public Inmobiliaria inmobiliariaPoridUsuario(@PathVariable Integer id) {
        return inmobilariaServices.inmobiliariaPoridUsuario(id);
    }

    @DeleteMapping("/inmobiliarias/{id}")
    public ResponseEntity<?> borrarInmobiliaria(@PathVariable Integer id) {
        Inmobiliaria inmobiliariaBorrada = inmobilariaServices.borrarInmobiliaria(id);
        return ResponseEntity.ok(inmobiliariaBorrada);
    }

    @GetMapping("/inmobiliarias/{id}")
    public Optional<Inmobiliaria> inmobiliariaPorId(@PathVariable Integer id) {
        return inmobilariaServices.inmobiliariaPorId(id);
    }

    @GetMapping("/viviendas/idInmobiliaria/{id}")
    public List<Vivienda> findViviendaPorIdInmobiliaria(@PathVariable Integer id) {
        return inmobilariaServices.findViviendaPorIdInmobiliaria(id);
    }

    @GetMapping("tipo")
    public List<Tipo> findAllTipos() {
        return inmobilariaServices.findAllTipos();
    }

    @GetMapping("usuarios")
    public List<Usuario> findAllUsuarios() {
        return inmobilariaServices.findAllUsuarios();
    }

    @GetMapping("/usuarios/{id}")
    public Usuario usuarioPorId(@PathVariable Integer id) {
        return inmobilariaServices.usuarioPorId(id);
    }

    @PostMapping("/usuarios")
    public Usuario guardarUsuario(@RequestBody Usuario usuario) {
        return inmobilariaServices.guardarUsuario(usuario);
    }

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable Integer id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        Usuario usuarioActualizada = inmobilariaServices.actualizarUsuario(usuario);
        return ResponseEntity.ok(usuarioActualizada);
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<?> borrarUsuario(@PathVariable Integer id) {
        Usuario usuarioBorrada = inmobilariaServices.borrarUsuario(id);
        return ResponseEntity.ok(usuarioBorrada);
    }

    @GetMapping("/roles")
    public List<Roles> findAllRoles() {
        return inmobilariaServices.findAllRoles();
    }
    @GetMapping("/viviendas/count/estado")
    public ResponseEntity<Map<String, Long>> contarTodo() {
        return ResponseEntity.ok(inmobilariaServices.contarTodoPorEstado());
    }
    @GetMapping("/viviendas/count/tipo")
    public ResponseEntity<Map<String, Long>> contarTipo() {
        return ResponseEntity.ok(inmobilariaServices.contarTodoPorTipo());
    }
    @GetMapping("/viviendas/count/localidad")
    public ResponseEntity<Map<String, Long>> contarLocalidad() {
        return ResponseEntity.ok(inmobilariaServices.contarTodoPorLocalidad());
    }
    @GetMapping("/viviendas/count/estado/{id}")
    public ResponseEntity<Map<String, Long>> contarEstadoPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(inmobilariaServices.contarEstadoPorInmobiliaria(id));
    }
    @GetMapping("/viviendas/count/tipo/{id}")
    public ResponseEntity<Map<String, Long>> contarTipoPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(inmobilariaServices.contarTipoPorInmobiliaria(id));
    }
    @GetMapping("/viviendas/count/localidad/{id}")
    public ResponseEntity<Map<String, Long>> contarLocalidadPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(inmobilariaServices.contarLocalidadPorInmobiliaria(id));
    }

}