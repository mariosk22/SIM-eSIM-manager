package sk.kosickaakademia.simesim.service;

import sk.kosickaakademia.simesim.dto.PhoneReviewRequest;
import sk.kosickaakademia.simesim.dto.PhoneReviewResponse;
import sk.kosickaakademia.simesim.exception.ResourceNotFoundException;
import sk.kosickaakademia.simesim.model.PhoneReview;
import sk.kosickaakademia.simesim.model.SimCard;
import sk.kosickaakademia.simesim.repository.PhoneReviewRepository;
import sk.kosickaakademia.simesim.repository.SimCardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PhoneReviewService {

    private final PhoneReviewRepository reviewRepository;
    private final SimCardRepository simCardRepository;

    public PhoneReviewService(PhoneReviewRepository reviewRepository,
                              SimCardRepository simCardRepository) {
        this.reviewRepository = reviewRepository;
        this.simCardRepository = simCardRepository;
    }

    @Transactional(readOnly = true)
    public List<PhoneReviewResponse> getReviewsForSim(Long simCardId) {
        findSim(simCardId);
        return reviewRepository.findBySimCardIdOrderByCreatedAtDesc(simCardId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PhoneReviewResponse> getAllReviews() {
        return reviewRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public PhoneReviewResponse createReview(Long simCardId, PhoneReviewRequest request, String author) {
        SimCard simCard = findSim(simCardId);

        PhoneReview review = new PhoneReview();
        review.setSimCard(simCard);
        review.setAuthor(author);
        review.setRating(request.getRating());
        review.setComment(request.getComment().trim());
        PhoneReview saved = reviewRepository.save(review);
        return toResponse(saved);
    }

    private SimCard findSim(Long simCardId) {
        return simCardRepository.findById(simCardId)
                .orElseThrow(() -> new ResourceNotFoundException("SIM karta s ID " + simCardId + " nebola nájdená"));
    }

    private PhoneReviewResponse toResponse(PhoneReview review) {
        PhoneReviewResponse response = new PhoneReviewResponse();
        response.setId(review.getId());
        response.setSimCardId(review.getSimCard().getId());
        response.setIccid(review.getSimCard().getIccid());
        response.setAuthor(review.getAuthor());
        response.setRating(review.getRating());
        response.setComment(review.getComment());
        response.setCreatedAt(review.getCreatedAt());
        return response;
    }
}
