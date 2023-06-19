import { FC, ReactElement, useRef } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useOnClickOutside } from 'usehooks-ts'

import { useAppDispatch, RootState } from 'src/store/store';
import { tooltipsActions } from 'src/store/tooltips'

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

  const handleClickOutside = () => {
    dispatch(tooltipsActions.closeAll());
  };

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