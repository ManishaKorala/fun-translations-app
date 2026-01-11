/**
 * PirateTranslationRepo - Translates text to Pirate speak
 * Follows the same pattern as YodaTranslationRepo
 */
class PirateTranslationRepo {
  async getTranslation(text: string) {
    const json = await import(
      "../mocks/api.funtranslations.com_translate_pirate.json.json"
    );

    // Extract the default JSON object
    const mockData = json.default;

    return Promise.resolve({
      json() {
        return Promise.resolve(mockData);
      },
    });
  }
}

export default PirateTranslationRepo;
