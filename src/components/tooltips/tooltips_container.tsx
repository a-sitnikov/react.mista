import { useRef } from "react";
import { useActionCreators, useAppSelector, tooltipsActions } from "src/store";
import { useOnClickOutside } from "usehooks-ts";

import Tooltip from "./tooltip";

const TooltipsContainer: React.FC = () => {
  const items = useAppSelector((state) => state.tooltips.items);
  const actions = useActionCreators(tooltipsActions);
  const ref = useRef<HTMLDivElement>(null);

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
