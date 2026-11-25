package sk.kosickaakademia.simesim.service;

import sk.kosickaakademia.simesim.dto.AssignmentHistoryResponse;
import sk.kosickaakademia.simesim.exception.ResourceNotFoundException;
import sk.kosickaakademia.simesim.model.Customer;
import sk.kosickaakademia.simesim.model.SimAssignmentHistory;
import sk.kosickaakademia.simesim.model.SimCard;
import sk.kosickaakademia.simesim.repository.SimAssignmentHistoryRepository;
import sk.kosickaakademia.simesim.repository.SimCardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SimAssignmentHistoryService {

    private final SimAssignmentHistoryRepository historyRepository;
    private final SimCardRepository simCardRepository;

    public SimAssignmentHistoryService(SimAssignmentHistoryRepository historyRepository,
                                       SimCardRepository simCardRepository) {
        this.historyRepository = historyRepository;
        this.simCardRepository = simCardRepository;
    }

    @Transactional(readOnly = true)
    public List<AssignmentHistoryResponse> getHistoryForSim(Long simCardId) {
        if (!simCardRepository.existsById(simCardId)) {
            throw new ResourceNotFoundException("SIM karta s ID " + simCardId + " nebola nájdená");
        }
        return historyRepository.findBySimCardIdOrderByAssignedAtDesc(simCardId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public void recordAssignment(SimCard simCard, Customer customer, String note) {
        closeOpenAssignments(simCard.getId());

        if (customer != null) {
            SimAssignmentHistory history = new SimAssignmentHistory();
            history.setSimCard(simCard);
            history.setCustomer(customer);
            history.setAssignedAt(LocalDateTime.now());
            history.setNote(note);
            historyRepository.save(history);
        }
    }

    @Transactional
    public void closeOpenAssignments(Long simCardId) {
        for (SimAssignmentHistory history : historyRepository.findBySimCardIdAndUnassignedAtIsNull(simCardId)) {
            history.setUnassignedAt(LocalDateTime.now());
        }
    }

    private AssignmentHistoryResponse toResponse(SimAssignmentHistory history) {
        AssignmentHistoryResponse response = new AssignmentHistoryResponse();
        response.setId(history.getId());
        response.setSimCardId(history.getSimCard().getId());
        response.setIccid(history.getSimCard().getIccid());
        if (history.getCustomer() != null) {
            response.setCustomerId(history.getCustomer().getId());
            response.setCustomerName(history.getCustomer().getFirstName() + " " + history.getCustomer().getLastName());
        }
        response.setAssignedAt(history.getAssignedAt());
        response.setUnassignedAt(history.getUnassignedAt());
        response.setActive(history.getUnassignedAt() == null);
        response.setNote(history.getNote());
        return response;
    }
}
