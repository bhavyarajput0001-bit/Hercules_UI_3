import { mockSnapshot } from "../data/mockData";
import type { HerculesApi } from "./api";

const delay = (milliseconds: number) => new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

export const mockApi: HerculesApi = {
  async getSnapshot() {
    await delay(180);
    return JSON.parse(JSON.stringify(mockSnapshot));
  },
  async submitCommand(command) {
    if (!command.trim()) return;
    await delay(380);
  }
};
