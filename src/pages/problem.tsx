import React from "react";

function Problem() {
  return (
    <div className="fixed inset-0 flex gap-4 p-[14px]">
      <div className="w-full lg:w-1/2 xl:flex-[63] bg-problem-left rounded-xl overflow-auto">
        {/* 여기 내용이 많으면 스크롤 생김 */}
      </div>
      <div className="w-full lg:w-1/2 xl:flex-[89] bg-problem-right rounded-xl overflow-auto">
        {/* 여기도 마찬가지 */}
      </div>
    </div>
  );
}

export default Problem;
