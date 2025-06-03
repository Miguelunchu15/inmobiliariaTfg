package com.iesazarquiel.vs2daw.peliculas.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Clave secreta suficientemente larga para HS512 (al menos 64 bytes recomendado)
    // Puedes usar una clave aleatoria segura en Base64 para mayor seguridad
    private final String SECRET_KEY = "2asf8@D92!asdaAASDlmn_82930sdaknasd0923abcdefgh1234567890ABCDEFGH";

    private final Key key;

    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hora

    public JwtUtil() {
        // Convierte la clave secreta a bytes UTF-8 y crea la Key segura para HS512
        byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generarToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String extraerUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validarToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            // Aquí puedes manejar distintos tipos de excepciones: ExpiredJwtException, SignatureException, etc.
            return false;
        }
    }
}
