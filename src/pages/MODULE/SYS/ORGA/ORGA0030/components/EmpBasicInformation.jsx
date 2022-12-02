import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
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
    <div>
      <button type="button" onClick={() => { handleOnRegisterModal(); }}>추가</button>
      <button type="button" onClick={() => { clickEmpModify(); }}>수정</button>

      <div className="empBasicInformation">

        <div>
          {preview
            ? <div> {preview && <img src={preview} alt="미리보기" style={{ width: "200px" }} />}</div>
            : (
              <div>{empInformation.profileUrl
                ? <img src={empInformation.profileUrl} alt="프로필 이미지" style={{ width: "200px" }} />
                : <div /> }
              </div>
            )}
        </div>

        <div>
          <input
            type="file"
            onChange={(e) => { onSaveFile(e); }}
            ref={fileInput}
          />
          <button type="button" onClick={() => { onUpload(empInformation.empNo); }}>프로필 등록</button>
          <button type="button" onClick={() => { onDelete(empInformation.empNo); }}>프로필 삭제</button>
          <button type="button" onClick={() => { profileReset(); }}>되돌리기</button>
        </div>

        <div>이름</div>
        <input
          type="text"
          name="empName"
          value={empInformation.empName}
          onChange={(e) => { changeEmpInput(e); }}
          className="essential"
        />

        <div>ID</div>
        <div className="unchangeable">{empInformation.username}</div>

        <div>비밀번호</div>
        <input
          type="text"
          name="password"
          onChange={(e) => { changeEmpInput(e); }}
          className="essential"
          readOnly
        />

        <div>성별</div>
        <select name="gender" value={empInformation.gender} onChange={(e) => { changeEmpInput(e); }}>
          <option value="-">--성별 선택--</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>


        <div>이메일</div>
        <input
          type="text"
          name="email"
          value={empInformation.email}
          onChange={(e) => { changeEmpInput(e); }}
        />

        <div>휴대전화</div>
        <input
          type="text"
          name="empPhone"
          value={empInformation.empPhone}
          onChange={(e) => { changeEmpInput(e); }}
        />

        <div>주소</div>
        <input
          type="text"
          name="empAddress"
          value={empInformation.empAddress}
          onChange={(e) => { changeEmpInput(e); }}
        />

        <div>최초입사일</div>
        <input type="date" name="firstHiredDate" value={empInformation.firstHiredDate} readOnly className="unchangeable" />

        <div>최종퇴사일</div>
        <input type="date" name="lastRetiredDate" value={empInformation.lastRetiredDate === null ? "" : empInformation.lastRetiredDate} onChange={(e) => { changeEmpInput(e); }} />

        <div>
          <span>계정 사용</span>
        </div>
        <div>

          <input name="empUse" type="radio" value="true" checked={empInformation.empUse === true} onChange={(e) => { changeEmpInput(e); }} />사용
          <input name="empUse" type="radio" value="false" checked={empInformation.empUse === false} onChange={(e) => { changeEmpInput(e); }} />미사용
        </div>
      </div>
    </div>
  );
}

export default EmpBasicInformation;
