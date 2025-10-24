import { Placeholder } from "react-bootstrap";

export const SkeletonRow: React.FC = () => {
  return (
    <div className="topics-list-row text-gray-300">
      <div className="cell-forum">
        <Placeholder as="div" className="my-auto w-full min-h-[16px]" />
      </div>
      <div className="cell-section">
        <div className="opacity-0">1</div>
      </div>
      <div className="cell-answ">
        <div className="cell-answ--inner w-full px-[6px]">
          <Placeholder
            as="div"
            className="my-auto w-full min-h-[16px] max-md:opacity-0!"
          />
        </div>
      </div>
      <div className="cell-preview-link">
        <span>
          <i className="fa fa-plus-square-o agh" aria-hidden="true"></i>
        </span>
      </div>
      <div className="cell-title h-[36px]">
        <Placeholder as="div" className="my-auto w-full h-[16px]" />
      </div>
      <div className="cell-author">
        <div className="cell-author--inner w-full">
          <Placeholder
            as="div"
            className="my-auto w-full min-h-[16px] max-md:opacity-0!"
          />
        </div>
      </div>
      <div className="cell-lastuser">
        <div className="cell-author--inner w-full">
          <Placeholder
            as="div"
            className="my-auto w-full min-h-[16px] max-md:opacity-0!"
          />
        </div>
      </div>
      <div className="cell-last20 h-[36px] px-1">
        <Placeholder as="div" className="my-auto w-full min-h-[16px]" />
      </div>
    </div>
  );
};
