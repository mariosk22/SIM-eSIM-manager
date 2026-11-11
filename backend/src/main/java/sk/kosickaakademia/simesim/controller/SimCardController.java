package sk.kosickaakademia.simesim.controller;

import sk.kosickaakademia.simesim.dto.SimCardRequest;
import sk.kosickaakademia.simesim.dto.SimCardResponse;
import sk.kosickaakademia.simesim.service.SimCardService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sims")
public class SimCardController {

    private final SimCardService simCardService;

    public SimCardController(SimCardService simCardService) {
        this.simCardService = simCardService;
    }

    @GetMapping
    public ResponseEntity<List<SimCardResponse>> getAll() {
        return ResponseEntity.ok(simCardService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SimCardResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(simCardService.getById(id));
    }

    @PostMapping
    public ResponseEntity<SimCardResponse> create(@Valid @RequestBody SimCardRequest request) {
        return new ResponseEntity<>(simCardService.create(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SimCardResponse> update(@PathVariable Long id, @Valid @RequestBody SimCardRequest request) {
        return ResponseEntity.ok(simCardService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        simCardService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
