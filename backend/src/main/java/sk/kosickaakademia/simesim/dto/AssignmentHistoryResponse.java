package sk.kosickaakademia.simesim.dto;

import java.time.LocalDateTime;

public class AssignmentHistoryResponse {

    private Long id;
    private Long simCardId;
    private String iccid;
    private Long customerId;
    private String customerName;
    private LocalDateTime assignedAt;
    private LocalDateTime unassignedAt;
    private boolean active;
    private String note;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSimCardId() { return simCardId; }
    public void setSimCardId(Long simCardId) { this.simCardId = simCardId; }

    public String getIccid() { return iccid; }
    public void setIccid(String iccid) { this.iccid = iccid; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public LocalDateTime getAssignedAt() { return assignedAt; }
    public void setAssignedAt(LocalDateTime assignedAt) { this.assignedAt = assignedAt; }

    public LocalDateTime getUnassignedAt() { return unassignedAt; }
    public void setUnassignedAt(LocalDateTime unassignedAt) { this.unassignedAt = unassignedAt; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
