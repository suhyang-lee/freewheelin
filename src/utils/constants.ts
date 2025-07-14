export const PROBLEM_LEVELS = {
  1: "하",
  2: "중하",
  3: "중",
  4: "상",
  5: "최상",
} as const;

export const PROBLEM_LEVELS_COLORS: Record<keyof typeof PROBLEM_LEVELS, string> = {
  1: "text-green-300",
  2: "text-yellow-300",
  3: "text-orange-300",
  4: "text-red-300",
  5: "text-purple-300",
};
