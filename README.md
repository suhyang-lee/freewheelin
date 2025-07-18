# 프리윌린 과제



## 과제 요구사항

1. 디자인 요구사항
    - 피그마 참고
2. 퍼블리싱 요구사항
    - 최신 크롬 브라우저 기준
    - CSS Flexbox 사용 권장
    - Figma 디자인 가이드 준수
    - 태블릿/PC 두 가지 화면 개발
        - 1024px 이상 1280px 미만
        - 1280px 이상
3. 개발 요구사항
    - 최적화 기법 적용하여 성능 개선
    - 상태관리, 라이브러리 제한 사항 없음
    - 가장 좋은 구조 & 개선 방안에 대해 생각하며 작업

---



## API 리스트

```
https://assignment.mathflat.com/
```

1. GET `/problems`
   ```json
   [
     {
        "id": 1, // 문제 고유의 아이디
        "level": 4, // 문제의 난이도 1,2,3,4,5 (1:하, 2:중하, 3:중, 4:상, 5:최상)
        "type": 1, // 1,2 (1: 객관식, 2: 주관식)
        "problemImageUrl": "http://{...}/problem.png", // 문제 이미지 경로
        "title": "몫과 나머지 구하기", // 문제 제목
        "answerRate": 90 // 정답률
     } 
   ]
   ```
2. GET `/problems/{problemId}/similarity`
   ```
    형태는 /problems 와 동일
   ```
    - (필수) queryParams : excludedProblemIds

3. 에러 형태
   ```json
   {
      "statusCode": 500,
      "message": "Internal server error"
   }
   ```



## 과제 구현 사항

```
1. 각 문제에 리스트를 호출한다.
2. 각 문제에 관련된 유사문제를 호출 한다.
3. 학습지 목록의 문제들을 유저가 원하는대로 CRUD 할 수 있게 한다.
```

| **화면명**       | **기능명**           | **기능 상세 설명**                       | **예외사항**                                                         |
|---------------|-------------------|------------------------------------|------------------------------------------------------------------|
| **문제 리스트**    | 문제 리스트 불러오기       | 첫 화면 진입 시 문제 리스트를 불러 옵니다.          |                                                                  |
| -             | 유사 문제 리스트 불러오기    | 버튼을 누르면 유사 문제 리스트를 불러 옵니다.         | 유사 문제 버튼이 선택되지 않은 경우 기본 화면을 노출 합니다.                              |
| -             | 유사 문제 추가하기        | 현재 활성화 된 문제의 바로 앞에 추가 됩니다.         | 추가되면 해당 유사 문제 리스트에서 제거 합니다.                                      |
| -             | 문제 교체하기           | 현재 활성화 된 문제와 유사 문제 리스트를 교체 합니다.    | 교체된 문제는 활성화 상태를 유지합니다.                                           |
| -             | 문제 삭제하기           | 현재 활성화 된 문제를 삭제 합니다.               | 유사 문제 리스트가 노출중이라면 유사 문제 리스트도 함께 삭제되며, 모든 문제가 사라지면 기본 화면을 보여 줍니다. |
| -             | 난이도, 문제 수 총합 구성하기 | 문제 리스트의 난이도별 총합 및 문제 갯수 총합 을 구합니다. | 문제가 삭제 및 교체 혹은 추가될 때마다 업데이트된 정보가 즉시 반영되어야 합니다.                   |
| **유사 문제 리스트** | 유사 문제             | 선택한 문제 리스트 불러오기                    | 문제 리스트에서 유사문제 버튼을 누르면 유사 문제 리스트를 불러 옵니다.                         |

---



## 기술 스택 & 구현 방식

- React 
- TypeScript
- React Query
  - 초기 문제 리스트 조회에만 사용
  - swap 시 API 재호출 방지를 위해 유사문제는 수동 상태 관리로 구현
- React Hook Form
  - useFieldArray를 활용한 동적 문제 리스트 관리 
  - 복잡한 전역 상태 관리 없이 CRUD 작업 간편화
- React Router
  -  URL 파라미터를 통한 active 문제 상태 관리 
  - 새로고침 시에도 선택된 문제 상태 유지
- Tailwind CSS
  - 빠른 스타일링 및 간단한 디자인 시스템 구축에 용이하여 사용



## 추가 검토 사항

1. 이미지의 사이즈의 최대폭/최소폭
   - 전체적으로 문제가 다 보이되, 잘리지않도록 임의로 px 를 정하여 처리하였음.
   - 각 BreakPoint 마다 보여야하는 이미지의 최대폭/최소폭이 정해져있거나 이미지 너비 사이즈를 동일하게 조정하면 좋을 것 같음.
2. swap 시 처리
    - `queryParams` 를 통해 `active` 상태를 유지하므로 swap 시, `queryParams`에 노출되는 ID 변경
    - 불필요한 API 호출 방지를 위해서 swap 상태를 관리함으로써 swap 시에 API 가 호출되지 않도록 함
    - swap 기능을 `유사문제` 리스트는 유지하고 `학습지 상세 편집` 리스트와 단순 교체를 의미하는 것을 바탕으로 구현함
3. 이미지 레이지 로드
   - 크롬 최신 버전에서 제공하는 <img /> 태그의 lazy 옵션, 레이지로드 옵션, Intersection Observer 중 선택을 고민
   - <img /> 태그가 가장 간단하였으나 태블릿, 핸드폰, 브라우저 간의 호환성을 고려하면 적합하지 않을 것으로 제외
   - 비교적 간단한 형태의 lazy 로 가능할 것 같아 `Intersection Observer` 를 통해 스크롤 시 lazy 로드 되도록 처리