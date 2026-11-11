package sk.kosickaakademia.simesim.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import sk.kosickaakademia.simesim.model.AppUser;
import sk.kosickaakademia.simesim.repository.AppUserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initAdminUser(AppUserRepository appUserRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            AppUser admin = appUserRepository.findByUsername("admin").orElse(null);

            if (admin == null) {
                admin = new AppUser();
                admin.setUsername("admin");
                admin.setRole("ROLE_ADMIN");
                System.out.println(">>> Vytváram testovacieho používateľa admin");
            } else {
                System.out.println(">>> Aktualizujem heslo pre používateľa admin");
            }

            admin.setPassword(passwordEncoder.encode("admin123"));
            appUserRepository.save(admin);
            System.out.println(">>> Používateľ admin je pripravený. Prihlasovacie údaje: admin / admin123");
        };
    }
}
