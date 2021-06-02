//@flow
import React, { Component } from 'react'

type LinkToUserProps = {
  href: string,
  children: any
}

class LinkToUser extends Component<LinkToUserProps> {

  render() {
    const { href, children } = this.props;
    return <a href={href} className="registered-user">{children}</a>
  }
}

export default (LinkToUser: any);