import React, {useEffect, useState} from "react";

function ComPage() {
  const [comList, setComList] = useState([]);

  useEffect(() => {
    companyList().then((data) => {
      setComList(data);
    });
  }, []);

  console.log(comList);
  return (
    <div />
  );
}

export default ComPage;
