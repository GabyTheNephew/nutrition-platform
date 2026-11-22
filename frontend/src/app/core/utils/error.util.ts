/**
 * Extracts a clear, user-friendly error message from Spring Boot HTTP responses.
 * Handles:
 * 1. Spring Bean Validation errors (MethodArgumentNotValidException -> err.error.errors)
 * 2. Custom business errors (err.error.message)
 * 3. Standard network errors or fallback
 */
export function extractErrorMessage(err: any, fallbackMessage: string): string {
  if (!err) {
    return fallbackMessage;
  }

  // 1. Field validation errors (Map<String, String>)
  if (err.error?.errors && typeof err.error.errors === 'object') {
    const errorList = Object.values(err.error.errors);
    if (errorList.length > 0) {
      return errorList.join(' | ');
    }
  }

  // 2. Business error message (GlobalExceptionHandler)
  if (err.error?.message && typeof err.error.message === 'string') {
    return err.error.message;
  }

  // 3. Raw connection / HTTP status errors
  if (err.status === 0) {
    return 'Unable to reach the server (API Gateway offline or network error).';
  }

  if (err.status === 404) {
    return 'The requested resource was not found on the server (404).';
  }

  if (err.status === 500) {
    return 'Internal server error (500). Please try again later.';
  }

  return fallbackMessage;
}