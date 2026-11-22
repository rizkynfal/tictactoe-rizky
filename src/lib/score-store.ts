import { EMPTY_SCORE, type Score } from "./game";

/**
 * A tiny score store backed by localStorage.
 * Read it with React's useSyncExternalStore: the server renders EMPTY_SCORE,
 * then the client shows the saved score without a hydration mismatch.
 */
const STORAGE_KEY = "boni-beni-score";

let cache: Score | null = null;
const listeners = new Set<() => void>();

function read(): Score {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_SCORE;
    const parsed = JSON.parse(raw) as Partial<Score>;
    return {
      boni: Number(parsed.boni) || 0,
      beni: Number(parsed.beni) || 0,
      draws: Number(parsed.draws) || 0,
    };
  } catch {
    return EMPTY_SCORE;
  }
}

export const scoreStore = {
  getSnapshot(): Score {
    if (cache === null) cache = read();
    return cache;
  },

  getServerSnapshot(): Score {
    return EMPTY_SCORE;
  },

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  set(update: Score | ((prev: Score) => Score)) {
    const prev = scoreStore.getSnapshot();
    cache = typeof update === "function" ? update(prev) : update;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    } catch {
      // Storage can be unavailable (private mode, blocked cookies). The game still works without it.
    }
    listeners.forEach((l) => l());
  },
};
