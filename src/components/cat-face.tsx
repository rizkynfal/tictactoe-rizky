import type { Player } from "@/lib/game";
import { cn } from "@/lib/utils";

export type Mood = "normal" | "happy" | "sad";

const COLORS: Record<Player, { fur: string; dark: string; ear: string; muzzle: string; eye: string }> = {
  boni: { fur: "#F6A04D", dark: "#C76A1E", ear: "#FFC9C2", muzzle: "#FFE7CC", eye: "#3B2A1A" },
  beni: { fur: "#8E9AAF", dark: "#5B6478", ear: "#F7C6D0", muzzle: "#F4F6FA", eye: "#1F2A44" },
};

interface CatFaceProps {
  player: Player;
  mood?: Mood;
  className?: string;
  title?: string;
}

/**
 * Boni and Beni, drawn as inline SVG so they scale cleanly and need no image files.
 * Boni is an orange tabby with forehead stripes; Beni is a grey cat with a white muzzle and a bow tie.
 */
export function CatFace({ player, mood = "normal", className, title }: CatFaceProps) {
  const c = COLORS[player];
  const label = title ?? (player === "boni" ? "Boni the cat" : "Beni the cat");

  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={label} className={cn("h-full w-full", className)}>
      {/* Ears */}
      <path d="M18 44 L22 8 L46 28 Z" fill={c.fur} stroke={c.dark} strokeWidth="3" strokeLinejoin="round" />
      <path d="M82 44 L78 8 L54 28 Z" fill={c.fur} stroke={c.dark} strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 36 L26 17 L39 28 Z" fill={c.ear} />
      <path d="M76 36 L74 17 L61 28 Z" fill={c.ear} />

      {/* Head */}
      <ellipse cx="50" cy="56" rx="38" ry="34" fill={c.fur} stroke={c.dark} strokeWidth="3" />

      {/* Boni's tabby stripes */}
      {player === "boni" && (
        <g stroke={c.dark} strokeWidth="3.5" strokeLinecap="round">
          <path d="M50 24 L50 34" />
          <path d="M41 26 L43 34" />
          <path d="M59 26 L57 34" />
        </g>
      )}

      {/* Muzzle */}
      <ellipse cx="50" cy="70" rx={player === "beni" ? 20 : 16} ry={player === "beni" ? 14 : 11} fill={c.muzzle} />

      {/* Cheeks */}
      <circle cx="26" cy="66" r="5" fill="#FF8FA3" opacity="0.45" />
      <circle cx="74" cy="66" r="5" fill="#FF8FA3" opacity="0.45" />

      {/* Eyes */}
      {mood === "happy" ? (
        <g stroke={c.eye} strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M30 52 Q36 44 42 52" />
          <path d="M58 52 Q64 44 70 52" />
        </g>
      ) : mood === "sad" ? (
        <g>
          <ellipse cx="36" cy="52" rx="5" ry="4" fill={c.eye} />
          <ellipse cx="64" cy="52" rx="5" ry="4" fill={c.eye} />
          <g stroke={c.eye} strokeWidth="3" strokeLinecap="round">
            <path d="M29 44 L41 47" />
            <path d="M71 44 L59 47" />
          </g>
          <path d="M70 58 Q73 64 70 66 Q67 64 70 58 Z" fill="#7CC4F0" />
        </g>
      ) : (
        <g>
          <ellipse cx="36" cy="51" rx="5.5" ry="7" fill={c.eye} />
          <ellipse cx="64" cy="51" rx="5.5" ry="7" fill={c.eye} />
          <circle cx="38" cy="48" r="2" fill="#fff" />
          <circle cx="66" cy="48" r="2" fill="#fff" />
        </g>
      )}

      {/* Nose */}
      <path d="M45 63 L55 63 L50 68 Z" fill="#E86A7E" stroke="#C24B60" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Mouth */}
      {mood === "sad" ? (
        <path d="M43 77 Q50 71 57 77" stroke={c.eye} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : (
        <path
          d="M50 68 L50 71 M50 71 Q45 77 41 72 M50 71 Q55 77 59 72"
          stroke={c.eye}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      )}

      {/* Whiskers */}
      <g stroke={c.dark} strokeWidth="1.8" strokeLinecap="round">
        <path d="M30 68 L10 64" />
        <path d="M30 72 L10 74" />
        <path d="M70 68 L90 64" />
        <path d="M70 72 L90 74" />
      </g>

      {/* Beni's bow tie */}
      {player === "beni" && (
        <g>
          <path d="M50 90 L38 84 L38 96 Z" fill="#E4572E" stroke="#A63A1C" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M50 90 L62 84 L62 96 Z" fill="#E4572E" stroke="#A63A1C" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="50" cy="90" r="3" fill="#A63A1C" />
        </g>
      )}
    </svg>
  );
}
