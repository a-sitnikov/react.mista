import { ReactElement, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import queryString from "query-string";

import Login from "../../components/login";
import Sections from "./sections";
import { ISectionItem, getSectionsIfNeeded } from "src/store";

const Header = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = queryString.parse(location.search);

  useEffect(() => {
    dispatch(getSectionsIfNeeded());
  }, [dispatch]);

  const onSectionChange = (e, value: ISectionItem) => {
    if (value) navigate(`/index.php?section=${value.code}`);
    else navigate(`/`);
  };

  return (
    <div className="flex-row">
      <div className="header-left">
        <Login />
      </div>
      <div className="header-right">
        <Sections
          id="sect"
          defaultValue="--Все секции--"
          selected={String(params.section) || ""}
          onChange={onSectionChange}
          size="sm"
        />
      </div>
    </div>
  );
};

export default Header;
