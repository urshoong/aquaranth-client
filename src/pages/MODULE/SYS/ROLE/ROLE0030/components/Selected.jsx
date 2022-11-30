import React, { useContext } from "react";
import FormInput from "@components/form/FormInput";
import Button from "@components/Button";
import SelectMenuContext from "@pages/MODULE/SYS/ROLE/ROLE0030/context/SelectMenuContext";
import {
  ColumnName,
  FormItemWrapper, Image, InputWrapper,
  Layout, MenuButton,
  MenuFormWrapper,
  Text,
  TitleWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0030/components/Style";
import { DevTool } from "@hookform/devtools";

const Selected = ({ control, handleOnIconUpdateModal, handleOnMenuInsertModal, menuUpdateHandler, handleSubmit, handleOnMenuDeleteConfirmModal }) => {
  const { selectedMenu, setSelectedMenu } = useContext(SelectMenuContext);
  return (
    <MenuFormWrapper onSubmit={handleSubmit(menuUpdateHandler)}>
      <Layout>
        <TitleWrapper>
          <Text>
            메뉴 상세
          </Text>
          <button type="button" onClick={handleOnMenuInsertModal}>메뉴 추가하기</button>
        </TitleWrapper>
        <FormItemWrapper>
          <ColumnName>
            <Text>
              상위메뉴
            </Text>
          </ColumnName>
          <InputWrapper>
            <FormInput
              name="upperMenuNo"
              control={control}
              placeholder={selectedMenu.upperMenuNo ? selectedMenu.upperMenuNo : "대메뉴"}
              defaultValue={selectedMenu.upperMenuNo ? selectedMenu.upperMenuNo : null}
            />
          </InputWrapper>
        </FormItemWrapper>
        <FormItemWrapper>
          <ColumnName>
            <Text>
              메뉴명
            </Text>
          </ColumnName>
          <InputWrapper>
            <FormInput
              name="menuName"
              control={control}
              placeholder={selectedMenu.menuName}
              defaultValue={selectedMenu.menuName}
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
            <FormInput
              name="mainFlag"
              control={control}
              placeholder={selectedMenu.mainFlag ? "사용" : "사용안함"}
              defaultValue=""
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
            <FormInput
              name="menuOrder"
              control={control}
              placeholder={selectedMenu.menuOrder}
              defaultValue={selectedMenu.menuOrder}
            />
          </InputWrapper>
        </FormItemWrapper>
        <FormItemWrapper>
          <ColumnName>
            <Text>
              아이콘
            </Text>
          </ColumnName>
          <Image src={selectedMenu.iconUrl} />
          <Button type="button" onClick={handleOnIconUpdateModal}>사진 수정하기</Button>
        </FormItemWrapper>
        <MenuButton>메뉴 수정</MenuButton>
        <MenuButton onClick={handleOnMenuDeleteConfirmModal}>메뉴 삭제</MenuButton>
        <DevTool control={control} />
      </Layout>
    </MenuFormWrapper>
  );
};

export default Selected;
