import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applicationSelector, SET_LNBSIDEBAR, SET_SUBHEADER, SET_TITLE } from "@reducer/applicationSlice";

const Index = () => {
  const dispatch = useDispatch();
  const application = useSelector(applicationSelector);

  useEffect(() => {
    if (application.subHeader === true) {
      dispatch(SET_SUBHEADER(false));
    }

    if (application.lnbSidebar === true) {
      dispatch(SET_LNBSIDEBAR(false));
    }
    return (() => {
      dispatch(SET_SUBHEADER(true));
      dispatch(SET_LNBSIDEBAR(true));
      dispatch(SET_TITLE(""));
    });
  }, []);

  return (
    <div>
      index
    </div>
  );
};

export default Index;
