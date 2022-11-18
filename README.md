# aquaranth-client
Aquaranth Client

## /role/group

### search-box (상태 2개)
- 사용자가 소속된 회사들 정보를 불러옵니다.(select-box) -> 상태
- select-box 에서 선택된 회사가 가지고 있는 권한그룹명을 입력받는다.(input-box) -> 상태
- 돋보기(찾기) 버튼을 클릭하면, 해당회사의 권한그룹명 리스트를 가져온다.(button)

### group-list (상태 1개)
- 권한그룹을 가져온다 -> 상태


### group-list-addBtn
1. 모달창을 띄운다 (input, input, radio)


### Todo
1. search-box 내의 select-box-list 에 소속된 회사들을 불러온다.
2. 권한그룹 추가버튼을 누르면 모달창을 띄운다.


# 부서 등록 페이지
1. DeptRegisterComponent 들어가있음
2. DeptRegisterComponent
3. registerDept 함수로 비동기 호츌 


### 리액트 트리구조 순서
1. 화면을 구성 (빈화면인데 컴포넌트가 2개가 들어가는 화면), 뎁스컴포넌트는버린다
2. 그 다음 해당하는 gno값에 맞게 부서 쫙 뿌린다
3. fn이라는 함수를 만들어서 클릭을 하면 page에 올리고 props를 modift component에 내려줘서 데이터 뿌린다.


## Select Page
1. getList함수로 gno값과 일치하는 부서들 조회
2. depts state => 초기값 빈배열, gno에 맞는 데이터 뽑아서 결과값을 depts에 초기화
3. refresh state => 사용하는 이유 : 부서 하나를 클릭해서 데이터를 받고나서 새로운 부서를 클릭해 데이터를 받으려면
화면을 재랜더링해야 하므로 사용한다. 왼쪽의 Node컴포넌트를 재랜더링 시켜 페이지에 올리고 다시 Modify컴포넌트에서 받기 위해
3-1. changeRefresh함수 => 수정 컴포넌트에서 수정 버튼을 누르면 refresh안되게
4. targetDept state => 초기값 null, depts에서의 부서번호와 누른 부서번호가 같은거 target에 저장하고 상태 관리를 통해
targetDept를 갱신
4-1. selectDept 함수에 저장


## Tree Container
1. getChildNode로 비동기 호출
2. 







## 입출력
Modify Componenet
1. 입력 : node Component에서 selectDept함수를 통해 뽑아온 부서 번호를 입력
   출력 : 뽑아온 부서의 데이터들 출력

2. 입력 : node Component에서 다른 부서를 선택하면 selectPage에서 refresh하고 새로 가져온 부서 번호 입력
   출력 : 새로 뽑아온 부서의 데이터들 출력
