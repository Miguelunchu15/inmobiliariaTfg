package com.iesazarquiel.vs2daw.peliculas.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * DTO for {@link com.iesazarquiel.vs2daw.peliculas.entity.Vivienda}
 */
public class ViviendaDto implements Serializable {
    private final Integer id;
    private final String titulo;
    private final String descripcion;
    private final BigDecimal precio;
    private final Integer habitaciones;
    private final Integer baños;
    private final Integer metrosCuadrados;
    private final String direccion;
    private final Boolean disponible;
    private final Instant fechaPublicacion;
    private final Integer tipoId;
    private final String tipoNombre;
    private final Integer localidadId;
    private final String localidadNombre;
    private final String localidadProvincia;
    private final Integer inmobiliariaId;
    private final String inmobiliariaNombre;
    private final String inmobiliariaDescripcion;
    private final String inmobiliariaTelefono;
    private final String inmobiliariaDireccion;
    private final String inmobiliariaEmailContacto;
    private final Integer destacado;
    private final Integer garaje;

    public ViviendaDto(Integer id, String titulo, String descripcion, BigDecimal precio, Integer habitaciones, Integer baños, Integer metrosCuadrados, String direccion, Boolean disponible, Instant fechaPublicacion, Integer tipoId, String tipoNombre, Integer localidadId, String localidadNombre, String localidadProvincia, Integer inmobiliariaId, String inmobiliariaNombre, String inmobiliariaDescripcion, String inmobiliariaTelefono, String inmobiliariaDireccion, String inmobiliariaEmailContacto, Integer destacado, Integer garaje) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.habitaciones = habitaciones;
        this.baños = baños;
        this.metrosCuadrados = metrosCuadrados;
        this.direccion = direccion;
        this.disponible = disponible;
        this.fechaPublicacion = fechaPublicacion;
        this.tipoId = tipoId;
        this.tipoNombre = tipoNombre;
        this.localidadId = localidadId;
        this.localidadNombre = localidadNombre;
        this.localidadProvincia = localidadProvincia;
        this.inmobiliariaId = inmobiliariaId;
        this.inmobiliariaNombre = inmobiliariaNombre;
        this.inmobiliariaDescripcion = inmobiliariaDescripcion;
        this.inmobiliariaTelefono = inmobiliariaTelefono;
        this.inmobiliariaDireccion = inmobiliariaDireccion;
        this.inmobiliariaEmailContacto = inmobiliariaEmailContacto;
        this.destacado = destacado;
        this.garaje = garaje;
    }

    public Integer getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public Integer getHabitaciones() {
        return habitaciones;
    }

    public Integer getBaños() {
        return baños;
    }

    public Integer getMetrosCuadrados() {
        return metrosCuadrados;
    }

    public String getDireccion() {
        return direccion;
    }

    public Boolean getDisponible() {
        return disponible;
    }

    public Instant getFechaPublicacion() {
        return fechaPublicacion;
    }

    public Integer getTipoId() {
        return tipoId;
    }

    public String getTipoNombre() {
        return tipoNombre;
    }

    public Integer getLocalidadId() {
        return localidadId;
    }

    public String getLocalidadNombre() {
        return localidadNombre;
    }

    public String getLocalidadProvincia() {
        return localidadProvincia;
    }

    public Integer getInmobiliariaId() {
        return inmobiliariaId;
    }

    public String getInmobiliariaNombre() {
        return inmobiliariaNombre;
    }

    public String getInmobiliariaDescripcion() {
        return inmobiliariaDescripcion;
    }

    public String getInmobiliariaTelefono() {
        return inmobiliariaTelefono;
    }

    public String getInmobiliariaDireccion() {
        return inmobiliariaDireccion;
    }

    public String getInmobiliariaEmailContacto() {
        return inmobiliariaEmailContacto;
    }

    public Integer getDestacado() {
        return destacado;
    }

    public Integer getGaraje() {
        return garaje;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ViviendaDto entity = (ViviendaDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.titulo, entity.titulo) &&
                Objects.equals(this.descripcion, entity.descripcion) &&
                Objects.equals(this.precio, entity.precio) &&
                Objects.equals(this.habitaciones, entity.habitaciones) &&
                Objects.equals(this.baños, entity.baños) &&
                Objects.equals(this.metrosCuadrados, entity.metrosCuadrados) &&
                Objects.equals(this.direccion, entity.direccion) &&
                Objects.equals(this.disponible, entity.disponible) &&
                Objects.equals(this.fechaPublicacion, entity.fechaPublicacion) &&
                Objects.equals(this.tipoId, entity.tipoId) &&
                Objects.equals(this.tipoNombre, entity.tipoNombre) &&
                Objects.equals(this.localidadId, entity.localidadId) &&
                Objects.equals(this.localidadNombre, entity.localidadNombre) &&
                Objects.equals(this.localidadProvincia, entity.localidadProvincia) &&
                Objects.equals(this.inmobiliariaId, entity.inmobiliariaId) &&
                Objects.equals(this.inmobiliariaNombre, entity.inmobiliariaNombre) &&
                Objects.equals(this.inmobiliariaDescripcion, entity.inmobiliariaDescripcion) &&
                Objects.equals(this.inmobiliariaTelefono, entity.inmobiliariaTelefono) &&
                Objects.equals(this.inmobiliariaDireccion, entity.inmobiliariaDireccion) &&
                Objects.equals(this.inmobiliariaEmailContacto, entity.inmobiliariaEmailContacto) &&
                Objects.equals(this.destacado, entity.destacado) &&
                Objects.equals(this.garaje, entity.garaje);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, titulo, descripcion, precio, habitaciones, baños, metrosCuadrados, direccion, disponible, fechaPublicacion, tipoId, tipoNombre, localidadId, localidadNombre, localidadProvincia, inmobiliariaId, inmobiliariaNombre, inmobiliariaDescripcion, inmobiliariaTelefono, inmobiliariaDireccion, inmobiliariaEmailContacto, destacado, garaje);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "titulo = " + titulo + ", " +
                "descripcion = " + descripcion + ", " +
                "precio = " + precio + ", " +
                "habitaciones = " + habitaciones + ", " +
                "baños = " + baños + ", " +
                "metrosCuadrados = " + metrosCuadrados + ", " +
                "direccion = " + direccion + ", " +
                "disponible = " + disponible + ", " +
                "fechaPublicacion = " + fechaPublicacion + ", " +
                "tipoId = " + tipoId + ", " +
                "tipoNombre = " + tipoNombre + ", " +
                "localidadId = " + localidadId + ", " +
                "localidadNombre = " + localidadNombre + ", " +
                "localidadProvincia = " + localidadProvincia + ", " +
                "inmobiliariaId = " + inmobiliariaId + ", " +
                "inmobiliariaNombre = " + inmobiliariaNombre + ", " +
                "inmobiliariaDescripcion = " + inmobiliariaDescripcion + ", " +
                "inmobiliariaTelefono = " + inmobiliariaTelefono + ", " +
                "inmobiliariaDireccion = " + inmobiliariaDireccion + ", " +
                "inmobiliariaEmailContacto = " + inmobiliariaEmailContacto + ", " +
                "destacado = " + destacado + ", " +
                "garaje = " + garaje + ")";
    }
}