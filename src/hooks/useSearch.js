import { useDispatch } from "react-redux";
import { setSearchResult } from "@reducer/searchSlice";

const useSearch = () => {
  const dispatch = useDispatch();

  const handleSearchResult = ({ result }) => {
    dispatch(setSearchResult(result));
  };

  return { setResult: handleSearchResult };
};

export default useSearch;
