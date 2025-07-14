import React, { useEffect } from "react";
import SimilarProblemSection from "../features/problems/components/similarProblem";
import ProblemSection from "../features/problems/components/problem";
import { FormProvider, useForm } from "react-hook-form";
import { Problem } from "../types/problem";
import { getProblemList } from "../features/problems/api/problem.api";

function ProblemPage() {
  const methods = useForm<{
    problems: Problem[];
  }>({
    defaultValues: {
      problems: [],
    },
  });

  useEffect(() => {
    (async function () {
      const response = await getProblemList();
      console.log(`[데이터 호출 테스트] ${response}`);
      methods.reset({
        problems: response.data,
      });
    })();
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="fixed inset-0 flex gap-4 p-[14px]">
        <SimilarProblemSection />
        <ProblemSection />
      </div>
    </FormProvider>
  );
}

export default ProblemPage;
