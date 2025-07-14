interface Problem {
  id: number;
  type: 1 | 2; // 1: 객관식, 2: 주관식
  level: 1 | 2 | 3 | 4 | 5; // 문제의 난이도 1,2,3,4,5 (1:하, 2:중하, 3:중, 4:상, 5:최상)
  title: string;
  answerRate: number; // 정답률
  problemImageUrl: string;
}

export type { Problem };
