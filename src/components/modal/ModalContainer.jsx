import React, { Suspense, lazy } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { modalSelector } from "@reducer/modalSlice";

import Spinner from "@components/Spinner";

const ORGA0010Modal = lazy(() => import("@pages/MODULE/SYS/ORGA/ORGA0010/components/modal/ORGA0010Modal"));
const ORGA0020Modal = lazy(() => import("@pages/MODULE/SYS/ORGA/ORGA0020/components/modal/ORGA0020Modal"));
const ORGA0030Modal = lazy(() => import("@pages/MODULE/SYS/ORGA/ORGA0030/components/modal/ORGA0030Modal"));
const ROLE0010Modal = lazy(() => import("@pages/MODULE/SYS/ROLE/ROLE0010/components/modal/ROLE0010Modal"));
const ROLE0020Modal = lazy(() => import("@pages/MODULE/SYS/ROLE/ROLE0020/components/modal/ROLE0020Modal"));
const ROLE0030Modal = lazy(() => import("@pages/MODULE/SYS/ROLE/ROLE0030/components/modal/ROLE0030Modal"));

const MODAL_COMPONENTS = {
  ORGA0010: ORGA0010Modal,
  ORGA0020: ORGA0020Modal,
  ORGA0030: ORGA0030Modal,
  ROLE0010: ROLE0010Modal,
  ROLE0020: ROLE0020Modal,
  ROLE0030: ROLE0030Modal,
};


const ModalContainer = () => {
  const modalList = useSelector(modalSelector);

  const modals = modalList.map(({ type, props }) => {
    const ModalComponent = MODAL_COMPONENTS[type];

    return <ModalComponent key={type} {...props} />;
  });

  return createPortal(<Suspense fallback={<Spinner />}>{ modals }</Suspense>, document.querySelector("#portal"));
};

export default ModalContainer;