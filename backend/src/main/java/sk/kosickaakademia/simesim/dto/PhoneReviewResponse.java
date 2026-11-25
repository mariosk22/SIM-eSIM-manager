package sk.kosickaakademia.simesim.dto;

import java.time.LocalDateTime;

public class PhoneReviewResponse {

    private Long id;
    private Long simCardId;
    private String iccid;
    private String author;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSimCardId() { return simCardId; }
    public void setSimCardId(Long simCardId) { this.simCardId = simCardId; }

    public String getIccid() { return iccid; }
    public void setIccid(String iccid) { this.iccid = iccid; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
