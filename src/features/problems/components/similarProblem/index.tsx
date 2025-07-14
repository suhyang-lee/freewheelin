import React, { useEffect } from "react";
import type { Problem } from "../../../../types/problem";
import { getProblemList } from "../../api/problem.api";
import CardItem from "../list/cardItem";

import { ReactComponent as AddDeactiveCircleIcon } from "../../../../assets/icons/icon-add-circle-deactive.svg";
import { ReactComponent as SwapIcon } from "../../../../assets/icons/icon_swap_horiz.svg";

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
    <div className="w-full lg:w-1/2 xl:flex-[63] bg-problem-left p-4 rounded-xl overflow-auto">
      <h2 className="body1-16-bold text-mono-333333-gray900 mb-4">유사 문항</h2>
      <ul className="flex flex-col gap-4">
        {problemList.map(problem => (
          <CardItem key={`${problem.id}`} cardType="similarProblem" item={problem}>
            <>
              <li>
                <button className="w-[43px] flex items-center gap-1 text-xs text-mono-959595-gray600">
                  <SwapIcon className="w-4 h-4" /> 교체
                </button>
              </li>
              <li>
                <button className="w-[43px] flex items-center gap-1 text-xs text-mono-959595-gray600">
                  <AddDeactiveCircleIcon /> 추가
                </button>
              </li>
            </>
          </CardItem>
        ))}
      </ul>
    </div>
  );
}

export default SimilarProblemSection;
