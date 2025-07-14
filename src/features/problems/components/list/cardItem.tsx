import React from "react";
import { ReactComponent as AddDeactiveCircleIcon } from "../../../../assets/icons/icon-add-circle-deactive.svg";
import { ReactComponent as SwapIcon } from "../../../../assets/icons/icon_swap_horiz.svg";
import { Problem } from "../../../../types/problem";

interface CardItemProps {
  item?: Problem;
  children?: React.ReactNode;
}

function CardItem({ children }: CardItemProps) {
  return (
    <li className="flex flex-col bg-white rounded-xl overflow-hidden ">
      <div className="flex items-center justify-between bg-[#FAFAFA] p-2">
        <ul className="flex items-center">
          <li className="font-bold text-[18px] px-6">1</li>
          <li className="tex t-sm">직선, 반직선 선분의 개수 (1)</li>
        </ul>
        <ul className="flex gap-3">
          <li>
            <button className="w-[43px] flex items-center gap-1 text-xs">
              <SwapIcon className="w-4 h-4" /> 교체
            </button>
          </li>
          <li>
            <button className="w-[43px] flex items-center gap-1 text-xs">
              <AddDeactiveCircleIcon /> 추가
            </button>
          </li>
        </ul>
        {children}
      </div>
      <div className="flex p-4">
        <ul className="flex flex-col gap-2">
          <li className="w-10 h-5 rounded text-xs flex items-center justify-center bg-red-300">중</li>
          <li className="w-10 h-5 rounded text-xs flex items-center justify-center bg-red-300">72%</li>
          <li className="w-10 h-5 rounded text-xs flex items-center justify-center bg-red-300">주관식</li>
        </ul>
        <div>
          <img src="" alt="" />
        </div>
      </div>
    </li>
  );
}

export default CardItem;
