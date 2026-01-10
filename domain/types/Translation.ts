import type { Engine } from "./Engine";

type Translation = {
  text: string;
  translated: string;
  engine: Engine;
};

export type { Translation };
