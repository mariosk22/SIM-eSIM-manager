package sk.kosickaakademia.simesim.repository;

import sk.kosickaakademia.simesim.model.SimAssignmentHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SimAssignmentHistoryRepository extends JpaRepository<SimAssignmentHistory, Long> {

    List<SimAssignmentHistory> findBySimCardIdOrderByAssignedAtDesc(Long simCardId);

    List<SimAssignmentHistory> findBySimCardIdAndUnassignedAtIsNull(Long simCardId);
}
