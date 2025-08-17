import { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";

import Login from "../../components/login";
import Sections from "./sections";
import { ISectionItem } from "src/store";

const Header = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSectionChange = (e, value: ISectionItem | undefined) => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      if (value) {
        newSearchParams.set("section", value.code);
      } else {
        newSearchParams.delete("section");
      }
      return newSearchParams;
    });
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
          selected={searchParams.get("section") ?? ""}
          onChange={onSectionChange}
          size="sm"
        />
      </div>
    </div>
  );
};

export default Header;
