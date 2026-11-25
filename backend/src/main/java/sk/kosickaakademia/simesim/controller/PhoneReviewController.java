package sk.kosickaakademia.simesim.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import sk.kosickaakademia.simesim.dto.PhoneReviewRequest;
import sk.kosickaakademia.simesim.dto.PhoneReviewResponse;
import sk.kosickaakademia.simesim.service.PhoneReviewService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PhoneReviewController {

    private final PhoneReviewService reviewService;

    public PhoneReviewController(PhoneReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<PhoneReviewResponse>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @GetMapping("/sims/{simId}/reviews")
    public ResponseEntity<List<PhoneReviewResponse>> getReviewsForSim(@PathVariable Long simId) {
        return ResponseEntity.ok(reviewService.getReviewsForSim(simId));
    }

    @PostMapping("/sims/{simId}/reviews")
    public ResponseEntity<PhoneReviewResponse> createReview(@PathVariable Long simId,
                                                            @Valid @RequestBody PhoneReviewRequest request,
                                                            Authentication authentication) {
        PhoneReviewResponse created = reviewService.createReview(simId, request, authentication.getName());
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}
