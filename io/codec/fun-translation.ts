import type { Translation } from "domain/types/Translation";
import type { Engine } from "domain/types/Engine";

const fromDto = (apiResponse: any): Translation => {
  const contents = apiResponse.contents;
  
  // Return a clean domain object
  return {
    text: contents.text,
    translated: contents.translated,
    engine: contents.translation as Engine,
  };
};

export { fromDto };
