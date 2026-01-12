import type { Translation } from "domain/types/Translation";
import type { Engine } from "domain/types/Engine";

/**
 * CacheService wraps a translation service and caches results
 * to avoid repeated API calls for the same text+engine combination
 */
interface FunTranslationService {
  getTranslation(text: string, engine?: Engine): Promise<Translation>;
}

class CacheService implements FunTranslationService {
  private cache = new Map<string, Translation>();
  
  // Wrap the translation service
  private translationService: FunTranslationService;

  constructor(translationService: FunTranslationService) {
    this.translationService = translationService;
  }

  /**
   * Get translation, checking cache first
   */
  async getTranslation(text: string, engine: Engine = "yoda"): Promise<Translation> {
    const cacheKey = this.createCacheKey(text, engine);
    
    // Check if we've already translated this
    if (this.cache.has(cacheKey)) {
      console.log(`[Cache HIT] ${cacheKey}`);
      return this.cache.get(cacheKey)!;
    }
    
    // Not in cache, fetch from service
    console.log(`[Cache MISS] ${cacheKey} - fetching from API`);
    const translation = await this.translationService.getTranslation(text, engine);
    
    // Store in cache for next time
    this.cache.set(cacheKey, translation);
    
    return translation;
  }

  /**
   * Clear the entire cache
   */
  clearCache(): void {
    this.cache.clear();
    console.log("[Cache] Cleared all cached translations");
  }

  /**
   * Get cache statistics (for debugging)
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  /**
   * Create a unique key for cache lookup
   */
  private createCacheKey(text: string, engine: Engine): string {
    return `${text}:${engine}`;
  }
}

export { CacheService };
