import React, { useEffect, useRef, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled, { css } from "styled-components";
import {
  GET_CONFIG_TREE_MENULIST, POST_CONFIG_MENU,
  PUT_CONFIG_MENU,
  PUT_CONFIG_MENUICON,
} from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menuConfigurationApi";
import {
  ColumnName,
  FormItemWrapper, Image, InputWrapper,
  Layout, MenuButton,
  MenuFormWrapper,
  Text,
} from "@pages/MODULE/SYS/ROLE/ROLE0030/components/Style";
import Button from "@components/Button";
import { Input } from "@components/Input";
import MenuSearchTreeComp from "@pages/MODULE/SYS/ROLE/ROLE0030/components/tree/MenuSearchTreeComp";
import Swal from "sweetalert2";
import {
  InnerInformationIcon, InnerInformationInnerSpan, InnerInformationInnerWrapper,
  InnerInformationWrap
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";


const MenuInsertModal = () => {
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);
  const [menu, setMenu] = useState();
  const [menuList, setMenuList] = useState();
  const [searchMenu, setSearchMenu] = useState();
  const [upperMenu, setUpperMenu] = useState();
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  useEffect(() => {
    GET_CONFIG_TREE_MENULIST(false, "gnb").then((res) => {
      setMenuList(res.data);
    });
  }, []);

  useEffect(() => {
    setUpperMenu(searchMenu);
  }, [searchMenu]);


  const imageInput = useRef();

  const handleOnGetFile = () => {
    imageInput.current?.click();
  };

  const onSaveFile = (e) => {
    const fileReader = new FileReader();
    const onloadFile = e.target.files[0];
    setFile(onloadFile);
    fileReader.readAsDataURL(onloadFile);
    fileReader.onloadend = () => {
      setImage(fileReader.result);
    };
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("upperMenuNo", upperMenu?.menuNo || 0);
    formData.append("menuCode", menu.menuCode);
    formData.append("menuName", menu.menuName);
    formData.append("mainFlag", menu?.mainFlag || false);
    formData.append("menuOrder", menu.menuOrder);
    formData.append("multipartFile", file || "none");
    await POST_CONFIG_MENU(formData).then((res) => {
      Swal.fire({
        title: "메뉴 등록",
        html: "메뉴가 추가되었습니다.",
        icon: "success",
      });
      closeModal();
    });
  };

  const handleOnChangeForUpperMenu = () => {
    setUpperMenu(null);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const origin = { ...menu };
    origin[name] = value;
    setMenu(origin);
  };

  const handleOnCheckbox = (e) => {
    const { name, checked } = e.target;
    const origin = { ...menu };
    origin[name] = checked;
    setMenu(origin);
  };


  return (
    <Modal
      onClose={handleCloseModal}
      title="메뉴 등록"
    >
      <Wrapper2>
        <MenuSearchTreeComp
          menuList={menuList}
          setSearchMenu={setSearchMenu}
        />
        <MenuFormWrapper>
          <InnerInformationWrap>
            <InnerInformationIcon>௹</InnerInformationIcon>
            <InnerInformationInnerWrapper>
              <InnerInformationInnerSpan className="double">상위 메뉴를 등록하려면 좌측에 있는 메뉴를 선택하면 상위메뉴를 선택할 수 있고,</InnerInformationInnerSpan>
              <InnerInformationInnerSpan className="double">최상위 메뉴로 등록하려면 GNB로 등록하기를 선택하시면 됩니다.</InnerInformationInnerSpan>
            </InnerInformationInnerWrapper>
          </InnerInformationWrap>
          <Layout>
            {/* <GNBButton type="button" onClick={handleOnChangeForUpperMenu}>GNB로 변경하기</GNBButton> */}
            <FormItemWrapper>
              <ColumnName>
                <Text>
                  상위메뉴
                </Text>
              </ColumnName>
              <InputWrapper>
                <Input
                  name="upperMenuNo"
                  value={upperMenu?.menuNo}
                  hidden
                />
                {upperMenu?.menuName || "GNB"}
                <Text />
              </InputWrapper>
              <GNBButton type="button" onClick={handleOnChangeForUpperMenu}>GNB로 변경하기</GNBButton>
            </FormItemWrapper>
            <FormItemWrapper>
              <ColumnName>
                <Text>
                  메뉴명
                </Text>
              </ColumnName>
              <InputWrapper>
                <Input
                  name="menuName"
                  value={menu?.menuName}
                  onChange={handleOnChange}
                />
              </InputWrapper>
            </FormItemWrapper>
            <FormItemWrapper>
              <ColumnName>
                <Text>
                  메뉴코드
                </Text>
              </ColumnName>
              <InputWrapper>
                <Input
                  name="menuCode"
                  value={menu?.menuCode}
                  onChange={handleOnChange}
                />
              </InputWrapper>
            </FormItemWrapper>
            <FormItemWrapper>
              <ColumnName>
                <Text>
                  사용여부
                </Text>
              </ColumnName>
              <InputWrapper>
                <Input
                  type="checkbox"
                  name="mainFlag"
                  value={menu?.mainFlag}
                  checked={menu?.mainFlag}
                  onChange={handleOnCheckbox}
                />
              </InputWrapper>
            </FormItemWrapper>
            <FormItemWrapper>
              <ColumnName>
                <Text>
                  정렬
                </Text>
              </ColumnName>
              <InputWrapper>
                <Input
                  name="menuOrder"
                  value={menu?.menuOrder}
                  onChange={handleOnChange}
                />
              </InputWrapper>
            </FormItemWrapper>
            <FormItemWrapper>
              <ColumnName>
                <Text>
                  아이콘
                </Text>
              </ColumnName>
              <Image src={image} />
              <FileInput
                type="file"
                onChange={onSaveFile}
                ref={imageInput}
              />
              <Button type="button" onClick={handleOnGetFile}>아이콘 불러오기</Button>
            </FormItemWrapper>
            <MenuButton onClick={onUpload}>메뉴 등록</MenuButton>
          </Layout>
        </MenuFormWrapper>
      </Wrapper2>
    </Modal>
  );
};


const FileInput = styled.input.attrs({
  type: "file",
})`
  display: none;
`;

const Wrapper2 = styled.div`
  ${({}) => {
    return css`
      display: grid;
      grid-template-columns: 1fr 3fr;
      width: 800px;
    `;
  }}
`;

const GNBButton = styled.div`
  ${({ theme }) => css`
    position: absolute;
    height: 35px;
    line-height: 35px;
    right: 0;
    margin: 7px 1em;
    padding: 0 5px;
    border: 2px solid ${theme.color.gray350};
    background-color: ${theme.color.gray200};
  `}
`;

export default MenuInsertModal;
