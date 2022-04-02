import { FC, ReactElement } from 'react'

type IProps = {
  name: string,
  label: string,
  value: string,
  values: Array<{ name: string, descr: string }>,
  onChange: any,
  oneLine: boolean
}

const RadioOption: FC<IProps> = (props): ReactElement => {

  const onChange = (e: any) => {
    const { name } = props;
    props.onChange(e, name, e.target.value);
  }

  const { name, label, values, oneLine } = props;

  let valuesElem = [];
  for (let i = 0; i < values.length; i++) {
    let item = values[i];
    valuesElem.push(
      <label key={ i } htmlFor = { item.name } style = {{ marginRight: "5px" }}>
        <input type="radio" name = { name } value = { item.name } checked = { item.name === props.value } onChange = {onChange } />
          { item.descr }
      </label>
      );
    }

return (
  <span>
    <span style= {{ marginRight: "5px" }}> { label } </span>
    {oneLine ? null : <br />}
    { valuesElem }
  </span>
    );
}

export default RadioOption;