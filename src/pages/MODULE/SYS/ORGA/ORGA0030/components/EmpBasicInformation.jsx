import React, { useState } from "react";
import request from "../../../../../../utils/axiosUtil";

const modifyProfile = async (profile) => {
  const { data } = await request.put("/emp/updateprofile", profile);
  return data;
};

function EmpBasicInformation({ clickEmpModify,
  empInformation, changeEmpInput, handleOnRegisterModal }) {
  const [file, setFile] = useState();
  // 미리보기
  const [preview, setPreview] = useState(null);

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

  const onUpload = (empNo) => {
    const formData = new FormData();
    formData.append("multipartFile", file);
    formData.append("key", empNo);
    modifyProfile(formData).then(() => {
      // alert("프로필이 변경되었습니다.");
    });
  };

  return (
    <div>
      <button type="button" onClick={() => { handleOnRegisterModal(); }}>추가</button>
      <button type="button" onClick={() => { clickEmpModify(); }}>수정</button>

      <div className="empBasicInformation">

        <div>
          이미지 {preview && <img src={preview} alt="미리보기" />}
        </div>
        <div><img src={empInformation.profileUrl} alt="프로필 이미지" /></div>

        <input
          type="file"
          onChange={(e) => { onSaveFile(e); }}
        />
        <button type="button" onClick={() => { onUpload(empInformation.empNo); }}>프로필 등록</button>


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
