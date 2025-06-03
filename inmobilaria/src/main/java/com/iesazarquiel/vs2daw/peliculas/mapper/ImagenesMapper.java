package com.iesazarquiel.vs2daw.peliculas.mapper;

import com.iesazarquiel.vs2daw.peliculas.dto.ImagenesDto;
import com.iesazarquiel.vs2daw.peliculas.entity.Imagenes;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ImagenesMapper {
    @Mapping(source = "vivienda.inmobiliariaEmailContacto", target = "vivienda.inmobiliaria.emailContacto")
    @Mapping(source = "vivienda.inmobiliariaDireccion", target = "vivienda.inmobiliaria.direccion")
    @Mapping(source = "vivienda.inmobiliariaTelefono", target = "vivienda.inmobiliaria.telefono")
    @Mapping(source = "vivienda.inmobiliariaDescripcion", target = "vivienda.inmobiliaria.descripcion")
    @Mapping(source = "vivienda.inmobiliariaNombre", target = "vivienda.inmobiliaria.nombre")
    @Mapping(source = "vivienda.inmobiliariaId", target = "vivienda.inmobiliaria.id")
    @Mapping(source = "vivienda.localidadProvincia", target = "vivienda.localidad.provincia")
    @Mapping(source = "vivienda.localidadNombre", target = "vivienda.localidad.nombre")
    @Mapping(source = "vivienda.localidadId", target = "vivienda.localidad.id")
    @Mapping(source = "vivienda.tipoNombre", target = "vivienda.tipo.nombre")
    @Mapping(source = "vivienda.tipoId", target = "vivienda.tipo.id")
    Imagenes toEntity(ImagenesDto imagenesDto);

    @InheritInverseConfiguration(name = "toEntity")
    ImagenesDto toDto(Imagenes imagenes);

    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Imagenes partialUpdate(ImagenesDto imagenesDto, @MappingTarget Imagenes imagenes);
}