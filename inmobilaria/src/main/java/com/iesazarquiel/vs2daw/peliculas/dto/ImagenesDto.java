package com.iesazarquiel.vs2daw.peliculas.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * DTO for {@link com.iesazarquiel.vs2daw.peliculas.entity.Imagenes}
 */
public class ImagenesDto implements Serializable {
    private final Integer id;
    private final String url;
    private final String descripcion;
    private final ViviendaDto vivienda;

    public ImagenesDto(Integer id, String url, String descripcion, ViviendaDto vivienda) {
        this.id = id;
        this.url = url;
        this.descripcion = descripcion;
        this.vivienda = vivienda;
    }

    public Integer getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public ViviendaDto getVivienda() {
        return vivienda;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ImagenesDto entity = (ImagenesDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.url, entity.url) &&
                Objects.equals(this.descripcion, entity.descripcion) &&
                Objects.equals(this.vivienda, entity.vivienda);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, url, descripcion, vivienda);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "url = " + url + ", " +
                "descripcion = " + descripcion + ", " +
                "vivienda = " + vivienda + ")";
    }
}