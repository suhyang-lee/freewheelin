import { useQuery } from "@tanstack/react-query";
import { getSimilarProblemList } from "../api/problem.api";

const similarProblemQuery = {
  key: "similarProblem",
  getSimilarProblemList: (id: number, excludedProblemIds: Array<number>) => {
    return useQuery({
      queryKey: [similarProblemQuery.key, id, ...excludedProblemIds],
      retry: false,
      enabled: id !== -1 && !isNaN(id),
      queryFn: async () => {
        const res = await getSimilarProblemList(id, excludedProblemIds);
        return res.data || [];
      },
      throwOnError: true,
    });
  },
};

export default similarProblemQuery;
