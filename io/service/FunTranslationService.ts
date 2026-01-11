import type { Translation } from "domain/types/Translation";
import type { Engine } from "domain/types/Engine";
import YodaTranslationRepo from "../repo/YodaTranslationRepo";
import PirateTranslationRepo from "io/repo/PirateTranslationRepo";
import { fromDto } from "../codec/fun-translation";
import { CacheService } from "./CacheService";

interface FunTranslationService {
  getTranslation(text: string, engine?: Engine): Promise<Translation>;
}

class DefaultFunTranslationService implements FunTranslationService {
  private yodaRepo: YodaTranslationRepo;
  private pirateRepo : PirateTranslationRepo;

  constructor(yodaRepo: YodaTranslationRepo, pirateRepo: PirateTranslationRepo) {
    this.yodaRepo = yodaRepo;
    this.pirateRepo = pirateRepo
  }

  async getTranslation(text: string, engine: Engine = "yoda") {
    const repo = this.selectRepo(engine);
    
    const response = await repo.getTranslation(text);
    const payload = await response.json();
    
    return fromDto(payload);
  }

  private selectRepo(engine: Engine) {
    switch (engine) {
      case "yoda":
        return this.yodaRepo;
      case "pirate":
        return this.pirateRepo;
      default:
        // ensures TypeScript catches missing engines
        const _exhaustive: never = engine;
        return _exhaustive;
    }
  }
}
  
const createDefaultFunTranslationService = () => {
  const yodaRepo = new YodaTranslationRepo();
  const pirateRepo = new PirateTranslationRepo();
  
  const service = new DefaultFunTranslationService(yodaRepo, pirateRepo);
  
  // Wrap with cache
  const cachedService = new CacheService(service);
  
  return cachedService;
};

export { DefaultFunTranslationService, createDefaultFunTranslationService, CacheService };
