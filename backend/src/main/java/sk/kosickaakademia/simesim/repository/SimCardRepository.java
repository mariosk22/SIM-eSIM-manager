package sk.kosickaakademia.simesim.repository;

import sk.kosickaakademia.simesim.model.SimCard;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SimCardRepository extends JpaRepository<SimCard, Long> {
    boolean existsByIccid(String iccid);
    Optional<SimCard> findByIccid(String iccid);
}
