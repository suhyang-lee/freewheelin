import React, { useEffect, useState } from "react";
import type { Problem } from "../../../../types/problem";
import CardItem from "../list/cardItem";

import { ReactComponent as AddDeactiveCircleIcon } from "../../../../assets/icons/icon-add-circle-deactive.svg";
import { ReactComponent as SwapIcon } from "../../../../assets/icons/icon_swap_horiz.svg";
import { useSearchParams } from "react-router";
import similarProblemQuery from "../../queries/similarProblem.query";
import SimilarProblemDefault from "./default";

function SimilarProblemSection() {
  const [searchParams] = useSearchParams();
  const problemNum = searchParams.get("problemNum") || "-1";

  const { isSuccess, data } = similarProblemQuery.getSimilarProblemList(parseInt(problemNum) ?? -1);

  const [problemList, setProblemList] = useState<Problem[]>([]);

  useEffect(() => {
    if (!isSuccess) return;

    setProblemList(data);
  }, [isSuccess]);

  if (problemNum === "-1") {
    return <SimilarProblemDefault />;
  }

  return (
    <div className="w-full lg:w-1/2 xl:flex-[63] bg-problem-left p-4 rounded-xl overflow-hidden">
      <h2 className="body1-16-bold text-mono-333333-gray900 mb-4">유사 문항</h2>
      <div className="h-full pb-12 overflow-y-auto scrollbar-transparent">
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
    </div>
  );
}

export default SimilarProblemSection;
