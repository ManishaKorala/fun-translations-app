import type { Translation } from "domain/types/Translation";
import type { Engine } from "domain/types/Engine";
import YodaTranslationRepo from "../repo/YodaTranslationRepo";
import { fromDto } from "../codec/fun-translation";
import { CacheService } from "./CacheService";

interface FunTranslationService {
  getTranslation(text: string, engine?: Engine): Promise<Translation>;
}

class DefaultFunTranslationService implements FunTranslationService {
  repo: YodaTranslationRepo;

  constructor(repo: YodaTranslationRepo) {
    this.repo = repo;
  }

  async getTranslation(text: string, engine: Engine = "yoda") {
    const response = await this.repo.getTranslation(text);
    const payload = await response.json();

    return fromDto(payload);
  }
}

const createDefaultFunTranslationService = () => {
  const yodaRepo = new YodaTranslationRepo();
  const service = new DefaultFunTranslationService(yodaRepo);
  
  // Wrap with cache
  const cachedService = new CacheService(service);
  
  return cachedService;
};

export { DefaultFunTranslationService, createDefaultFunTranslationService, CacheService };
