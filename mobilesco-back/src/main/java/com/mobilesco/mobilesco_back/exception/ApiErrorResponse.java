package com.mobilesco.mobilesco_back.exception;

import java.util.Map;

public class ApiErrorResponse {

    private boolean success;
    private String message;
    private Map<String, String> errors;

    public ApiErrorResponse(boolean success, String message, Map<String, String> errors) {
        this.success = success;
        this.message = message;
        this.errors = errors;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}
