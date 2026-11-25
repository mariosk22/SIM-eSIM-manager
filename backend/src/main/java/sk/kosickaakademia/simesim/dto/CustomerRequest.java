package sk.kosickaakademia.simesim.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class CustomerRequest {
    @NotBlank(message = "Meno je povinné")
    @Size(max = 50)
    @Pattern(regexp = "^[\\p{L}][\\p{L} '-]*$", message = "Meno môže obsahovať iba písmená, medzery, pomlčky a apostrofy")
    private String firstName;

    @NotBlank(message = "Priezvisko je povinné")
    @Size(max = 50)
    @Pattern(regexp = "^[\\p{L}][\\p{L} '-]*$", message = "Priezvisko môže obsahovať iba písmená, medzery, pomlčky a apostrofy")
    private String lastName;

    @NotBlank(message = "E-mail je povinný")
    @Email(message = "Zadaj platný e-mail")
    @Size(max = 100)
    private String email;

    @Size(max = 20)
    @Pattern(regexp = "^(\\+?[0-9]{9,19})?$", message = "Telefón môže obsahovať iba číslice, prípadne úvodné + (9 až 19 číslic)")
    private String phone;

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
