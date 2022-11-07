import React from "react";

<<<<<<< HEAD:src/pages/company/ComBasicInfoPage.jsx
function ComBasicInfoPage() {
=======
function ComPage() {
  const [comList, setComList] = useState([]);

  useEffect(() => {
    companyList().then((data) => {
      setComList(data);
    });
  }, []);

  console.log(comList);
>>>>>>> menu:src/pages/Company/ComPage.jsx
  return (
    <div />
  );
}

export default ComPage;
