package sk.kosickaakademia.simesim.service;

import sk.kosickaakademia.simesim.dto.SimCardRequest;
import sk.kosickaakademia.simesim.dto.SimCardResponse;
import sk.kosickaakademia.simesim.exception.ApiException;
import sk.kosickaakademia.simesim.exception.ResourceNotFoundException;
import sk.kosickaakademia.simesim.model.Customer;
import sk.kosickaakademia.simesim.model.SimCard;
import sk.kosickaakademia.simesim.repository.CustomerRepository;
import sk.kosickaakademia.simesim.repository.SimCardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SimCardService {

    private final SimCardRepository simCardRepository;
    private final CustomerRepository customerRepository;
    private final SimAssignmentHistoryService assignmentHistoryService;

    public SimCardService(SimCardRepository simCardRepository,
                          CustomerRepository customerRepository,
                          SimAssignmentHistoryService assignmentHistoryService) {
        this.simCardRepository = simCardRepository;
        this.customerRepository = customerRepository;
        this.assignmentHistoryService = assignmentHistoryService;
    }

    @Transactional(readOnly = true)
    public List<SimCardResponse> getAll() {
        return simCardRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SimCardResponse getById(Long id) {
        SimCard simCard = simCardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SIM karta s ID " + id + " nebola nájdená"));
        return toResponse(simCard);
    }

    @Transactional
    public SimCardResponse create(SimCardRequest request) {
        if (simCardRepository.existsByIccid(request.getIccid())) {
            throw new ApiException("SIM karta s týmto ICCID už existuje");
        }

        SimCard simCard = new SimCard();
        simCard.setIccid(request.getIccid());
        simCard.setImsi(request.getImsi());
        simCard.setType(request.getType());
        simCard.setStatus(request.getStatus() != null ? request.getStatus() : sk.kosickaakademia.simesim.model.SimStatus.IN_STOCK);
        simCard.setNote(request.getNote());

        if (request.getCustomerId() != null) {
            Customer customer = customerRepository.findById(request.getCustomerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Zákazník s ID " + request.getCustomerId() + " nebol nájdený"));
            simCard.setCustomer(customer);
        }

        SimCard saved = simCardRepository.save(simCard);

        if (saved.getCustomer() != null) {
            assignmentHistoryService.recordAssignment(saved, saved.getCustomer(),
                    "SIM karta bola vytvorená s priradením zákazníka");
        }
        return toResponse(saved);
    }

    @Transactional
    public SimCardResponse update(Long id, SimCardRequest request) {
        SimCard simCard = simCardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SIM karta s ID " + id + " nebola nájdená"));

        Long oldCustomerId = simCard.getCustomer() != null ? simCard.getCustomer().getId() : null;

        if (!simCard.getIccid().equals(request.getIccid()) && simCardRepository.existsByIccid(request.getIccid())) {
            throw new ApiException("SIM karta s týmto ICCID už existuje");
        }

        simCard.setIccid(request.getIccid());
        simCard.setImsi(request.getImsi());
        simCard.setType(request.getType());
        if (request.getStatus() != null) {
            simCard.setStatus(request.getStatus());
        }
        simCard.setNote(request.getNote());

        if (request.getCustomerId() != null) {
            Customer customer = customerRepository.findById(request.getCustomerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Zákazník s ID " + request.getCustomerId() + " nebol nájdený"));
            simCard.setCustomer(customer);
        } else {
            simCard.setCustomer(null);
        }

        SimCard saved = simCardRepository.save(simCard);

        Long newCustomerId = saved.getCustomer() != null ? saved.getCustomer().getId() : null;
        if (!java.util.Objects.equals(oldCustomerId, newCustomerId)) {
            assignmentHistoryService.recordAssignment(saved, saved.getCustomer(),
                    "Zmena vlastníka cez formulár SIM karty");
        }
        return toResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        if (!simCardRepository.existsById(id)) {
            throw new ResourceNotFoundException("SIM karta s ID " + id + " nebola nájdená");
        }
        simCardRepository.deleteById(id);
    }

    private SimCardResponse toResponse(SimCard simCard) {
        SimCardResponse response = new SimCardResponse();
        response.setId(simCard.getId());
        response.setIccid(simCard.getIccid());
        response.setImsi(simCard.getImsi());
        response.setType(simCard.getType());
        response.setStatus(simCard.getStatus());
        response.setNote(simCard.getNote());
        if (simCard.getCustomer() != null) {
            response.setCustomerId(simCard.getCustomer().getId());
            response.setCustomerName(simCard.getCustomer().getFirstName() + " " + simCard.getCustomer().getLastName());
        }
        response.setCreatedAt(simCard.getCreatedAt());
        response.setUpdatedAt(simCard.getUpdatedAt());
        return response;
    }
}
