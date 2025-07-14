import React, { useEffect } from "react";
import { getProblemList } from "../../api/problem.api";
import CardItem from "../list/cardItem";
import type { Problem } from "../../../../types/problem";

import { ReactComponent as AddDeActiveCircleIcon } from "../../../../assets/icons/icon-add-circle-deactive.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/icons/icon_delete.svg";

const ProblemSection = () => {
  const [problemList, setProblemList] = React.useState<Problem[]>([]);

  useEffect(() => {
    (async function () {
      const response = await getProblemList();
      console.log(`[데이터 호출 테스트] ${response}`);
      setProblemList(response.data);
    })();
  }, []);

  return (
    <div className="w-full lg:w-1/2 xl:flex-[89] bg-problem-right p-4 rounded-xl overflow-auto">
      <h2 className="body1-16-bold text-white mb-4">학습지 상세 편집</h2>
      <ul className="flex flex-col gap-4">
        {problemList.map(problem => (
          <CardItem key={`${problem.id}`} cardType="problem" item={problem}>
            <>
              <li>
                <button className="w-[65px] flex items-center gap-1 text-xs text-mono-959595-gray600">
                  <AddDeActiveCircleIcon className="w-4 h-4" /> 유사문제
                </button>
              </li>
              <li>
                <button className="w-[43px] flex items-center gap-1 text-xs text-mono-959595-gray600">
                  <DeleteIcon /> 삭제
                </button>
              </li>
            </>
          </CardItem>
        ))}
      </ul>
    </div>
  );
};

export default ProblemSection;
