import React from "react";
import { ReactComponent as AddDeactiveCircleIcon } from "../../../../assets/icons/icon-add-circle-deactive.svg";

const SimilarProblemDefault = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full lg:w-1/2 xl:flex-[63] bg-problem-left p-4 rounded-xl overflow-hidden body2-14-reqular">
      <span className="flex items-center mb-[2px] gap-2">
        <span className="flex items-center justify-center gap-[2px] w-[57px] h-6 bg-white text-mono-959595-gray600 text-[9px]">
          <AddDeactiveCircleIcon className="w-4 h-4" /> 유사문제
        </span>{" "}
        버튼을 누르면
      </span>
      <span>문제를 추가 또는 교체할수 있습니다.</span>
    </div>
  );
};

export default SimilarProblemDefault;
