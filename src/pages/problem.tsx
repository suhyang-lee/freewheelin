import React, { useEffect } from "react";
import { getProblemList } from "../features/problems/api/problem.api";
import SimilarProblem from "../features/problems/components/similarProblem";
import Problem from "../features/problems/components/problem";

function ProblemPage() {
  useEffect(() => {
    (async function () {
      const data = await getProblemList();
      console.log(`[데이터 호출 테스트] ${data}`);
    })();
  }, []);

  return (
    <div className="fixed inset-0 flex gap-4 p-[14px]">
      <Problem />
      <SimilarProblem />
    </div>
  );
}

export default ProblemPage;
