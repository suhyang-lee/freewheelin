import React, { useEffect, useMemo } from "react";
import CardItem from "../list/cardItem";

import { ReactComponent as AddDeactiveCircleIcon } from "../../../../assets/icons/icon-add-circle-deactive.svg";
import { ReactComponent as SwapIcon } from "../../../../assets/icons/icon_swap_horiz.svg";
import { useSearchParams } from "react-router";
import SimilarProblemDefault from "./default";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Problem, ProblemForm } from "../../../../types/problem";

import { getSimilarProblemList } from "../../api/problem.api";

const INITIAL_PROBLEM_NUM = "-1";
const SWAP_ACTION = "swap";

const SimilarProblemSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const problemNum = searchParams.get("problemNum") ?? INITIAL_PROBLEM_NUM;
  const action = searchParams.get("action") ?? "";

  const { control, getValues, setValue } = useFormContext<ProblemForm>();

  const excludeIds = useMemo(() => {
    const problems = getValues("problems");
    if (!problems) return [];

    return problems.filter(problem => problem.id !== parseInt(problemNum)).map(problem => problem.id);
  }, [problemNum]);

  const { fields, replace, update, remove } = useFieldArray({
    control,
    name: "similarProblem",
    keyName: "similarProblemId",
  });

  useEffect(() => {
    const fetchSimilarProblems = async () => {
      if (action === SWAP_ACTION || problemNum === INITIAL_PROBLEM_NUM) return;

      const parsedProblemNum = parseInt(problemNum);
      if (isNaN(parsedProblemNum)) return;

      const res = await getSimilarProblemList(parsedProblemNum, excludeIds);
      replace(res.data);
    };

    fetchSimilarProblems();
  }, [problemNum, excludeIds]);

  useEffect(() => {
    if (action === SWAP_ACTION) {
      setSearchParams(prev => {
        prev.delete("action");
        return prev;
      });
    }
  }, [action]);

  const onSwap = (currentItem: Problem, index: number) => {
    const currentProblems: Problem[] = getValues("problems");
    const currentItemIndex = currentProblems.findIndex(problem => `${problem.id}` === problemNum);

    if (currentItemIndex === -1) return;

    const originalProblem = currentProblems[currentItemIndex];

    const newProblems = [...currentProblems];
    newProblems[currentItemIndex] = { ...currentItem };

    setValue("problems", newProblems);

    update(index, originalProblem);

    setSearchParams(prev => {
      prev.set("problemNum", `${currentItem.id}`);
      prev.set("action", SWAP_ACTION);
      return prev;
    });
  };

  const onAdd = (currentItem: Problem, index: number) => {
    remove(index);

    const currentProblems: Problem[] = getValues("problems");

    const newProblems = [currentItem, ...currentProblems];
    setValue("problems", newProblems);
  };

  if (problemNum === INITIAL_PROBLEM_NUM) {
    return <SimilarProblemDefault />;
  }

  const isEmptyProblem = fields.length === 0;

  return (
    <div className="w-full lg:w-1/2 xl:flex-[63] bg-problem-left p-4 rounded-xl overflow-hidden">
      <h2 className="body1-16-bold text-mono-333333-gray900 mb-4">유사 문항</h2>
      <div className="h-full pb-12 overflow-y-auto scrollbar-transparent">
        {isEmptyProblem ? (
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
};

export default SimilarProblemSection;
