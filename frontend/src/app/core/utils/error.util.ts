/**
 * Extrage un mesaj de eroare prietenos și detaliat din răspunsurile HTTP generate de Spring Boot.
 * Gestionează:
 * 1. Validările Spring Bean Validation (MethodArgumentNotValidException -> err.error.errors)
 * 2. Erorile de business personalizate (err.error.message)
 * 3. Mesajele standard de rețea sau fallback
 */
export function extractErrorMessage(err: any, fallbackMessage: string): string {
  if (!err) {
    return fallbackMessage;
  }

  // 1. Dacă backend-ul a returnat erori de validare pe câmpuri (Map<String, String>)
  if (err.error?.errors && typeof err.error.errors === 'object') {
    const errorList = Object.values(err.error.errors);
    if (errorList.length > 0) {
      return errorList.join(' | ');
    }
  }

  // 2. Dacă backend-ul a returnat un mesaj de business (GlobalExceptionHandler)
  if (err.error?.message && typeof err.error.message === 'string') {
    return err.error.message;
  }

  // 3. Dacă este o eroare de conexiune brută (ex: Gateway oprit, CORS, timeout)
  if (err.status === 0) {
    return 'Nu se poate comunica cu serverul (API Gateway offline sau eroare de rețea).';
  }

  if (err.status === 404) {
    return 'Resursa solicitată nu a fost găsită pe server (404).';
  }

  if (err.status === 500) {
    return 'Eroare internă de server (500). Încearcă din nou mai târziu.';
  }

  return fallbackMessage;
}