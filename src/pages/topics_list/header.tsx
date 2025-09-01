import { useSearchParams } from "react-router-dom";

import { type ISectionItem } from "src/store";
import Login from "../../components/login";
import Sections from "./sections";

const Header: React.FC = () => {
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
    <div className="flex gap-2 w-full justify-between">
      <Login />
      <div className="grow-0 shrink-1">
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
