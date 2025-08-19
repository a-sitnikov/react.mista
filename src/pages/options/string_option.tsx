type IProps = {
  name: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
    value: string
  ) => void;
  postfix?: string;
};

const StringOption: React.FC<IProps> = ({
  name,
  value,
  label,
  postfix,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e, name, e.target.value);
  };

  return (
    <label htmlFor={name} style={{ marginRight: "5px" }}>
      <span style={{ marginRight: "5px" }}>{label}</span>
      <input
        type="string"
        name={name}
        value={value}
        onChange={handleChange}
        className="input"
      />
      {postfix !== undefined ? (
        <span style={{ marginLeft: "5px" }}>{postfix}</span>
      ) : null}
    </label>
  );
};

export default StringOption;
