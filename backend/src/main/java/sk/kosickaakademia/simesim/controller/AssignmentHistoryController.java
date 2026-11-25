package sk.kosickaakademia.simesim.controller;

import sk.kosickaakademia.simesim.dto.AssignmentHistoryResponse;
import sk.kosickaakademia.simesim.service.SimAssignmentHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sims")
public class AssignmentHistoryController {

    private final SimAssignmentHistoryService assignmentHistoryService;

    public AssignmentHistoryController(SimAssignmentHistoryService assignmentHistoryService) {
        this.assignmentHistoryService = assignmentHistoryService;
    }

    @GetMapping("/{simId}/history")
    public ResponseEntity<List<AssignmentHistoryResponse>> getHistory(@PathVariable Long simId) {
        return ResponseEntity.ok(assignmentHistoryService.getHistoryForSim(simId));
    }
}
