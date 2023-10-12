import { ReactElement, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { useActionCreators, useAppSelector } from "src/store";
import { tooltipsActions } from "src/store";

import Tooltip from "./tooltip";

const TooltipsContainer = (): ReactElement => {
  const items = useAppSelector((state) => state.tooltips.items);
  const actions = useActionCreators(tooltipsActions);
  const ref = useRef(null);

  const handleClickOutside = () => {
    actions.closeAll();
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div ref={ref}>
      {items.map((item) => {
        return <Tooltip key={item.hash} tooltip={item} />;
      })}
    </div>
  );
};

export default TooltipsContainer;
