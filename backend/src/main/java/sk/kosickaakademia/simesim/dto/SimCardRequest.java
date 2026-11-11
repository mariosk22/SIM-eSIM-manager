package sk.kosickaakademia.simesim.dto;

import sk.kosickaakademia.simesim.model.SimStatus;
import sk.kosickaakademia.simesim.model.SimType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class SimCardRequest {
    @NotBlank(message = "ICCID je povinné")
    @Size(min = 19, max = 22, message = "ICCID musí mať 19 - 22 znakov")
    private String iccid;

    @Size(max = 15, message = "IMSI môže mať maximálne 15 znakov")
    private String imsi;

    @NotNull(message = "Typ SIM karty je povinný")
    private SimType type;

    private SimStatus status;

    @Size(max = 255)
    private String note;

    private Long customerId;

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
}
