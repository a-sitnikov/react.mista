import CSS from "csstype";
import Form from "react-bootstrap/Form";

import { ISectionItem } from "src/store";
import { useSections } from "src/store/query-hooks";

export type IProps = {
  id: string;
  defaultValue: string;
  selected?: string;
  style?: CSS.Properties;
  size?: "sm" | "lg";
  onChange?: (
    e: React.ChangeEvent<HTMLElement>,
    value: ISectionItem | undefined
  ) => void;
};

const Sections: React.FC<IProps> = ({
  id,
  defaultValue,
  selected,
  style,
  size,
  onChange,
}) => {
  const { data } = useSections();

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    if (!onChange) return;

    const code = e.currentTarget.value;
    const item = data.items.find((item) => item.code === code);
    onChange(e, item);
  };

  return (
    <Form.Select
      aria-label="Секция"
      onChange={onSelect}
      value={selected}
      style={style}
      className="input"
      size={size}
      id={id}
    >
      <option value="">{defaultValue}</option>
      {Object.keys(data.tree).map((forum) => (
        <optgroup key={forum} label={forum}>
          {data.tree[forum].map((item) => (
            <option key={item.id} value={item.code}>
              {item.name}
            </option>
          ))}
        </optgroup>
      ))}
    </Form.Select>
  );
};

export default Sections;
