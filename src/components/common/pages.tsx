import React, { FC, ReactElement } from 'react'
import { Pagination } from 'react-bootstrap'

import { paramsToString } from 'src/api'
import './pages.css'

type IProps = {
  locationParams: { page?: string },
  baseUrl: string,
  maxPage: number,
  last20?: boolean
}

const Pages: FC<IProps> = ({ locationParams, baseUrl, maxPage, last20 }): ReactElement => {

  let currentPage: number | string;
  if (!locationParams.page)
    currentPage = 1;
  else if (locationParams.page === "last20")
    currentPage = "last20";
  else
    currentPage = parseInt(locationParams.page, 10) || 1;

  let pages = [];
  for (let i = 1; i <= maxPage; i++) {
    let params = { ...locationParams, page: i };
    let href = `#/${baseUrl}` + paramsToString('?', params);

    pages.push(<Pagination.Item active={currentPage === i} key={i} href={href}>{i}</Pagination.Item>);
  }

  if (last20 === true) {
    let params = { ...locationParams, page: "last20" };
    let href = `#/${baseUrl}` + paramsToString('?', params);
    pages.push(<Pagination.Item active={currentPage === "last20"} key="last20" href={href}>»</Pagination.Item>);
  }

  return (
    <Pagination style={{ margin: "0px" }}>
      {pages}
    </Pagination>
  )

}

export default Pages;