import React from "react";
import { useSearchParams } from "react-router";

const SimilarProblemErrorsSection = () => {
  const [searchParams] = useSearchParams();
  const problemNum = searchParams.get("problemNum") || "-1";

  return (
    <div className="flex items-center justify-center w-full lg:w-1/2 xl:flex-[63] bg-problem-left p-4 rounded-xl overflow-hidden">
      <p className="text-center body2-14-reqular">
        <b className="font-black">{problemNum}</b>번의 유사 문제를 가져올 수 없습니다. <br />
        계속 문제를 가지고 올 수 없으면 고객센터에 문의주세요.
      </p>
    </div>
  );
};

export default SimilarProblemErrorsSection;
