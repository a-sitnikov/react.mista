//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import type { DefaultProps } from 'src/components'
import { useAppDispatch } from 'src/data/store';
import { togglePreview } from 'src/data/topicslist/actions';

type PreviewLinkProps = {
  topicId: string,
  expanded: boolean
};

const PreviewLink = ({ topicId, expanded }) => {

  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(togglePreview(topicId));
  }

  const text = expanded ? '-' : '+';
  return (
    <div className="cell-preview-link" onClick={onClick}>
      <span>{text}</span>
    </div>
  )

}

export default connect()(PreviewLink);