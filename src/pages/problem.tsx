import React, { useEffect } from "react";
import ProblemSection from "../features/problems/components/problem";
import { FormProvider, useForm } from "react-hook-form";
import { Problem } from "../types/problem";
import problemQuery from "../features/problems/queries/problem.query";
import { ErrorBoundary } from "react-error-boundary";
import SimilarProblemSection from "../features/problems/components/similarProblem";
import SimilarProblemErrorsSection from "../features/problems/components/similarProblem/errors";

function ProblemPage() {
  const { isSuccess, isError, data } = problemQuery.getProblemList();

  const methods = useForm<{
    problems: Problem[];
  }>({
    defaultValues: {
      problems: [],
    },
  });

  useEffect(() => {
    if (!isSuccess) return;

    methods.reset({
      problems: data,
    });
  }, [isSuccess]);

  if (isError) {
    return <div>errors</div>;
  }

  if (data?.length === 0) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <FormProvider {...methods}>
      <div className="fixed inset-0 flex gap-4 p-[14px]">
        <ErrorBoundary fallback={<SimilarProblemErrorsSection />}>
          <SimilarProblemSection />
        </ErrorBoundary>
        <ProblemSection />
      </div>
    </FormProvider>
  );
}

export default ProblemPage;
