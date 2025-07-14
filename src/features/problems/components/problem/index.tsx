import React, { useEffect, useMemo } from "react";
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

  const problemCounts = useMemo(() => {
    const counts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    problemList.forEach(problem => {
      counts[problem.level]++;
    });

    return counts;
  }, [problemList]);

  return (
    <div className="flex flex-col w-full lg:w-1/2 xl:flex-[89] bg-problem-right px-4 pt-4 rounded-xl overflow-hidden">
      <h2 className="body1-16-bold text-white mb-4">학습지 상세 편집</h2>
      <div className="h-full overflow-y-auto scrollbar-transparent">
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
      <div className="flex items-center justify-end h-16">
        <span className="body1-16-regular text-mono-C0C0C0-gray500">
          {`하${problemCounts["1"]} · 중하${problemCounts["2"]} · 중${problemCounts["3"]} · 상${problemCounts["4"]} · 최상${problemCounts["5"]}`}
        </span>
        <span className="w-[1px] h-4 mx-2 bg-white" />
        <span className="body1-16-bold text-white">문제 수 {problemList.length || 0}개</span>
      </div>
    </div>
  );
};

export default ProblemSection;
