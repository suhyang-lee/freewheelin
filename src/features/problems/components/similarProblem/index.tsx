import React, { useEffect } from "react";
import CardItem from "../list/cardItem";

import { ReactComponent as AddDeactiveCircleIcon } from "../../../../assets/icons/icon-add-circle-deactive.svg";
import { ReactComponent as SwapIcon } from "../../../../assets/icons/icon_swap_horiz.svg";
import { useSearchParams } from "react-router";
import SimilarProblemDefault from "./default";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Problem, ProblemForm } from "../../../../types/problem";

import { getSimilarProblemList } from "../../api/problem.api";

function SimilarProblemSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const problemNum = searchParams.get("problemNum") || "-1";
  const action = searchParams.get("action") || "";

  const { control, getValues, setValue } = useFormContext<ProblemForm>();

  const excludeIds = getValues("problems")
    .filter(problem => problem.id !== parseInt(problemNum))
    .map(problem => problem.id);

  const { fields, replace, update, remove } = useFieldArray({
    control,
    name: "similarProblem",
    keyName: "similarProblemId",
  });

  useEffect(() => {
    if (action === "swap") return;

    if (problemNum === "-1" || !problemNum) return;

    (async function () {
      const res = await getSimilarProblemList(parseInt(problemNum), excludeIds);
      replace(res.data);
    })();
  }, [problemNum]);

  useEffect(() => {
    if (action === "swap") {
      setSearchParams(prev => {
        prev.delete("action");
        return prev;
      });
    }
  }, [action]);

  const onSwap = (currentItem: Problem, index: number) => {
    const currentProblems: Problem[] = getValues("problems");
    const currentItemIndex = currentProblems.findIndex(problem => `${problem.id}` === problemNum);

    const originalProblem = currentProblems[currentItemIndex];

    const newProblems = [...currentProblems];
    newProblems[currentItemIndex] = { ...currentItem };

    setValue("problems", newProblems);

    update(index, originalProblem);

    setSearchParams(prev => {
      prev.set("problemNum", `${currentItem.id}`);
      prev.set("action", "swap");
      return prev;
    });
  };

  const onAdd = (currentItem: Problem, index: number) => {
    remove(index);

    const currentProblems: Problem[] = getValues("problems");

    const newProblems = [currentItem, ...currentProblems];
    setValue("problems", newProblems);
  };

  if (problemNum === "-1") {
    return <SimilarProblemDefault />;
  }

  return (
    <div className="w-full lg:w-1/2 xl:flex-[63] bg-problem-left p-4 rounded-xl overflow-hidden">
      <h2 className="body1-16-bold text-mono-333333-gray900 mb-4">유사 문항</h2>
      <div className="h-full pb-12 overflow-y-auto scrollbar-transparent">
        {problemNum !== "-1" && fields.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <SimilarProblemDefault />
          </div>
        ) : (
          <ul className="flex flex-col gap-4 min-h-full">
            {fields.map((problem, index) => (
              <CardItem key={`${problem.similarProblemId}`} cardType="similarProblem" item={problem}>
                <>
                  <li>
                    <button
                      onClick={() => onSwap(problem, index)}
                      className="w-[43px] flex items-center gap-1 text-xs text-mono-959595-gray600"
                    >
                      <SwapIcon className="w-4 h-4" /> 교체
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onAdd(problem, index)}
                      className="w-[43px] flex items-center gap-1 text-xs text-mono-959595-gray600"
                    >
                      <AddDeactiveCircleIcon /> 추가
                    </button>
                  </li>
                </>
              </CardItem>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SimilarProblemSection;
