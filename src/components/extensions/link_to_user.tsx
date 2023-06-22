import { FC, ReactElement } from 'react'

type IProps = {
  href: string
}

const LinkToUser: FC<IProps> = ({ href, children }): ReactElement => {
  return <a href={href} className="registered-user">{children}</a>
}

export default LinkToUser;