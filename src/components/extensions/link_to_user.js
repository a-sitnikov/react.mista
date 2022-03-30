//@flow
import React, { Component } from 'react'

type LinkToUserProps = {
  href: string,
  children: any
}

const LinkToUser = ({ href, children }) => {
  return <a href={href} className="registered-user">{children}</a>
}

export default LinkToUser;