import React from "react";
import request from "@utils/axiosUtil";

const FileUpload = () => {
  const fileList = [];

  const onSaveFile = (e) => {
    const uploadFiles = Array.prototype.slice.call(e.target.files);
    uploadFiles.find((uploadFile) => {
      fileList.push(uploadFile);
    });
  };

  const onUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file);
    });
    await request.post("/file", formData).then((re) => {
      console.log(re);
    });
  };
  return (
    <div>
      <div className="">메뉴 상세 설정</div>
      <div className="">
        <div className="">상위메뉴
          <input type="text" />
        </div>
        <div className="">메뉴명
          <input type="text" />
        </div>
        <div className="">사용여부
          <input type="text" />
        </div>
        <div className="">정렬
          <input type="text" />
        </div>
        <div className="">파일 업로드</div>
        <input type="file" onChange={onSaveFile} />
        <button type="button" onClick={onUpload}>파일업로드</button>
      </div>
    </div>
  );
};

export default FileUpload;
