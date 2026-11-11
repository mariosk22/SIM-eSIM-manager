package sk.kosickaakademia.simesim.exception;

public class ApiException extends RuntimeException {
    public ApiException(String message) {
        super(message);
    }
}
