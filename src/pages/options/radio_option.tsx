import { Form } from "react-bootstrap";

type IProps = {
  name: string;
  label: string;
  value: string;
  values: Array<{ name: string; descr: string }>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
    value: string
  ) => void;
  oneLine: boolean;
};

const RadioOption: React.FC<IProps> = ({
  name,
  label,
  value,
  values,
  oneLine,
  onChange,
}) => {
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e, name, e.target.value);
  };

  return (
    <span>
      <span style={{ marginRight: "5px" }}> {label} </span>
      {oneLine && <br />}
      {values.map((item, i) => (
        <Form.Check
          key={i}
          type="radio"
          id={item.name}
          label={item.descr}
          name={label}
          checked={item.name === value}
          value={item.name}
          inline={oneLine}
          onChange={onChangeValue}
        ></Form.Check>
      ))}
    </span>
  );
};

export default RadioOption;
