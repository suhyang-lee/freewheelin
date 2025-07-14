import React from "react";
import CardItem from "../list/cardItem";

const Problem = () => {
  return (
    <div className="w-full lg:w-1/2 xl:flex-[63] bg-problem-left p-4 rounded-xl overflow-auto">
      <ul>
        <CardItem />
      </ul>
    </div>
  );
};

export default Problem;
