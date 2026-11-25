package sk.kosickaakademia.simesim.repository;

import sk.kosickaakademia.simesim.model.PhoneReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhoneReviewRepository extends JpaRepository<PhoneReview, Long> {

    List<PhoneReview> findBySimCardIdOrderByCreatedAtDesc(Long simCardId);

    List<PhoneReview> findAllByOrderByCreatedAtDesc();
}
