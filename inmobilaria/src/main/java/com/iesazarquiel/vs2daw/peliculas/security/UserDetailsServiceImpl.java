package com.iesazarquiel.vs2daw.peliculas.security;

import com.iesazarquiel.vs2daw.peliculas.entity.Usuario;
import com.iesazarquiel.vs2daw.peliculas.servicios.InmobilariaServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private InmobilariaServices inmobilariaServices;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = inmobilariaServices.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));
        return new UserDetailsImpl(usuario);
    }
}
