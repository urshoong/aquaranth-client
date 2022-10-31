import React from "react";
import {Input, OkBtn, TomatoButton} from "@styles/buttons";

const IndexPage = () => {
  console.log("IndexPage Test");
  return (
    <div>
      <Input small placeholder="Small" />
      <Input placeholder="Normal" />
      <Input padding="2em" placeholder="Padded" />
    </div>
  );
};

export default IndexPage;
