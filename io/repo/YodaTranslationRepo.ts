class YodaTranslationRepo {
  async getTranslation(text: string) {
    const json = await import(
      "../mocks/api.funtranslations.com_translate_yoda.json.json"
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

export default YodaTranslationRepo;
