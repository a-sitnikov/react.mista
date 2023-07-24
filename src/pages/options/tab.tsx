import { FC, ReactElement } from "react";

type IProps = {
  name: string,
  children?: React.ReactNode
}

const Tab: FC<IProps> = ({ name, children }): ReactElement => {
  return (
    <div>
      <div className="tab-header">
        {name}
      </div>
      <div className="tab-content">
        {children}
      </div>
    </div>
  )
}

export default Tab;