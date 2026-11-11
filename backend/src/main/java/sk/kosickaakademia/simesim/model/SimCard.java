package sk.kosickaakademia.simesim.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sim_cards")
public class SimCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 22)
    private String iccid;

    @Column(length = 15)
    private String imsi;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private SimType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    private SimStatus status;

    @Column(length = 255)
    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = SimStatus.IN_STOCK;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getIccid() { return iccid; }
    public void setIccid(String iccid) { this.iccid = iccid; }

    public String getImsi() { return imsi; }
    public void setImsi(String imsi) { this.imsi = imsi; }

    public SimType getType() { return type; }
    public void setType(SimType type) { this.type = type; }

    public SimStatus getStatus() { return status; }
    public void setStatus(SimStatus status) { this.status = status; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
