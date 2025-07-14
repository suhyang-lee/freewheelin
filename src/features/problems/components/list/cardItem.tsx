import React from "react";

import { Problem } from "../../../../types/problem";
import { getLevelColor, getLevelText } from "../../../../utils/problem.util";
import { PROBLEM_TYPE } from "../../../../utils/constants";

interface CardItemProps {
  item: Problem;
  active?: boolean;
  cardType: "problem" | "similarProblem";
  children?: React.ReactNode;
}

function CardItem({ item, cardType, active = false, children }: CardItemProps) {
  return (
    <li
      data-active={active ? "true" : "false"}
      className="flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.08)] border-solid border-[3px] border-transparent data-[active=true]:border-core-00ABFF-blue300"
    >
      <div className="flex items-center justify-between bg-[#FAFAFA] p-2">
        <ul className="flex items-center flex-1 min-w-0 mr-4">
          <li className={`px-6 ${cardType === "problem" ? "H4-20-bold" : "H5-18-bold"}`}>{item.id}</li>
          <li className="text-sm truncate">{item.title}</li>
        </ul>
        <ul className="flex gap-3 flex-shrink-0">{children}</ul>
      </div>
      <div className="flex p-4 gap-3.5">
        <ul className="flex flex-col gap-2">
          <li
            className={`w-10 h-5 rounded text-xs flex items-center justify-center bg-mono-FAFAFA-gray100 ${getLevelColor(item.level)}`}
          >
            {getLevelText(item.level)}
          </li>
          <li className="w-10 h-5 rounded text-xs flex items-center justify-center bg-mono-FAFAFA-gray100 text-mono-707070-gray700">
            {item.answerRate.toFixed(0)}%
          </li>
          <li className="w-10 h-5 rounded text-xs flex items-center justify-center bg-mono-FAFAFA-gray100 text-mono-959595-gray600">
            {PROBLEM_TYPE[item.type]}
          </li>
        </ul>
        <div className="w-full">
          <img
            className="w-full lg:min-w-[271px] lg:max-w-[304px] xl:min-w-[341px] xl:max-w-[397px]"
            src={item.problemImageUrl}
            alt={item.title}
          />
        </div>
      </div>
    </li>
  );
}

export default CardItem;
