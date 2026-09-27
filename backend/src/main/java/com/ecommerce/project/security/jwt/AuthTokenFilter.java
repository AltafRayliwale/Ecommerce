package com.ecommerce.project.security.jwt;

import com.ecommerce.project.security.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        logger.debug("AuthTokenFilter called for URI: {}", request.getRequestURI());

        try {
            String jwt = parseJwt(request);

            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {

                String username = jwtUtils.getUserNameFromJwtToken(jwt);

                System.out.println("===== USERNAME FROM JWT: [" + username + "] =====");

                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(username);

                System.out.println(
                        "===== USER FOUND: [" + userDetails.getUsername() + "] ====="
                );

                System.out.println(
                        "===== AUTHORITIES: " + userDetails.getAuthorities() + " ====="
                );

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);

                System.out.println("===== AUTHENTICATION SET =====");
            }

        } catch (Exception e) {

            // IMPORTANT: show the real error
            logger.error("Cannot set user authentication", e);
        }

        filterChain.doFilter(request, response);
    }

//    private String parseJwt(HttpServletRequest request) {
//        String jwt = jwtUtils.getJwtFromCookies(request);
//        logger.debug("AuthTokenFilter.java: {}", jwt);
//        return jwt;
//    }

    private String parseJwt(HttpServletRequest request) {

        System.out.println("========== JWT DEBUG ==========");
        System.out.println("URI: " + request.getRequestURI());

        // 1. Try JWT Cookie
        String jwtFromCookie = jwtUtils.getJwtFromCookies(request);

        if (jwtFromCookie != null && !jwtFromCookie.isBlank()) {
            System.out.println("JWT COOKIE FOUND");
            System.out.println("JWT LENGTH: " + jwtFromCookie.length());
            return jwtFromCookie.trim();
        }

        System.out.println("JWT COOKIE NOT FOUND");

        // 2. Try Authorization Header
        String jwtFromHeader = jwtUtils.getJwtFromHeader(request);

        if (jwtFromHeader != null && !jwtFromHeader.isBlank()) {
            System.out.println("JWT HEADER FOUND");
            return jwtFromHeader.trim();
        }

        System.out.println("NO JWT FOUND");
        System.out.println("==============================");

        return null;
    }
}

