import React from "react";
import ProblemSection from "../features/problems/components/problem";
import { FormProvider, useForm } from "react-hook-form";
import { ProblemForm } from "../types/problem";
import { ErrorBoundary } from "react-error-boundary";
import SimilarProblemSection from "../features/problems/components/similarProblem";
import SimilarProblemErrorsSection from "../features/problems/components/similarProblem/errors";
import { useSearchParams } from "react-router";
import ProblemErrorsSection from "../features/problems/components/problem/errors";

function ProblemPage() {
  const [searchParams] = useSearchParams();
  const problemNum = searchParams.get("problemNum") || "-1";

  const methods = useForm<ProblemForm>({
    defaultValues: {
      problems: [],
      similarProblem: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="fixed inset-0 flex gap-4 p-[14px]">
        <ErrorBoundary fallback={<SimilarProblemErrorsSection />} resetKeys={[problemNum]}>
          <SimilarProblemSection />
        </ErrorBoundary>
        <ErrorBoundary fallback={<ProblemErrorsSection />} resetKeys={[problemNum]}>
          <ProblemSection />
        </ErrorBoundary>
      </div>
    </FormProvider>
  );
}

export default ProblemPage;
