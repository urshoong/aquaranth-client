# aquaranth-client
Aquaranth Client

## Role Group Page
- url => /role/group 
- state => title
- state => information

## components
### search-box
[//]: # (TODO : 권한그룹에 여러개의 회사가 등록되어 있을 수가 있나? 그렇다면 사용자는 여러회사의 관리자란 소린가?)
- state => companyList (현재 접속한 사용자가 소속되어 있는 모든회사 정보) 
=> 그렇다면 소속된 회사중에 접속한 사용자가 권한을 가지지 않은 회사라면?
- state => roleGroupName (현재 선택된 회사가 가지고있는 권한그룹명을 기준으로 검색) input

### group-list [우선순위1]
- state => 선택된 회사의 총 권한그룹 갯수 (선택안되어 있을시, 모든 회사의 총 권한그룹 갯수)
- state => 권한그룹 리스트
- *추가버튼 클릭시 => 모달 팝업창에서 (회사(해당권한그룹을 가질회사), 권한그룹명, 사용여부) 입력받아 권한그룹 추가
- *한번 클릭시 => 오른쪽 사용자 메뉴에 메뉴목록들을 제공합니다.
- *더블 클릭시 => 모달 팝업창에서 수정, 삭제가 가능
- pageNation

### menu
#### search-box
- state => GNB List
- state => 선택된 GNB 하위에 있는 메뉴들을 검색할 input

#### menu-list
- state => GNB를 포함한 하위 메뉴목록을 제공합니다.
- 저장버튼 클릭시 => 체크된 메뉴권한을 선택된 권한그룹에게 부여합니다.


### login logic
1. login 성공시 오쎈 권한을 서버로부터 받습니다 (ROLE_USER)
2. api 호출시마다 오쎈권한만 확인합니다.
