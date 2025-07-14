import { PROBLEM_LEVELS, PROBLEM_LEVELS_COLORS } from "./constants";

export const getLevelColor = (level: keyof typeof PROBLEM_LEVELS) => {
  return PROBLEM_LEVELS_COLORS[level];
};

export const getLevelText = (level: keyof typeof PROBLEM_LEVELS) => {
  return PROBLEM_LEVELS[level];
};
