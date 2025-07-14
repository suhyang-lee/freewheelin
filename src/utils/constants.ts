export const PROBLEM_LEVELS = {
  1: "하",
  2: "중하",
  3: "중",
  4: "상",
  5: "최상",
} as const;

export const PROBLEM_LEVELS_COLORS: Record<keyof typeof PROBLEM_LEVELS, string> = {
  1: "text-mono-5C5C5C-gray800",
  2: "text-core-00ABFF-blue300",
  3: "text-sub-54C0B1-green100",
  4: "text-sub-FFC64D-yellow100 ",
  5: "text-sub-FD5354-red100",
};
