type IProps = {
  href: string;
} & React.PropsWithChildren;

const LinkToUser: React.FC<IProps> = ({ href, children }) => {
  return (
    <a href={href} className="registered-user">
      {children}
    </a>
  );
};

export default LinkToUser;
