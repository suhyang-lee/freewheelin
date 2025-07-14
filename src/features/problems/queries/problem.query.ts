import { useQuery } from "@tanstack/react-query";
import { getProblemList } from "../api/problem.api";

const problemQuery = {
  key: "problem",
  getProblemList: () => {
    return useQuery({
      queryKey: [problemQuery.key, "all"],
      retry: false,
      queryFn: async () => {
        const res = await getProblemList();
        return res.data || [];
      },
    });
  },
};

export default problemQuery;
