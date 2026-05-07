// Paleta espelhada do mapa interativo APNT 2026
export const theme = {
  bg: "#07111f",
  bgGradStart: "#07111f",
  bgGradEnd: "#0d1c33",
  panel: "#0b1729",
  panel2: "#13223c",
  ink: "#f4f7fb",
  inkSoft: "#dee5f0",
  muted: "#9aa7c2",

  // Accent dourado APNT 2026 / CIAGA
  gold: "#d7b45a",
  goldLight: "#f4d982",
  goldDeep: "#a78a3e",

  // Aliases p/ retrocompat com cenas que usam `accent`
  accent: "#d7b45a",
  accentDeep: "#a78a3e",
  cyanDeep: "#0891b2",

  // Tons náuticos secundários
  navyLight: "#1d2c4d",
  cyan: "#06b6d4",
  cyanLight: "#22d3ee",

  line: "#263756",
  lineSoft: "rgba(215, 180, 90, 0.32)",

  // Categorias regulatórias
  red: "#ef4444",
  yellow: "#eab308",
  orange: "#f59e0b",
  green: "#22c55e",
  blue: "#3b82f6",
  indigo: "#6366f1",
  purple: "#a855f7",
} as const;

export const fonts = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, Helvetica, Arial, sans-serif',
  mono: '"SF Mono", "Roboto Mono", "Menlo", monospace',
} as const;

export const easings = {
  premium: [0.22, 1, 0.36, 1] as [number, number, number, number],
  outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

// Exported alias para retrocompatibilidade dos scenes existentes
export const accent = theme.gold;
