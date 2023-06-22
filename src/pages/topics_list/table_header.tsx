import { FC, ReactElement } from 'react'

type IProps = {
  onUpdateClick: any,
  isLoading: boolean
}

const TableHeader: FC<IProps> = ({ isLoading, onUpdateClick }): ReactElement => {

  return (
    <div className="th" style={{ position: "sticky", top: "39px" }}>
      <div style={{ letterSpacing: "-1px" }}>Раздел</div>
      <div></div>
      <div>Тема</div>
      <div>Re</div>
      <div>Автор</div>
      <div><span style={{ cursor: "pointer" }} title="Обновить список" onClick={onUpdateClick}>{isLoading ? "Обновляется" : "Обновлено"}</span></div>
    </div>
  )  
}

export default TableHeader;