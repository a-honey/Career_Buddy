# 포트폴리오 공유 서비스 프론트엔드 코드

## 실행 방법

```bash
npm install --global yarn
yarn
yarn start
```

## 파일 구조 설명

1. src폴더는 아래와 같이 구성됩니다.

- components 폴더:

  - common 폴더
    - Btns.js
    - Footer.js
    - Header.js
  - Porfolio 폴더: 메인 화면을 구성하는, 5개 MVP를 모두 포함하는 컴포넌트
    - award 폴더: 포트폴리오 중 수상이력 관련 컴포넌트들
    - certificate 폴더: 포트폴리오 중 자격증 관련 컴포넌트들
    - education 폴더: 포트폴리오 중 학력 관련 컴포넌트들
    - project 폴더: 포트폴리오 중 프로젝트 관련 컴포넌트들
    - user 폴더: 포트폴리오 중 사용자 관련 컴포넌트들
  - login 폴더:
  - network 폴더:
  - register 폴더:

- context 폴더:
  - EditContext.js: 편집 상태 관리
  - EducationContext.js: modelContext 변환 예정
- pages 폴더
- services 폴더
  - api.js: CRUD db 연결 함수
- api.js:
  - axios를 사용하는 코드가 있습니다.
  - delete 함수는 코드는 작성되어 있지만, 쓰이지고 있지는 않습니다. -> **사용하는 기능을 추가해 보세요!**
- App.js:
  - SPA 라우팅 코드가 있습니다.
- reducer.js:
  - 로그인, 로그아웃은 useReducer 훅으로 구현되는데, 이 때 사용되는 reducer 함수입니다.

## Front 로직 설명

1. 로그인 성공시 /portfolio에서 userId를 받아옴

2. /portfolio/user/UserContainer에서 UserCard.js와 PortfolioList로 userId 전달

3. userId를 통해 각 필드별 ContextProvider 생성

4. /portfolio/education/Education에서 userId를 통해 educationDocuments 받아오기

5. /portfolio/education/EducationItem에서 EducationItem으로 educationDocuments를 FieldDocumentBlock으로 map

6. map 한 결과를 FieldDocumentBlock으로 묶음

7. UserCard의 편집버튼 클릭시 전체 UserContainer의 EditContext의 상태 변환

8. UserCard는 UserEditForm을 렌더링

9. PortfolioList는 isEditing Context를 통해 FieldDocumentBlock의 수정/ 삭제 버튼 생성

10. 각 필드의 documents는 삭제 버튼 클릭시 해당 버튼 context를 변경

11. 각 필드의 documents는 수정 버튼 클릭시 isDocumentEditing State 통해 form 및 EducationEditAdd 렌더링

12. form의 확인 버튼 클릭시 업데이트 요청 후 해당 필드 context를 변경

13. EducationEditAdd의 + 버튼 클릭시 isAdding State를 통해 form 렌더링

## 기타

- 로그인 없이 네트워크 페이지 이동시 전체 유저보기만 가능

- 포트폴리오 보기 클릭시 경고와 함께 회원가입페이지 이동
