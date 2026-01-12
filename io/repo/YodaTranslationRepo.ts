class YodaTranslationRepo {
  private baseUrl = "https://api.funtranslations.com/translate/yoda.json";

  async getTranslation(text: string) {
    const response = await fetch(
      `${this.baseUrl}?text=${encodeURIComponent(text)}`
    );

    if (!response.ok) {
      throw new Error(`Yoda translation failed: ${response.statusText}`);
    }

    return response;
  }
}

export default YodaTranslationRepo;
