import ApiClient from "../../../utils/apiClient";
import { Problem } from "../../../types/problem";

/**
 * 문제 리스트 가져오기
 *
 * @returns 문제 리스트
 */
export const getProblemList = () => {
  return ApiClient.get<Array<Problem>>("/problems");
};

/**
 * 문제 리스트 아이디로 유사 문제 리스트 가져오기
 *
 * @param {number} problemId - 선택된 problem ID
 * @returns 유사 문제 리스트
 */
export const getSimilarProblemList = (problemId: number) => {
  return ApiClient.get<Array<Problem>>(`/problems/${problemId}/similarity`);
};
