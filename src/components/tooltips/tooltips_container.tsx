import React, { FC, ReactElement, useCallback, useRef } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useOnClickOutside } from 'usehooks-ts'

import { useAppDispatch } from 'src/data/store';
import { RootState } from 'src/data/store'
import { clearTooltipsIfNeeded } from 'src/data/tooltips/actions'
import Tooltip from './tooltip'

const mapState = (state: RootState) => {

  const {
    items
  } = state.tooltips;

  return { items }
}

const connector = connect(mapState);
const TooltipsContainer: FC<ConnectedProps<typeof connector>> = ({ items }): ReactElement => {

  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const handleClickOutside = useCallback(() => {
    dispatch(clearTooltipsIfNeeded());
  }, [dispatch]);

  useOnClickOutside(ref, handleClickOutside);
  
  return (
    <div ref={ref}>
      {items.map((item) => {
        return (
          <Tooltip key={item.hash} tooltip={item}>
          </Tooltip>
        )
      }
      )}
    </div>
  )
}

export default connector(TooltipsContainer);