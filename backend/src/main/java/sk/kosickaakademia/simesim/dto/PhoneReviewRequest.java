package sk.kosickaakademia.simesim.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class PhoneReviewRequest {

    @NotNull(message = "Hodnotenie je povinné")
    @Min(value = 1, message = "Hodnotenie musí byť od 1 do 5")
    @Max(value = 5, message = "Hodnotenie musí byť od 1 do 5")
    private Integer rating;

    @NotBlank(message = "Text recenzie je povinný")
    @Size(max = 1000, message = "Text recenzie môže mať maximálne 1000 znakov")
    private String comment;

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
