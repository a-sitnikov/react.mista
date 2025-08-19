type IProps = {
  name: string;
  children?: React.ReactNode;
} & React.PropsWithChildren;

const Tab: React.FC<IProps> = ({ name, children }) => {
  return (
    <div>
      <div className="tab-header">{name}</div>
      <div className="tab-content">{children}</div>
    </div>
  );
};

export default Tab;
