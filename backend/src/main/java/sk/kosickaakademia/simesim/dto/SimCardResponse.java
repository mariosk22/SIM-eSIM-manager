package sk.kosickaakademia.simesim.dto;

import sk.kosickaakademia.simesim.model.SimStatus;
import sk.kosickaakademia.simesim.model.SimType;
import java.time.LocalDateTime;

public class SimCardResponse {
    private Long id;
    private String iccid;
    private String imsi;
    private SimType type;
    private SimStatus status;
    private String note;
    private Long customerId;
    private String customerName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


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

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
