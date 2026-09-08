import type { HerculesSnapshot } from "../types/hercules";

export interface HerculesApi {
  getSnapshot(): Promise<HerculesSnapshot>;
  submitCommand(command: string): Promise<void>;
}
