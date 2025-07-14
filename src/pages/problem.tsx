import React from "react";
import SimilarProblem from "../features/problems/components/similarProblem";
import Problem from "../features/problems/components/problem";

function ProblemPage() {
  return (
    <div className="fixed inset-0 flex gap-4 p-[14px]">
      <Problem />
      <SimilarProblem />
    </div>
  );
}

export default ProblemPage;
