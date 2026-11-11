package sk.kosickaakademia.simesim.service;

import sk.kosickaakademia.simesim.dto.CustomerRequest;
import sk.kosickaakademia.simesim.dto.CustomerResponse;
import sk.kosickaakademia.simesim.exception.ApiException;
import sk.kosickaakademia.simesim.exception.ResourceNotFoundException;
import sk.kosickaakademia.simesim.model.Customer;
import sk.kosickaakademia.simesim.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Transactional(readOnly = true)
    public List<CustomerResponse> getAll() {
        return customerRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CustomerResponse getById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Zákazník s ID " + id + " nebol nájdený"));
        return toResponse(customer);
    }

    @Transactional
    public CustomerResponse create(CustomerRequest request) {
        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new ApiException("Zákazník s týmto e-mailom už existuje");
        }

        Customer customer = new Customer();
        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());

        Customer saved = customerRepository.save(customer);
        return toResponse(saved);
    }

    @Transactional
    public CustomerResponse update(Long id, CustomerRequest request) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Zákazník s ID " + id + " nebol nájdený"));

        if (!customer.getEmail().equals(request.getEmail()) && customerRepository.existsByEmail(request.getEmail())) {
            throw new ApiException("Zákazník s týmto e-mailom už existuje");
        }

        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());

        Customer saved = customerRepository.save(customer);
        return toResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Zákazník s ID " + id + " nebol nájdený");
        }
        customerRepository.deleteById(id);
    }

    private CustomerResponse toResponse(Customer customer) {
        CustomerResponse response = new CustomerResponse();
        response.setId(customer.getId());
        response.setFirstName(customer.getFirstName());
        response.setLastName(customer.getLastName());
        response.setEmail(customer.getEmail());
        response.setPhone(customer.getPhone());
        response.setCreatedAt(customer.getCreatedAt());
        response.setUpdatedAt(customer.getUpdatedAt());
        return response;
    }
}
