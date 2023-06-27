import { FC, ReactElement } from 'react'

type IProps = {
  name: string,
  label: string,
  value: string,
  onChange: any,
  postfix?: string
}

const StringOption: FC<IProps> = (props): ReactElement => {

  const onChange = (e: any) => {
    const { name } = props;
    props.onChange(e, name, e.target.value);
  }

  const { name, value, label, postfix } = props;

  return (
    <label htmlFor={name} style={{ marginRight: "5px" }}>
      <span style={{ marginRight: "5px" }}>{label}</span>
      <input type="string" name={name} value={value} onChange={onChange} className='input' />
      {postfix !== undefined ?
        <span style={{ marginLeft: "5px" }}>{postfix}</span>
        : null}
    </label>
  );
}

export default StringOption;