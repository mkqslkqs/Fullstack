package com.taskmanagementapp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // ✅ Разрешаем CORS (для взаимодействия фронта и бэка)
                .cors(withDefaults())

                // ❌ Отключаем CSRF (для REST API это не нужно)
                .csrf(AbstractHttpConfigurer::disable)

                // 🔐 Настраиваем разрешения маршрутов
                .authorizeHttpRequests(auth -> auth
                        // Разрешаем регистрацию и логин без токена
                        .requestMatchers("/api/auth/**", "/api/users/register", "/api/users/login").permitAll()

                        // Публичные задачи доступны всем
                        .requestMatchers("/api/tasks/public/**").permitAll()

                        // Всё остальное — только с JWT
                        .requestMatchers("/api/users/**", "/api/tasks/**").authenticated()

                        // Остальные маршруты — тоже требуют авторизации
                        .anyRequest().authenticated()
                )

                // 🚫 Без сессий — REST API должен быть stateless
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );

        // 🔄 Добавляем фильтр JWT перед стандартным фильтром Spring Security
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 🧩 Настройка шифрования паролей
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ⚙️ Менеджер аутентификации (используется при логине)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // 🌐 Разрешаем запросы с фронтенда (например React localhost:3000)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Разрешённые источники
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));

        // Разрешённые методы
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));

        // Разрешённые заголовки
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));

        // Разрешаем передачу токенов/cookie
        configuration.setAllowCredentials(true);

        // Применяем настройки ко всем маршрутам
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
