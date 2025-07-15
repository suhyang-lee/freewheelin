import React, { useEffect, useMemo } from "react";
import CardItem from "../list/cardItem";

import { ReactComponent as AddDeActiveCircleIcon } from "../../../../assets/icons/icon-add-circle-deactive.svg";
import { ReactComponent as AddActiveCircleIcon } from "../../../../assets/icons/icon-add-circle-active.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/icons/icon_delete.svg";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ProblemForm } from "../../../../types/problem";
import { useSearchParams } from "react-router";
import ProblemDefaultItem from "../list/problemDefaultItem";
import problemQuery from "../../queries/problem.query";

const ProblemSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const problemNum = searchParams.get("problemNum") || "-1";

  const { control, reset } = useFormContext<ProblemForm>();

  const { fields, remove } = useFieldArray({
    control,
    name: "problems",
    keyName: "itemId",
  });

  const { isSuccess, data } = problemQuery.getProblemList();

  useEffect(() => {
    if (!isSuccess) return;

    reset({
      problems: data,
      similarProblem: [],
    });
  }, [isSuccess]);

  const problemCounts = useMemo(() => {
    const counts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    fields.forEach(problem => {
      counts[problem.level]++;
    });

    return counts;
  }, [fields]);

  const onFindSimilarProblem = (id: number) => {
    setSearchParams(prev => {
      prev.set("problemNum", `${id}`);
      return prev;
    });
  };

  const onDeleteProblem = async (index: number, id: number) => {
    if (problemNum === `${id}`) {
      setSearchParams(prev => {
        prev.delete("problemNum");
        return prev;
      });
    }
    remove(index);
  };

  const isCurrentProblem = (problemId: number) => problemNum === problemId.toString();

  const isEmptyProblem = fields.length === 0;

  return (
    <div className="flex flex-col w-full lg:w-1/2 xl:flex-[89] bg-problem-right px-4 pt-4 rounded-xl overflow-hidden">
      <h2 className="body1-16-bold text-white mb-4">학습지 상세 편집</h2>
      <div className="h-full overflow-y-auto scrollbar-transparent">
        <ul className="w-full h-full flex flex-col gap-4">
          {fields.map((problem, index) => {
            const isActive = isCurrentProblem(problem.id);

            return (
              <CardItem key={`${problem.itemId}-${index}`} cardType="problem" item={problem} active={isActive}>
                <>
                  <li>
                    <button
                      onClick={() => onFindSimilarProblem(problem.id)}
                      className={`w-[65px] flex items-center gap-1 text-xs ${
                        isActive ? "text-core-00ABFF-blue300" : "text-mono-959595-gray600"
                      }`}
                    >
                      {isActive ? (
                        <AddActiveCircleIcon className="w-4 h-4" />
                      ) : (
                        <AddDeActiveCircleIcon className="w-4 h-4" />
                      )}
                      유사문제
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onDeleteProblem(index, problem.id)}
                      className="w-[43px] flex items-center gap-1 text-xs text-mono-959595-gray600"
                    >
                      <DeleteIcon /> 삭제
                    </button>
                  </li>
                </>
              </CardItem>
            );
          })}
          {isEmptyProblem && <ProblemDefaultItem />}
        </ul>
      </div>
      <div className="flex items-center justify-end h-16">
        {!isEmptyProblem && (
          <div className="flex items-center">
            <span className="body1-16-regular text-mono-C0C0C0-gray500">
              {`하${problemCounts["1"]} · 중하${problemCounts["2"]} · 중${problemCounts["3"]} · 상${problemCounts["4"]} · 최상${problemCounts["5"]}`}
            </span>
            <span className="w-[1px] h-4 mx-2 bg-white" />
          </div>
        )}
        <span className={`body1-16-bold  ${isEmptyProblem ? "text-sub-FD5354-red100" : "text-white"}`}>
          문제 수 {fields.length}개
        </span>
      </div>
    </div>
  );
};

export default ProblemSection;
