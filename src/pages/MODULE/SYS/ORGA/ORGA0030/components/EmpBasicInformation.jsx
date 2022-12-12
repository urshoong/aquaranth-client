import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  EmpBasicInformationBody,
  EmpBasicInformationDiv,
  EmpBasicInformationHeader,
  EmpBasicInformationImg,
  EmpInformationBtn,
  EmpInformationBtnWrapper,
  EmpInformationWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import request from "../../../../../../utils/axiosUtil";

const modifyProfile = async (profile) => {
  const { data } = await request.put("/emp/updateprofile", profile);
  return data;
};

const removeProfile = async (empNo) => {
  const { data } = await request.put(`/emp/removeProfile/${empNo}`);
  return data;
};

function EmpBasicInformation({ clickEmpModify,
  empInformation, changeEmpInput, handleOnRegisterModal,
  setRefresh, refresh }) {
  const [file, setFile] = useState();
  // 미리보기
  const [preview, setPreview] = useState(null);
  const fileInput = useRef();

  // 파일 선택하고 다른 사원 눌러도 file 값들이 저장되어 있어, 호출 시 비워준다.
  useEffect(() => {
    setPreview(null);
    fileInput.current.value = null;
    setFile(null);
  }, [empInformation]);

  const onSaveFile = (e) => {
    const fileReader = new FileReader();
    // 파일 저장
    const onloadFile = e.target.files[0];
    setFile(onloadFile);

    fileReader.readAsDataURL(onloadFile);
    fileReader.onloadend = () => {
      setPreview(fileReader.result);
    };
  };

  // 파일 업데이트
  const onUpload = (empNo) => {
    const formData = new FormData();
    formData.append("multipartFile", file);
    formData.append("key", empNo);
    modifyProfile(formData).then(() => {
      Swal.fire("수정 완료", "프로필이 변경되었습니다.", "success").then();
      setRefresh(!refresh);
    });
  };

  // 파일 데이터 null로 업데이트
  const onDelete = (empNo) => {
    removeProfile(empNo).then(() => {
      Swal.fire("삭제 완료", "프로필이 삭제되었습니다.", "success").then();
      setRefresh(!refresh);
      setPreview(null);
      fileInput.current.value = null;
      setFile(null);
      empInformation.profileUrl = null;
    });
  };

  // 되돌리기
  const profileReset = () => {
    setFile(null);
    fileInput.current.value = "";
    setPreview(empInformation.profileUrl);
  };

  return (
    <EmpInformationWrapper>
      <EmpInformationBtnWrapper>
        <EmpInformationBtn type="button" onClick={() => { handleOnRegisterModal(); }}>추가</EmpInformationBtn>
        <EmpInformationBtn type="button" onClick={() => { clickEmpModify(); }}>수정</EmpInformationBtn>
      </EmpInformationBtnWrapper>

      <EmpBasicInformationDiv>

        <EmpBasicInformationHeader>사진</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <EmpBasicInformationImg profileUrl={preview || empInformation.profileUrl} />
          <div style={{ display: "inline-block" }}>
            <input type="file" onChange={(e) => { onSaveFile(e); }} ref={fileInput} />
            <button type="button" onClick={() => { onUpload(empInformation.empNo); }}>프로필 등록</button>
            <button type="button" onClick={() => { onDelete(empInformation.empNo); }}>프로필 삭제</button>
            <button type="button" onClick={() => { profileReset(); }}>되돌리기</button>
          </div>
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader className="essential">이름</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <input type="text" name="empName" value={empInformation.empName} onChange={(e) => { changeEmpInput(e); }} />
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader className="unchangeable">ID</EmpBasicInformationHeader>
        <EmpBasicInformationBody>{empInformation.username}</EmpBasicInformationBody>

        <EmpBasicInformationHeader>성별</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <select name="gender" value={empInformation.gender} onChange={(e) => { changeEmpInput(e); }}>
            <option value="-">--성별 선택--</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader>이메일</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <input type="text" name="email" value={empInformation.email} onChange={(e) => { changeEmpInput(e); }} />
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader>휴대전화</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <input type="text" name="empPhone" value={empInformation.empPhone} onChange={(e) => { changeEmpInput(e); }} />
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader>주소</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <input type="text" name="empAddress" value={empInformation.empAddress} onChange={(e) => { changeEmpInput(e); }} />
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader className="unchangeable">최초입사일</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <input type="date" name="firstHiredDate" value={empInformation.firstHiredDate} readOnly />
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader>최종퇴사일</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <input type="date" name="lastRetiredDate" value={empInformation.lastRetiredDate === null ? "" : empInformation.lastRetiredDate} onChange={(e) => { changeEmpInput(e); }} />
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader className="unchangeable">계정 사용</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <div>
            <input name="empUse" type="radio" value="true" checked={empInformation.empUse === true} />사용
            <input name="empUse" type="radio" value="false" checked={empInformation.empUse === false} />미사용
          </div>
        </EmpBasicInformationBody>
      </EmpBasicInformationDiv>
    </EmpInformationWrapper>
  );
}

export default EmpBasicInformation;
