import React, { useEffect } from "react";
import type { Problem } from "../../../../types/problem";
import { getProblemList } from "../../api/problem.api";
import CardItem from "../list/cardItem";

function SimilarProblemSection() {
  const [problemList, setProblemList] = React.useState<Problem[]>([]);
  useEffect(() => {
    (async function () {
      const response = await getProblemList();
      console.log(`[데이터 호출 테스트] ${response}`);
      setProblemList(response.data);
    })();
  }, []);

  return (
    <div className="w-full lg:w-1/2 xl:flex-[63] bg-problem-right p-4 rounded-xl overflow-auto">
      <ul className="flex flex-col gap-4">
        {problemList.map(problem => (
          <CardItem key={`${problem.id}`} item={problem} />
        ))}
      </ul>
    </div>
  );
}

export default SimilarProblemSection;
