package sk.kosickaakademia.simesim.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "phone_reviews")
public class PhoneReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sim_card_id", nullable = false)
    private SimCard simCard;

    @Column(name = "author", nullable = false, length = 50)
    private String author;

    @Column(nullable = false)
    private Integer rating;

    @Column(name = "comment", nullable = false, length = 1000)
    private String comment;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public SimCard getSimCard() { return simCard; }
    public void setSimCard(SimCard simCard) { this.simCard = simCard; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
