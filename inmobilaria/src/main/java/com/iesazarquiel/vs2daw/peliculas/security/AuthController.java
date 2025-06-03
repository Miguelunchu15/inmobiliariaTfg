package com.iesazarquiel.vs2daw.peliculas.security;

import com.iesazarquiel.vs2daw.peliculas.entity.Usuario;
import com.iesazarquiel.vs2daw.peliculas.servicios.InmobilariaServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private InmobilariaServices usuarioService;  // Para buscar info de usuario si necesitas

    // DTO para la petición de login
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // DTO para la respuesta (token JWT)
    public static class JwtResponse {
        private String token;
        private Integer id_usuario; // Nuevo campo para el ID del usuario

        public JwtResponse(String token, Integer id_usuario) {
            this.token = token;
            this.id_usuario = id_usuario;
        }

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }

        public Integer getId_usuario() { return id_usuario; }
        public void setId_usuario(Integer id_usuario) { this.id_usuario = id_usuario; }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            // Autenticar usuario con Spring Security
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // Buscar el usuario en la base de datos para obtener su ID
            Optional<Usuario> usuarioOpt = usuarioService.findByEmail(userDetails.getUsername());

            if (usuarioOpt.isEmpty()) {
                return ResponseEntity.status(404).body("Usuario no encontrado");
            }

            Usuario usuario = usuarioOpt.get();
            Integer idUsuario = usuario.getId(); // Asumiendo que el tipo de ID es Integer

            // Generar token JWT
            String jwt = jwtUtil.generarToken(userDetails.getUsername());

            // Devolver token junto con el id_usuario
            return ResponseEntity.ok(new JwtResponse(jwt, idUsuario));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }


}
