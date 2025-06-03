package com.iesazarquiel.vs2daw.peliculas.security;


import com.iesazarquiel.vs2daw.peliculas.entity.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails {

    private final Usuario usuario;

    public UserDetailsImpl(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Devuelve el nombre del rol como autoridad
        return Collections.singletonList(new SimpleGrantedAuthority(usuario.getRol().getNombre()));
    }

    @Override
    public String getPassword() {
        return usuario.getContraseña();
    }

    @Override
    public String getUsername() {
        return usuario.getEmail(); // O usuario.getNombre() si usas nombre para login
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Puedes cambiar según lógica de negocio
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Puedes cambiar según lógica de negocio
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Puedes cambiar según lógica de negocio
    }

    @Override
    public boolean isEnabled() {
        return true; // Puedes usar una columna en BD para controlar esto
    }

    public Usuario getUsuario() {
        return usuario;
    }
}