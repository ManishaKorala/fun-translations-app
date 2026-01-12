/**
 * PirateTranslationRepo - Translates text to Pirate speak
 * Follows the same pattern as YodaTranslationRepo
 */
class PirateTranslationRepo {
  private baseUrl = "https://api.funtranslations.com/translate/pirate.json";

  async getTranslation(text: string) {
    const response = await fetch(
      `${this.baseUrl}?text=${encodeURIComponent(text)}`
    );

    if (!response.ok) {
      throw new Error(`Pirate translation failed: ${response.statusText}`);
    }

    return response;
  }
}

export default PirateTranslationRepo;
