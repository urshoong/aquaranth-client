import { useHistory, useLocation } from "react-router-dom";

const useNavigate = () => {
  const location = useLocation();
  const history = useHistory();

  return {
    go: (url) => {
      if (location.pathname.charAt(location.pathname.length - 1) !== "/") {
        return history.push(`${location.pathname}${url}`);
      } return history.push(`${location.pathname.substring(0, location.pathname.length - 1)}${url}`);
    },
    replace: (url) => {
      if (location.pathname.charAt(location.pathname.length - 1) !== "/") {
        return history.replace(`${location.pathname}${url}`);
      } return history.replace(`${location.pathname.substring(0, location.pathname.length - 1)}${url}`);
    },
  };
};

export default useNavigate;
