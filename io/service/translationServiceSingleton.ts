import { createDefaultFunTranslationService } from "./FunTranslationService";

/**
 * Create the service ONCE and reuse it (the cache works on multiple requests)
 */
let translationServiceInstance: ReturnType<typeof createDefaultFunTranslationService> | null = null;

export function getTranslationService() {
  if (!translationServiceInstance) {
    translationServiceInstance = createDefaultFunTranslationService();
  }
  return translationServiceInstance;
}
