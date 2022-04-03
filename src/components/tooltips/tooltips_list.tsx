import React, { FC, ReactElement } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from 'src/data/store'
import Tooltip from './tooltip'

const mapState = (state: RootState) => {

  const {
    items
  } = state.tooltips

  return {
    items,
  }
}

const connector = connect(mapState);
const TooltipsList: FC<ConnectedProps<typeof connector>> = ({ items }): ReactElement => {

  return (
    <>
      {items.map((item) => {
        return (
          <Tooltip key={item.hash} tooltip={item}>
          </Tooltip>
        )
      }
      )}
    </>
  )
}

export default connector(TooltipsList);